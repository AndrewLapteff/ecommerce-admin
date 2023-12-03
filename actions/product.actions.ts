'use server'

import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { s3 } from '@/lib/s3'
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { revalidatePath } from "next/cache"

interface CreateProductProps {
  imageUrl: string,
  name: string,
  storeId: string | string[],
  pathname: string
  price: number
  categoryId: string | string[],
}

export const createProduct = async ({ imageUrl, name, pathname, price, categoryId, storeId }: CreateProductProps) => {
  const { userId } = auth()

  if (!userId) return { error: 'Unauthenticated' }
  if (!imageUrl || !name || !price) { error: 'Fill in the all fields' }
  if (typeof storeId == 'object') storeId = storeId[ 0 ]
  if (typeof categoryId == 'object') categoryId = categoryId[ 0 ]

  const product = await prismadb.product.create({ data: { image: imageUrl, name, price, categoryId, storeId } })

  revalidatePath(pathname)

  return { product }
}

interface UpdateProductProps {
  productId: string,
  imageUrl: string | null
  name: string | null,
  price: number | null
  pathname: string
  categoryId: string | null,
}

export const updateProduct = async ({ productId, imageUrl, name, price, pathname, categoryId }: UpdateProductProps) => {
  const { userId } = auth()

  if (!userId) return { error: 'Unauthenticated' }
  if (!productId || !imageUrl || !name || !price) { error: 'Fill in the all fields' }

  const doesProductExist = await prismadb.product.findFirst({ where: { id: productId, store: { userId: userId } } })

  if (!doesProductExist) return { error: "This product doesn't exist or it's not yours" }

  const product = await prismadb.product.updateMany({
    where: { id: productId },
    data: {
      image: imageUrl ? imageUrl : undefined,
      name: name ? name : undefined,
      price: price ? price : undefined,
      categoryId: categoryId ? categoryId : undefined
    }
  })

  revalidatePath(pathname)

  return { product }
}


export const deleteProduct = async (productId: string, storeId: string | string[], pathname: string) => {
  const { userId } = auth()

  if (!userId) return { error: 'Unauthenticated' }
  if (!productId || !storeId) { error: 'Fill in the all fields' }
  if (typeof storeId == 'object') storeId = storeId[ 0 ]

  const doesProductExist = await prismadb.product.findFirst({ where: { id: productId, store: { userId: userId } } })

  if (!doesProductExist) return { error: "This product doesn't exist or it's not yours" }

  const product = await prismadb.product.deleteMany({ where: { id: productId, storeId } })

  // const deleteObjectCommand = new DeleteObjectCommand({
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Key: doesProductExist.image.split('/').pop()
  // })

  // await s3.send(deleteObjectCommand)

  revalidatePath(pathname)

  return { product }
}