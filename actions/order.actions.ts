'use server'

import { auth } from "@/lib/auth"
import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"

interface CreateOrderProps {
  customerId: string
  productsIds: string[]
  pathname: string
}


export async function createOrder({ customerId, productsIds, pathname }: CreateOrderProps) {
  const session = await auth()

  if (typeof session?.user === 'undefined') return { error: 'Unauthenticated' }
  if (!customerId || !productsIds) return { error: 'Fill in the all fields' }

  if (productsIds.length > 1) {
    await prismadb.purchase.create({ data: { userId: customerId, productId: productsIds[ 0 ] } })
  } else {
    while (productsIds.length > 0) {
      await prismadb.purchase.create({ data: { userId: customerId, productId: productsIds[ 0 ] } })
      productsIds.shift()
    }
  }

  revalidatePath(pathname)

  return
}

interface DeleteOrderProps {
  orderId: string
  pathname: string
}

export async function deleteOrder({ orderId, pathname }: DeleteOrderProps) {
  await prismadb.order.delete({ where: { id: orderId } })

  revalidatePath(pathname)
}