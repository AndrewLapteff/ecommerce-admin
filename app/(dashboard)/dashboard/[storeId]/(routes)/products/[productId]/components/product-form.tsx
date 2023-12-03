'use client'

import { Category, Product } from '@prisma/client'
import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AlertModal from '@/components/models/alert-modal'
import Dropzone from './dropzone'
import { useDropzoneFile } from '@/hooks/use-dropzone-file'
import { getSignedURL } from '@/actions/image.actions'
import { useToastImproved } from '@/hooks/use-toast'
import { createProduct, deleteProduct, updateProduct } from '@/actions/product.actions'
import { useParams, usePathname, useRouter } from 'next/navigation'
import APIAlert from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'
import { productSchema } from '@/validation/product-schema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@radix-ui/react-label'
import { Checkbox } from '@/components/ui/checkbox'

interface ProductFormProps {
  productData: Product | null
  categories?: Category[]
}

type ProductSchemaType = z.infer<typeof productSchema>

const ProductForm = ({ productData, categories }: ProductFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [label, setLabel] = useState('')
  const { file, isUploaded } = useDropzoneFile()
  const [isUploadImage, setIsUploadImage] = useState(false)

  const title = productData ? 'Update product' : 'Add product'
  const description = productData ? 'Update a product' : 'Add a new product'
  const toastMessage = productData
    ? `Product "${label || productData.name}" has been updated`
    : `Product "${label}" has been created`
  const action = productData ? 'Save Changes' : 'Create'
  const productDataForForm = {
    name: productData?.name || '',
    price: new Number(productData?.price) || 0,
    categoryId: productData?.categoryId || '',
    url: productData?.image || '',
    isFeatured: productData?.isFeatured || false,
    isArchived: productData?.isArchived || false,
  }

  const origin = useOrigin()
  const pathname = usePathname()
  const router = useRouter()
  const toast = useToastImproved()
  const params = useParams()
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    // @ts-ignore
    defaultValues: productDataForForm,
  })
  const { isDirty, isValid } = form.formState

  const updateProductHandler = async (
    file: File | null,
    newProductData: ProductSchemaType,
    oldProductData: Product
  ) => {
    setLoading(true)
    let sign = null
    if (file && isUploaded) {
      sign = await getSignedURL(file.type, file.size)

      if (!sign.url) return
      if (sign.error) {
        toast('Oops', sign.error)
        return
      }

      const responseFromAWS = await fetch(sign.url, {
        body: file,
        headers: { 'Content-Type': file.type },
        method: 'PUT',
      })

      if (!responseFromAWS.ok) throw new Error('Smth went wrong')
    }

    const responseFromDB = await updateProduct({
      productId: oldProductData.id,
      name: newProductData.name,
      price: newProductData.price,
      categoryId: newProductData.categoryId,
      imageUrl: newProductData.url,
      isFeatured: newProductData.isFeatured,
      isArchived: newProductData.isArchived,
      pathname,
    })

    if (responseFromDB?.error) {
      toast('Oops', responseFromDB?.error)
      return
    }

    router.push(`/${params.storeId}/products`)
    toast('Success!', toastMessage)
  }

  const createProductHandler = async (file: File | null, newProductData: ProductSchemaType) => {
    const { categoryId, name, price, isArchived, isFeatured } = newProductData
    setLoading(true)
    let urlForDB = ''
    if (!file) {
      if (newProductData.url !== undefined) urlForDB = newProductData.url
    } else {
      const { url, error } = await getSignedURL(file.type, file.size)

      if (!url) return
      if (error) {
        toast('Oops', error)
        return
      }

      const responseFromAWS = await fetch(url, {
        body: file,
        headers: { 'Content-Type': file.type },
        method: 'PUT',
      })

      if (!responseFromAWS.ok) throw new Error('Smth went wrong')
      urlForDB = url.split('?')[0]
    }

    const responseFromDB = await createProduct({
      imageUrl: urlForDB,
      name,
      price,
      storeId: params.storeId,
      categoryId,
      isArchived,
      isFeatured,
      pathname,
    })

    if (responseFromDB?.error) {
      toast('Oops', responseFromDB?.error)
      return
    }

    router.push(`/${params.storeId}/products`)
    toast('Success!', toastMessage)
  }

  const onSubmit = async (data: ProductSchemaType) => {
    try {
      if (productData) {
        await updateProductHandler(file, data, productData)
      } else {
        await createProductHandler(file, data)
      }
    } catch (error) {
      console.error(error)
      toast('Oops!', "The image can't be uploaded right now")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    if (productData?.id) {
      try {
        await deleteProduct(productData.id, params.storeId, pathname)
        router.push(`/${params.storeId}/products`)
        toast('Success!', 'Product successfuly deleted')
      } catch (error) {
        toast('Oops', 'Try again')
        console.log(error)
      }
    } else {
      toast('Oops', 'Try is later')
    }
  }

  return (
    <>
      {isOpen && (
        <AlertModal
          isOpen={isOpen}
          loading={loading}
          onClose={() => setIsOpen(false)}
          onConfirm={() => onDelete()}
        />
      )}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {productData && (
          <Button
            onClick={() => setIsOpen(true)}
            disabled={loading}
            size="sm"
            aria-label="Delete the store"
            variant="destructive"
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-8/12">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                setLabel(field.value)
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Product's name" {...field}></Input>
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="number" placeholder="100" {...field}></Input>
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(value) => {
                        field.onChange(value)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => {
                          return (
                            <SelectItem
                              key={category.id}
                              defaultValue={category.id}
                              value={category.id}
                            >
                              {category.name}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage className="absolute" />
                  </FormItem>
                )
              }}
            />
          </div>
          <div className="flex gap-16 flex-wrap">
            <FormField
              disabled={loading}
              control={form.control}
              name="isFeatured"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>This product will appear on the main page</FormDescription>
                    </div>
                    <FormMessage className="absolute" />
                  </FormItem>
                )
              }}
            />
            <FormField
              disabled={loading}
              control={form.control}
              name="isArchived"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        This product will not appear anywhere in the store
                      </FormDescription>
                    </div>
                    <FormMessage className="absolute" />
                  </FormItem>
                )
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="urlOrImg" onCheckedChange={setIsUploadImage} />
            <Label htmlFor="urlOrImg">Upload image</Label>
          </div>
          <div className="flex flex-col gap-7">
            <FormField
              disabled={isUploadImage}
              control={form.control}
              name="url"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className={`${isUploadImage ? 'text-gray-300' : 'text-gray-600'}`}>
                      URL
                    </FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="URL of image" {...field}></Input>
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )
              }}
            />

            <Dropzone isUrl={isUploadImage} />
          </div>

          <Button
            aria-label="Save changes"
            disabled={loading || !isDirty || !isValid}
            type="submit"
          >
            {action}
          </Button>
        </form>
      </FormProvider>
      <Separator />
      <APIAlert
        title="NEXT_PUBLIC_API_BILLBOARD_URL"
        description={`${origin}${pathname}`}
        variant="public"
      />
    </>
  )
}

export default ProductForm
