'use server'

import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { s3 } from '@/lib/s3'
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { revalidatePath } from "next/cache"

interface CreateCategoryProps {
  name: string
  storeId: string | string[]
  pathname: string
  billboardId: string
}

export const createCategory = async ({ name, storeId, pathname, billboardId }: CreateCategoryProps) => {
  const { userId } = auth()

  if (!userId) return { error: 'Unauthenticated' }
  if (!name) return { error: 'Fill name field' }
  if (!storeId) return { error: "There's no store id field" }
  if (!billboardId) return { error: 'Fill billboard field' }
  if (typeof storeId == 'object') storeId = storeId[ 0 ]

  const doesCategoryExist = await prismadb.category.findFirst({ where: { name } })

  if (doesCategoryExist) return { error: 'Unauthorized' }

  const category = await prismadb.category.create({ data: { name, storeId, billboardId } })
  category
  revalidatePath(pathname)

  return { category }
}

interface UpdateCategoryProps {
  storeId: string | string[]
  categorydId: string
  name?: string | null
  pathname: string
}

export const updateCategory = async ({ categorydId, storeId, name, pathname }: UpdateCategoryProps) => {
  const { userId } = auth()

  if (!userId) return { error: 'Unauthenticated' }
  if (!categorydId || !storeId) { error: 'Fill in the all fields' }
  if (typeof storeId == 'object') storeId = storeId[ 0 ]

  const doesBillboardExist = await prismadb.category.findFirst({ where: { id: categorydId, store: { userId: userId } } })

  if (!doesBillboardExist) return { error: "This billboard doesn't exist or it's not yours" }

  const billboard = await prismadb.category.updateMany({ where: { id: categorydId, storeId }, data: { name: name ? name : undefined } })

  revalidatePath(pathname)

  return { billboard }
}

interface DeleteCategoryProps {
  categoryId: string
  storeId: string | string[]
  pathname: string
}


export const deleteCategory = async ({ categoryId, storeId, pathname }: DeleteCategoryProps) => {
  const { userId } = auth()

  if (!userId) return { error: 'Unauthenticated' }
  if (!categoryId || !storeId) { error: 'Fill in the all fields' }
  if (typeof storeId !== 'string') storeId = storeId[ 0 ]

  const doesBillboardExist = await prismadb.category.findFirst({ where: { id: categoryId, store: { userId: userId } } })

  if (!doesBillboardExist) return { error: "This billboard doesn't exist or it's not yours" }

  const billboard = await prismadb.category.deleteMany({ where: { id: categoryId, storeId } })

  revalidatePath(pathname)

  return { billboard }
}