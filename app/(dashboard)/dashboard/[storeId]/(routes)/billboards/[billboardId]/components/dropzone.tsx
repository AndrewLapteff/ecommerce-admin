'use client'

import { useDropzone } from 'react-dropzone'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { getImageProperties } from '@/lib/utils'
import { useDropzoneFile } from '@/hooks/use-dropzone-file'

const MAX_SIZE = 1024 * 1500
const FIXED_HEIGHT = 120

interface ImageDataType {
  height: number
  width: number
}

const Dropzone = () => {
  const [file, setFile] = useState<File>()
  const [imageData, setImageData] = useState<ImageDataType>({ width: 0, height: 0 })
  const { onUpload } = useDropzoneFile()

  useEffect(() => {
    onUpload(null, false)
  }, [onUpload])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0]
      if (acceptedFiles.length > 0) {
        await getImageProperties(newFile, (width, height) => {
          let ratio = width / height
          let newWidth = FIXED_HEIGHT * ratio

          setImageData({ width: newWidth, height: FIXED_HEIGHT })
        })
        setFile(acceptedFiles[0])
        onUpload(acceptedFiles[0], true)
      }
    },
    [onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: MAX_SIZE,
  })

  return (
    <div {...getRootProps({ className: 'max-w-xl' })}>
      <label
        className={`flex justify-center w-full h-[128px] px-4 transition bg-background border-2 ${
          isDragActive ? 'border-gray-400' : 'border-gray-300'
        } border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none`}
      >
        {file && (
          <div className="flex items-center space-x-2 ">
            <Image
              alt="image"
              src={URL.createObjectURL(file)}
              width={imageData.width}
              height={imageData.height}
            />
          </div>
        )}
        {!file && (
          <span className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 bg-textforeground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            {isDragActive ? (
              <span className="text-foreground font-medium">Right here</span>
            ) : (
              <span className="text-foreground font-medium">Drop files to Attach</span>
            )}
          </span>
        )}
      </label>
      <input {...getInputProps()} type="file" className="hidden" />
    </div>
  )
}

export default Dropzone
