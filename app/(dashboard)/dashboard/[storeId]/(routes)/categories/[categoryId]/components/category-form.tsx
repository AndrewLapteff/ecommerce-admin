'use client'

import { Billboard, Category } from '@prisma/client'
import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AlertModal from '@/components/models/alert-modal'
import { useToastImproved } from '@/hooks/use-toast'
import { useParams, usePathname, useRouter } from 'next/navigation'
import APIAlert from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'
import { categorySchema } from '@/validation/category-schema copy'
import { createCategory, deleteCategory, updateCategory } from '@/actions/category.actions'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface CategoryFormProps {
  categoryData: Category | null
  billboards?: Billboard[]
}

type CategorySchemaType = z.infer<typeof categorySchema>

const CategoryForm = ({ categoryData, billboards }: CategoryFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [isBillboardSelected, setIsBillboardSelected] = useState(false)

  const title = categoryData ? 'Edit category' : 'Add category'
  const description = categoryData ? 'Edit a category' : 'Add a new category'
  const toastMessage = categoryData
    ? `Category "${name || categoryData.name}" has been updated`
    : `Category "${name}" has been created`
  const action = categoryData ? 'Save Changes' : 'Create'
  const isCreating = categoryData ? false : true
  const isButtonDisabled = loading || name === categoryData?.name
  const isButtonDisabledCreate = !categoryData
    ? name.length > 2 && isBillboardSelected
      ? false
      : true
    : false

  const origin = useOrigin()
  const pathname = usePathname()
  const router = useRouter()
  const toast = useToastImproved()
  const params = useParams()
  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: categoryData || {
      name: '',
      billboardLabel: '3fdf95cd-c67d-40b3-880d-e5482c573559',
    },
  })

  const updateCategoryHandler = async (name: string, categoryData: Category) => {
    setLoading(true)
    const responseFromDB = await updateCategory({
      categorydId: categoryData.id,
      name: !name ? null : name,
      storeId: params.storeId,
      pathname,
    })

    if (responseFromDB?.error) {
      toast('Oops', responseFromDB?.error)
      return
    }

    router.push(`/${params.storeId}/categories`)
    toast('Success!', toastMessage)
  }

  const createCategoryHandler = async (data: CategorySchemaType) => {
    setLoading(true)
    const { name } = data

    let selectedBillboardId = ''
    billboards?.forEach((billboard) => {
      if (data.billboardLabel == billboard.label) {
        selectedBillboardId = billboard.id
      }
    })

    if (!selectedBillboardId) {
      toast('Oops', 'Billboard is not selected')
      return
    }

    const responseFromDB = await createCategory({
      name,
      storeId: params.storeId,
      billboardId: selectedBillboardId,
      pathname,
    })

    if (responseFromDB?.error) {
      toast('Oops', responseFromDB?.error)
      return
    }

    router.push(`/${params.storeId}/categories`)
    toast('Success!', toastMessage)
  }

  const onSubmit = async (data: CategorySchemaType) => {
    console.log(data)
    try {
      if (categoryData) {
        await updateCategoryHandler(data.name, categoryData)
      } else {
        await createCategoryHandler(data)
      }
    } catch (error) {
      console.error(error)
      toast('Oops!', "The image can't be uploaded right now")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    if (categoryData?.id) {
      try {
        await deleteCategory({ categoryId: categoryData.id, storeId: params.storeId, pathname })
        router.push(`/${params.storeId}/categories`)
        toast('Success!', 'Category successfuly deleted')
      } catch (error) {
        toast('Oops', 'Try it again')
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
        {categoryData && (
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
                setName(field.value)
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Jeans" {...field}></Input>
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )
              }}
            />
            {isCreating && (
              <FormField
                control={form.control}
                name="billboardLabel"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Billboard</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          setIsBillboardSelected(true)
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {billboards?.map((billboard) => {
                            return (
                              <SelectItem
                                key={billboard.id}
                                defaultValue={billboard.id}
                                value={billboard.label}
                              >
                                {billboard.label}
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
            )}
          </div>
          <Button
            aria-label="Save changes"
            disabled={isButtonDisabled || isButtonDisabledCreate}
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

export default CategoryForm
