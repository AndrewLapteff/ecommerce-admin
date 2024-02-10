'use client'

import { Purchase } from '@prisma/client'
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
import { orderSchema } from '@/validation/order-schema'
import { createOrder, deleteOrder } from '@/actions/order.actions'

interface OrderFormProps {
  order: Purchase | null
}

type OrderSchemaType = z.infer<typeof orderSchema>

const OrderForm = ({ order: orderData }: OrderFormProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [isBillboardSelected, setIsBillboardSelected] = useState(false)

  const title = orderData ? 'Edit order' : 'Add order'
  const description = orderData ? 'Edit an order' : 'Add a new order'
  const toastMessage = orderData
    ? `Order "${name || orderData.userId}" has been updated`
    : `Order "${name}" has been created`
  const action = orderData ? 'Save Changes' : 'Create'
  const isCreating = orderData ? false : true
  const isButtonDisabled = loading || name === orderData?.userId
  const isButtonDisabledCreate = !orderData
    ? name.length > 2 && isBillboardSelected
      ? false
      : true
    : false

  const origin = useOrigin()
  const pathname = usePathname()
  const router = useRouter()
  const toast = useToastImproved()
  const params = useParams()
  const form = useForm<OrderSchemaType>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerId: '',
      productsIds: [],
    },
  })

  // const updateOrderHandler = async (name: string, orderData: Purchase) => {
  //   setLoading(true)
  //   const responseFromDB = await updateOrder({
  //     orderId: orderData.id,
  //     name: !name ? null : name,
  //     storeId: params.storeId,
  //     pathname,
  //   })

  //   if (responseFromDB?.error) {
  //     toast('Oops', responseFromDB?.error)
  //     return
  //   }

  //   router.push(`/dashboard/${params.storeId}/orders`)
  //   toast('Success!', toastMessage)
  // }

  const createOrderHandler = async (data: OrderSchemaType) => {
    setLoading(true)
    const { customerId, productsIds } = data

    const responseFromDB = await createOrder({
      customerId,
      productsIds,
      pathname,
    })

    if (responseFromDB?.error) {
      toast('Oops', responseFromDB?.error)
      return
    }

    router.push(`/dashboard/${params.storeId}/orders`)
    toast('Success!', toastMessage)
  }

  const onSubmit = async (data: OrderSchemaType) => {
    console.log(data)
    try {
      if (orderData) {
        // await updateOrderHandler(data.name, orderData)
      } else {
        await createOrderHandler(data)
      }
    } catch (error) {
      console.error(error)
      toast('Oops!', "The image can't be uploaded right now")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    if (orderData?.id) {
      try {
        await deleteOrder({ orderId: orderData.id, pathname })
        router.push(`/dashboard/${params.storeId}/orders`)
        toast('Success!', 'Order successfuly deleted')
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
        {orderData && (
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
              name="customerId"
              render={({ field }) => {
                setName(field.value)
                return (
                  <FormItem>
                    <FormLabel>Customer ID</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Jeans" {...field}></Input>
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )
              }}
            />
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

export default OrderForm
