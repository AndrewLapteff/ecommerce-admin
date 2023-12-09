'use server'

import prismadb from "@/lib/prismadb"
import { auth } from '@/lib/auth'
import { s3 } from '@/lib/s3'
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { revalidatePath } from "next/cache"

export const createBillboard = async (url: string, label: string, storeId: string | string[], pathname: string, isActive: boolean) => {
  const session = await auth()

  if (typeof session?.user === 'undefined') return { error: 'Unauthenticated' }
  if (!url || !label) { error: 'Fill in the all fields' }
  if (typeof storeId == 'object') storeId = storeId[ 0 ]

  const doesBillboardExist = await prismadb.billboard.findFirst({ where: { label } })

  if (doesBillboardExist) return { error: 'Unauthorized' }

  const billboard = await prismadb.billboard.create({ data: { imageUrl: url, label, storeId, isActive } })

  revalidatePath(pathname)

  return { billboard }
}

interface UpdateBillboardProps {
  storeId: string | string[]
  billboardId: string
  url?: string | null
  label?: string | null
  pathname: string
  isActive?: boolean
}

export const updateBillboard = async ({ billboardId, storeId, label, url, pathname, isActive }: UpdateBillboardProps) => {
  const session = await auth()

  if (typeof session?.user === 'undefined') return { error: 'Unauthenticated' }
  if (!billboardId || !storeId) { error: 'Fill in the all fields' }
  if (typeof storeId == 'object') storeId = storeId[ 0 ]

  const doesBillboardExist = await prismadb.billboard.findFirst({ where: { id: billboardId, store: { userId: session.user.id } } })

  if (!doesBillboardExist) return { error: "This billboard doesn't exist or it's not yours" }

  const billboard = await prismadb.billboard.updateMany({ where: { id: billboardId, storeId }, data: { imageUrl: url ? url : undefined, label: label ? label : undefined, isActive } })

  revalidatePath(pathname)

  return { billboard }
}


export const deleteBillboard = async (billboardId: string, storeId: string | string[], pathname: string) => {
  const session = await auth()

  if (typeof session?.user === 'undefined') return { error: 'Unauthenticated' }
  if (!billboardId || !storeId) { error: 'Fill in the all fields' }
  if (typeof storeId == 'object') storeId = storeId[ 0 ]

  const doesBillboardExist = await prismadb.billboard.findFirst({ where: { id: billboardId, store: { userId: session.user.id } } })

  if (!doesBillboardExist) return { error: "This billboard doesn't exist or it's not yours" }

  const billboard = await prismadb.billboard.deleteMany({ where: { id: billboardId, storeId } })

  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: doesBillboardExist.imageUrl.split('/').pop()
  })

  await s3.send(deleteObjectCommand)

  revalidatePath(pathname)

  return { billboard }
}