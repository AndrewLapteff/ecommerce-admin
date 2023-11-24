import { create } from 'zustand'

interface useDropzoneFileProps {
  isUploaded: boolean
  file: File | null
  onUpload: (file: File) => void
}

export const useDropzoneFile = create<useDropzoneFileProps>((set) => ({
  isUploaded: false,
  file: null,
  onUpload: (file: File) => set({ isUploaded: true, file }),
}))
