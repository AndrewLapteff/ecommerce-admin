import prismadb from "@/lib/prismadb"

export const getUserData = async (id: string) => {
  if (!id) return { error: 'No id provided' }

  return await prismadb.user.findFirst({ where: { id: id } })
}