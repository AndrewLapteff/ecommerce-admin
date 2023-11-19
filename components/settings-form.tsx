'use client'

import { Store } from '@prisma/client'
import Heading from './ui/heading'
import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import { Separator } from './ui/separator'

interface SettingsFormProps {
  store: Store
}

const SettingsForm = ({ store }: SettingsFormProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button size="sm" aria-label="Delete the store" variant="destructive">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
    </>
  )
}

export default SettingsForm
