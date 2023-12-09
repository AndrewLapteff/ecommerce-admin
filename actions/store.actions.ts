"use server"

import prismadb from "@/lib/prismadb"
import { auth } from "@/lib/auth"
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
    const session = await auth()
    if (typeof session?.user === 'undefined') return { error: 'Unauthorized' }
    if (!name) return { error: 'Specify a name for your store' }
    const store = await prismadb.store.create({ data: { name, userId: session.user.id } })
    return store
  } catch (error) {
    return { error: 'Smth went wrong' }
  }
}

export async function updateStore({ storeId, name, pathname }: UpdateStoreParams) {
  try {
    const session = await auth()
    if (typeof session?.user === 'undefined') return { error: 'Unauthorized' }
    if (!name) return { error: 'Name is required' }
    const store = await prismadb.store.updateMany({ where: { id: storeId, userId: session.user.id }, data: { name } })
    revalidatePath(pathname)
    return store
  } catch (error) {
    return { error: 'Smth went wrong' }
  }
}

export async function deleteStore({ storeId, pathname }: DeleteStoreParams) {
  try {
    const session = await auth()
    if (typeof session?.user === 'undefined') return { error: 'Unauthorized' }
    const store = await prismadb.store.deleteMany({ where: { id: storeId, userId: session.user.id } })
    revalidatePath(pathname)
    return store
  } catch (error) {
    return { error: 'Smth went wrong' }
  }
}