'use server'

import prismadb from "@/lib/prismadb"
import { auth } from "@/lib/auth"
import { s3 } from '@/lib/s3'
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { revalidatePath } from "next/cache"
import { Decimal } from "@prisma/client/runtime/library"

interface CreateProductProps {
  imageUrl: string,
  name: string,
  storeId: string | string[],
  pathname: string
  price: number
  categoryId: string | string[],
  isArchived: boolean | undefined,
  isFeatured: boolean | undefined
}

export const createProduct = async ({ imageUrl, name, pathname, price, categoryId, storeId, isArchived, isFeatured }: CreateProductProps) => {
  const session = await auth()

  if (typeof session?.user === 'undefined') return { error: 'Unauthenticated' }
  if (!imageUrl || !name || !price) { error: 'Fill in the all fields' }
  if (typeof storeId == 'object') storeId = storeId[ 0 ]
  if (typeof categoryId == 'object') categoryId = categoryId[ 0 ]

  const product = await prismadb.product.create({ data: { image: imageUrl, name, price, categoryId, storeId, isArchived, isFeatured } })

  revalidatePath(pathname)

  return { product }
}

interface UpdateProductProps {
  productId: string,
  imageUrl: string | undefined
  name: string | undefined,
  price: number | undefined
  pathname: string
  categoryId: string | undefined,
  isArchived: boolean | undefined
  isFeatured: boolean | undefined
}

export const updateProduct = async ({ productId, imageUrl, name, price, pathname, categoryId, isArchived, isFeatured }: UpdateProductProps) => {
  const session = await auth()
  let decimalPrice = undefined
  if (typeof session?.user === 'undefined') return { error: 'Unauthenticated' }
  if (price)
    decimalPrice = new Decimal(price)

  const doesProductExist = await prismadb.product.findFirst({ where: { id: productId, store: { userId: session.user.id } } })

  if (!doesProductExist) return { error: "This product doesn't exist or it's not yours" }

  const product = await prismadb.product.updateMany({
    where: { id: productId },
    data: {
      image: imageUrl ? imageUrl : undefined,
      name: name ? name : undefined,
      price: decimalPrice,
      categoryId: categoryId ? categoryId : undefined,
      isArchived,
      isFeatured
    }
  })

  revalidatePath(pathname)

  return { product }
}


export const deleteProduct = async (productId: string, storeId: string | string[], pathname: string) => {
  const session = await auth()

  if (typeof session?.user === 'undefined') return { error: 'Unauthenticated' }
  if (!productId || !storeId) { error: 'Fill in the all fields' }
  if (typeof storeId == 'object') storeId = storeId[ 0 ]

  const doesProductExist = await prismadb.product.findFirst({ where: { id: productId, store: { userId: session.user.id } } })

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