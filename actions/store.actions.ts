"use server"

import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

interface CreateStoreParams {
  name: string
}

interface UpdateStoreParams {
  storeId: string
  name: string
  pathname: string
}
interface DeleteStoreParams {
  storeId: string
  pathname: string
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

export async function updateStore({ storeId, name, pathname }: UpdateStoreParams) {
  try {
    const { userId } = auth()
    if (!userId) return { error: 'Unauthorized' }
    if (!name) return { error: 'Name is required' }
    const store = await prismadb.store.updateMany({ where: { id: storeId, userId }, data: { name } })
    revalidatePath(pathname)
    return store
  } catch (error) {
    return { error: 'Smth went wrong' }
  }
}

export async function deleteStore({ storeId, pathname }: DeleteStoreParams) {
  try {
    const { userId } = auth()
    if (!userId) return { error: 'Unauthorized' }
    const store = await prismadb.store.deleteMany({ where: { id: storeId, userId } })
    revalidatePath(pathname)
    return store
  } catch (error) {
    return { error: 'Smth went wrong' }
  }
}