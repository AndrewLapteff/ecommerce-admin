import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const lengthFormater = (label: string) => {
  if (label.length > 8) {
    return label.slice(0, 8) + '...'
  } else {
    return label
  }
}

export const getImageProperties = async (file: File, callback: (width: number, height: number) => void) => {
  const reader = new FileReader()

  reader.onload = function (e) {
    const img = new Image()

    img.onload = function () {
      callback(img.width, img.height)
    }
    // @ts-ignore
    img.src = e?.target?.result
  }

  reader.readAsDataURL(file)
}

export const priceFormater = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

export const categoryRouteFormater = (categoryName: string) => {
  return categoryName.toLowerCase().replace(' ', '_').trim()
}