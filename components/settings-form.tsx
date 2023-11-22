'use client'

import { Store } from '@prisma/client'
import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useForm, FormProvider } from 'react-hook-form'
import * as z from 'zod'
import { formSchema } from '@/validation/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { deleteStore, updateStore } from '@/actions/store.actions'
import { useToast } from '@/components/ui/use-toast'
import { usePathname, useRouter } from 'next/navigation'
// const AlertModal = dynamic(() => import('@/components/models/alert-modal'))
import AlertModal from '@/components/models/alert-modal'
import APIAlert from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'

interface SettingsFormProps {
  store: Store
}

type FormSchemaType = z.infer<typeof formSchema>

const SettingsForm = ({ store }: SettingsFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  const { toast } = useToast()
  const pathname = usePathname()
  const router = useRouter()
  const origin = useOrigin()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  })

  const onSubmit = async (data: FormSchemaType) => {
    if (data.name === store.name) return
    try {
      setLoading(true)
      const response = await updateStore({
        name: data.name,
        storeId: store.id,
        pathname,
      })
      if ('error' in response) {
        toast({
          title: 'Oops!',
          description: response.error,
        })
      } else {
        toast({
          title: 'Success!',
          description: 'The name was successfully updated',
        })
      }
      console.log(response)
    } catch (error) {
      toast({
        title: 'Oops!',
        description: 'Smth went wrong',
      })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = () => {
    try {
      setLoading(true)
      deleteStore({ storeId: store.id, pathname })
      router.push('/')
      toast({
        title: 'Success!',
        description: 'Store has been deleted',
      })
    } catch (error) {
      toast({
        title: 'Alert!',
        description: 'Make sure you deleted all products and categories first',
      })
    } finally {
      setLoading(false)
      setIsOpen(false)
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
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          onClick={() => setIsOpen(true)}
          disabled={loading}
          size="sm"
          aria-label="Delete the store"
          variant="destructive"
        >
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-8/12"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                if (name !== field.value) setName(field.value)
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Store name"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            ></FormField>
          </div>
          <Button
            aria-label="Save changes"
            disabled={loading || name === store.name}
            type="submit"
          >
            Save
          </Button>
        </form>
      </FormProvider>
      <Separator />
      <APIAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${store.id}`}
        variant="admin"
      />
    </>
  )
}

export default SettingsForm
