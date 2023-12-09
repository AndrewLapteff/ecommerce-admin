'use client'

import { Billboard } from '@prisma/client'
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
import { billboardSchema } from '@/validation/billboard-schema'
import Dropzone from './dropzone'
import { useDropzoneFile } from '@/hooks/use-dropzone-file'
import { getSignedURL } from '@/actions/image.actions'
import { useToastImproved } from '@/hooks/use-toast'
import { createBillboard, deleteBillboard, updateBillboard } from '@/actions/billboard.actions'
import { useParams, usePathname, useRouter } from 'next/navigation'
import APIAlert from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'
import { Checkbox } from '@/components/ui/checkbox'

interface BillboardFormProps {
  billboardData: Billboard | null
}

type BillboardSchemaType = z.infer<typeof billboardSchema>

const BillboardForm = ({ billboardData }: BillboardFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [label, setLabel] = useState('')
  const { file, isUploaded } = useDropzoneFile()

  const title = billboardData ? 'Update billboard' : 'Add billboard'
  const description = billboardData ? 'Update a billboard' : 'Add a new billboard'
  const toastMessage = billboardData
    ? `Billboard "${label || billboardData.label}" has been updated`
    : `Billboard "${label}" has been created`
  const action = billboardData ? 'Save Changes' : 'Create'
  const creatingOrUpdatingBillboardValidation = billboardData
    ? false
    : !isUploaded || label.length < 3
  const creatingOrUpdatingChecker = billboardData ? true : file !== null && isUploaded

  const origin = useOrigin()
  const pathname = usePathname()
  const router = useRouter()
  const toast = useToastImproved()
  const params = useParams()
  const form = useForm<BillboardSchemaType>({
    resolver: zodResolver(billboardSchema),
    defaultValues: billboardData || {
      label: '',
    },
  })

  const updateBillboardHandler = async (
    file: File | null,
    label: string,
    isActive: boolean,
    billboardData: Billboard
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

    const responseFromDB = await updateBillboard({
      billboardId: billboardData.id,
      label: !label ? null : label,
      storeId: params.storeId,
      url: sign !== null && sign.url ? sign.url.split('?')[0] : null,
      pathname,
      isActive,
    })

    if (responseFromDB?.error) {
      toast('Oops', responseFromDB?.error)
      return
    }

    router.push(`/dashboard/${params.storeId}/billboards`)
    toast('Success!', toastMessage)
  }

  const createBillboardHandler = async (file: File | null, label: string, isActive: boolean) => {
    setLoading(true)
    if (!file) {
      toast('Oops!', "It seems like you didn't upload a file")
      return
    }
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

    const responseFromDB = await createBillboard(
      url.split('?')[0],
      label,
      params.storeId,
      pathname,
      isActive
    )

    if (responseFromDB?.error) {
      toast('Oops', responseFromDB?.error)
      return
    }

    router.push(`/dashboard/${params.storeId}/billboards`)
    toast('Success!', toastMessage)
  }

  const onSubmit = async (data: BillboardSchemaType) => {
    if (creatingOrUpdatingChecker) {
      try {
        if (billboardData) {
          await updateBillboardHandler(file, data.label, data.isActive, billboardData)
        } else {
          await createBillboardHandler(file, data.label, data.isActive)
        }
      } catch (error) {
        console.error(error)
        toast('Oops!', "The image can't be uploaded right now")
      } finally {
        setLoading(false)
      }
    }
  }

  const onDelete = async () => {
    if (billboardData?.id) {
      try {
        await deleteBillboard(billboardData.id, params.storeId, pathname)
        router.push(`/dashboard/${params.storeId}/billboards`)
        toast('Success!', 'Billboard successfuly deleted')
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
        {billboardData && (
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
              name="label"
              render={({ field }) => {
                setLabel(field.value)
                return (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Billboard label" {...field}></Input>
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )
              }}
            ></FormField>
            <FormField
              disabled={loading}
              control={form.control}
              name="isActive"
              render={({ field }) => {
                return (
                  <FormItem>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Active</FormLabel>
                      <FormDescription>This billboard will appear on the main page</FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )
              }}
            />
          </div>
          <Dropzone />
          <Button
            aria-label="Save changes"
            disabled={loading || creatingOrUpdatingBillboardValidation}
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

export default BillboardForm
