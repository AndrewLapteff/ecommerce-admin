'use server'

import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"

export const createBillboard = async (url: string, label: string, storeId: string | string[]) => {
  const { userId } = auth()

  if (!userId) return { error: 'Unauthenticated' }
  if (!url || label) { error: 'Fill in the all fields' }
  if (typeof storeId == 'object') storeId = storeId[ 0 ]

  const doesBillboardExist = await prismadb.billboard.findFirst({ where: { label } })

  if (doesBillboardExist) return { error: 'Unauthorized' }

  const billboard = await prismadb.billboard.create({ data: { imageUrl: url, label, storeId } })

  return { billboard }
}