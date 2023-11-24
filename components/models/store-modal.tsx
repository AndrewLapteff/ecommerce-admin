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
import { useState } from 'react'
import { useToastImproved } from '@/hooks/use-toast'

export const StoreModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const storeModal = useStoreModal()
  const toast = useToastImproved()

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
      console.error(error)
      toast('Oops!', 'Smth went wrong')
    }
    setIsLoading(false)

    if (data == null) {
      toast('Oops!', 'Smth went wrong')
      return
    }

    if ('error' in data) {
      toast('Oops!', data?.error)
    } else {
      window.location.assign(`/${data.id}`)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
                  <Input
                    aria-label="Input a name of store"
                    disabled={isLoading}
                    placeholder="Amazon"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute" />
                <div className="flex justify-between pt-7">
                  <Button aria-label="Continue" disabled={isLoading} type="submit">
                    Continue
                  </Button>
                  <Button
                    aria-label="Cancel"
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
