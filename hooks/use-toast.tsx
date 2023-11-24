import { useToast } from '@/components/ui/use-toast'

export const useToastImproved = () => {
  const { toast } = useToast()

  return function (title: string, description: string) {
    toast({ title, description })
  }
}
