'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Copy, Server } from 'lucide-react'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from './use-toast'

interface APIAlertProps {
  title: string
  description: string
  variant: 'public' | 'admin'
}

const textMap: Record<APIAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
}

const variantMap: Record<APIAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
}

const APIAlert = ({ description, title, variant }: APIAlertProps) => {
  const { toast } = useToast()

  const onCopy = () => {
    navigator.clipboard.writeText(description)
    toast({ title: 'Success!', description: 'Copied' })
  }

  return (
    <Alert>
      <AlertTitle className="flex items-center gap-2">
        <Server className="h-4 w-4" />
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <code className="font-semibold font-mono">{description}</code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

export default APIAlert
