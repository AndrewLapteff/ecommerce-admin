import { Billboard } from '@prisma/client'

export const revalidate = 0

const BillboardPage = ({ billboard }: { billboard: Billboard }) => {
  return (
    <div className="p-3 sm:p-3 lg:p-5 flex justify-center items-center">
      <h1 className="text-center font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
        {billboard.label}
      </h1>
    </div>
  )
}

export default BillboardPage
