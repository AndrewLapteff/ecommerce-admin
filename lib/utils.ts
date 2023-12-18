import { Product } from "@prisma/client"
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

export const slugifyCategoryName = (categoryName: string) => {
  return categoryName.replace(' ', '_').trim()
}

export const unslugifyCategoryName = (input: string) => {
  return input.replace('_', ' ')
}

export const detectLang = (character: string) => {
  const cyrillicRegex = /[а-яА-Я]/
  const latinRegex = /[a-zA-Z]/

  if (cyrillicRegex.test(character)) {
    return 'Russian'
  } else if (latinRegex.test(character)) {
    return 'English'
  } else {
    return 'Unknown'
  }
}

export const findProductsToSuggest = (inputText: string, products: Product[]): Product[] => {
  const words = inputText.match(/\b\w+\b/g) || []
  const longWords = words.filter((word) => word.length >= 4)
  const lowerCaseWords = longWords.map((word) => word.toLowerCase())

  return products.filter((element) =>
    lowerCaseWords.some((word) => element.name.toLowerCase().includes(word))
  )
}