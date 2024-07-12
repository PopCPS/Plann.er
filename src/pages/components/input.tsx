import { ReactNode } from "react"
import { tv, VariantProps } from 'tailwind-variants'

const inputVariants = tv({
  base: 'px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2',

  variants: {
    size: {
      default: 'h-14',
      tall: 'h-16'
    }
  },

  defaultVariants: {
    size: 'default'
  }
})

interface inputProps extends VariantProps<typeof inputVariants> {
  children: ReactNode
}

export function Input({
  children,
  size
}: inputProps) {
  return (
    <div className={inputVariants({ size })}>
      {children}
    </div>
  )
}