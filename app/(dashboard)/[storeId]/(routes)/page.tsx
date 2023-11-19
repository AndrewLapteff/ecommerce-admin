import prismadb from '@/lib/prismadb'
import { NextPage } from 'next'

interface Props {
  params: { storeId: string }
}

const Page: NextPage<Props> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: { id: params.storeId },
  })

  return <div>Active store: {store?.name}</div>
}

export default Page
