'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ErrorPageProps {
  error: Error
  reset: () => void
}

const error = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-5 justify-center items-center">
      <h1 className="text-3xl font-semibold">{error.message}</h1>
      <div className="w-52 flex justify-between">
        <Button onClick={reset}>Try again</Button>
        <Link href="/">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  )
}

export default error
