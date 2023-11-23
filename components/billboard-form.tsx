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
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import AlertModal from '@/components/models/alert-modal'
import { useOrigin } from '@/hooks/use-origin'
import { billboardSchema } from '@/validation/billboard-schema'
import Dropzone from './dropzone'

interface BillboardFormProps {
  billboardData: Billboard | null
}

type BillboardSchemaType = z.infer<typeof billboardSchema>

const BillboardForm = ({ billboardData }: BillboardFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  const title = billboardData ? 'Update billboard' : 'Add billboard'
  const description = billboardData ? 'Update a billboard' : 'Add a new billboard'
  const toastMessage = billboardData ? 'Billboard updated' : 'Billboard created'
  const action = billboardData ? 'Save Changes' : 'Create'

  const { toast } = useToast()
  const origin = useOrigin()
  const form = useForm<BillboardSchemaType>({
    resolver: zodResolver(billboardSchema),
    defaultValues: billboardData || {
      label: '',
      imageUrl: '',
    },
  })

  const onSubmit = async (data: BillboardSchemaType) => {}

  const onDelete = () => {}

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
                if (name !== field.value) setName(field.value)
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
          </div>
          <Dropzone />
          <Button aria-label="Save changes" disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </FormProvider>
      <Separator />
    </>
  )
}

export default BillboardForm
