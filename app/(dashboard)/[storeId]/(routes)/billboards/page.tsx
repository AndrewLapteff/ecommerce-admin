import BillboardClient from '@/components/billboard-client'

const BillboardsPage = () => {
  return (
    <section className="flex-col">
      <div className="flex-1 space-x-3 p-8 pt-6">
        <BillboardClient />
      </div>
    </section>
  )
}

export default BillboardsPage
