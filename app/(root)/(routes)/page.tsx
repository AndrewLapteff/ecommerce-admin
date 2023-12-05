import BillboardPage from '@/components/store/billboard'
import Container from '@/components/ui/container'
import prismadb from '@/lib/prismadb'

export default async function Home() {
  // const { isOpen, onOpen, onClose } = useStoreModal()

  // useEffect(() => {
  //   if (!isOpen) onOpen()
  // }, [isOpen, onOpen])

  const billboard = await prismadb.billboard.findFirst({ skip: 2 })

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <BillboardPage billboard={billboard!} />
      </div>
    </Container>
  )
}
