import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = 'button', onClick, ...props }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        {...props}
        className={cn(
          `w-auto 
          rounded-md 
          bg-black 
          border-transparent 
          px-4 
          py-[0.4rem]
          disabled:cursor-not-allowed 
          disabled:opacity-50 
          text-white 
          font-semibold
          hover:opacity-75 
          transition`,
          className
        )}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
