import prismadb from '@/lib/prismadb'
import { format } from 'date-fns'
import { CategoryColumn } from './components/columns'
import CategoryClient from './components/category-client'

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
    orderBy: { createdAt: 'desc' },
  })

  const formatedCategories: CategoryColumn[] = categories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      billboardLabel: category.billboard.label,
      createdAt: format(category.createdAt, 'MMMM do, yyyy'),
    }
  })

  return (
    <section className="flex-col">
      <div className="flex-1 space-x-3 p-8 pt-6">
        <CategoryClient category={formatedCategories} />
      </div>
    </section>
  )
}

export default CategoriesPage
