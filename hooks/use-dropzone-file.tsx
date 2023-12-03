import { create } from 'zustand'

interface useDropzoneFileProps {
  isUploaded: boolean
  file: File | null
  onUpload: (file: File | null, isUploaded: boolean) => void
}

export const useDropzoneFile = create<useDropzoneFileProps>((set) => ({
  isUploaded: false,
  file: null,
  onUpload: (file: File | null, isUploaded: boolean) => set({ isUploaded, file }),
}))
