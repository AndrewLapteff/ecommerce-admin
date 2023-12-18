import prismadb from "@/lib/prismadb"
import { slugifyCategoryName } from "@/lib/utils"

export default async function sitemap() {
  const baseUrl = 'https://onedollarcourses.vercel.app'

  const fetchedProducts = await prismadb.product.findMany()
  const fetchedCategories = await prismadb.category.findMany()

  const productUrls = fetchedProducts.map((product) => {
    return {
      url: `${baseUrl}/product/${product.id}`,
      lastModified: product.updatedAt.toISOString(),
    }
  })

  const categoryUrls = fetchedCategories.map((category) => {
    return {
      url: `${baseUrl}/category/${slugifyCategoryName(category.name)}`,
      lastModified: category.updatedAt.toISOString(),
    }
  })

  return [
    { url: baseUrl, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/cart`, lastModified: new Date().toISOString() },
    { url: `${baseUrl}/profile`, lastModified: new Date().toISOString() },
    ...productUrls,
    ...categoryUrls,
  ]


}