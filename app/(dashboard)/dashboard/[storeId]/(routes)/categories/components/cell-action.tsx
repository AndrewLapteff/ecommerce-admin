'use client'

import { Copy, Edit, MoreHorizontalIcon, Trash } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useToastImproved } from '@/hooks/use-toast'
import { useState } from 'react'
import AlertModal from '@/components/models/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { CategoryColumn } from './columns'
import { deleteCategory } from '@/actions/category.actions'

interface CellActionProps {
  data: CategoryColumn
}

const CellActionCategory = ({ data }: CellActionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const params = useParams()
  const toast = useToastImproved()
  const pathname = usePathname()

  const onCopy = () => {
    navigator.clipboard.writeText(data.id)
    toast('Success!', 'Copied')
  }

  const onDelete = async () => {
    if (data.id) {
      try {
        await deleteCategory({ categoryId: data.id, storeId: params.storeId, pathname })
        router.push(`/${params.storeId}/categories`)
        toast('Success!', 'Category successfuly deleted')
      } catch (error) {
        toast('Oops', 'Try it again')
        console.log(error)
      }
    } else {
      toast('Oops', 'Try it later')
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="outline">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="select-none">Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)}
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)} className="cursor-pointer">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellActionCategory
