"use server"

import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"

interface CreateStoreParams {
  name: string
}

export async function createStore({ name }: CreateStoreParams) {
  try {
    const { userId } = auth()
    if (!userId) return { error: 'Unauthorized' }
    if (!name) return { error: 'Specify a name for your store' }
    const store = await prismadb.store.create({ data: { name, userId } })
    return store
  } catch (error) {
    return { error: 'Smth went wrong' }
  }
}