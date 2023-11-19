'use client'

import * as z from 'zod'
import { useStoreModal } from '@/hooks/use-store-modal'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Modal } from '@/components/ui/modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { formSchema } from '@/validation/form-schema'
import { Button } from '@/components/ui/button'
import { createStore } from '@/actions/store.actions'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

export const StoreModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const storeModal = useStoreModal()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const createStoreHandler = async (name: string) => {
    let data = null
    setIsLoading(true)
    try {
      data = await createStore({ name })
    } catch (error) {
      console.log(error)
      toast({ title: 'Oops!', description: 'Smth went wrong' })
    }
    console.log(data)
    setIsLoading(false)
    if (data?.hasOwnProperty('error'))
      toast({ title: 'Oops!', description: data?.error })
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await createStoreHandler(values.name)
  }

  return (
    <Modal
      title="Create Store"
      description="Add new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="Amazon" {...field} />
                </FormControl>
                <FormMessage />
                <div className="flex justify-between pt-3">
                  <Button disabled={isLoading} type="submit">
                    Continue
                  </Button>
                  <Button
                    disabled={isLoading}
                    variant="outline"
                    type="button"
                    onClick={storeModal.onClose}
                  >
                    Cancel
                  </Button>
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  )
}
