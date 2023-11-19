import { PropsWithChildren } from 'react'

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full justify-center items-center">{children}</div>
  )
}
