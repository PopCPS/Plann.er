import { X } from "lucide-react";
import { ReactNode } from "react";
import { tv, VariantProps } from 'tailwind-variants'

const modalVariants = tv({
  base: 'rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5',

  variants: {
    width: {
      default: 'w-[540px]',
      wide: 'w-[640px]',
      contentSized: 'w-fit'
    },
  },

  defaultVariants: {
    width: 'default'
  }
})
interface modalProps extends VariantProps<typeof modalVariants>{
  children: ReactNode,
  title: string,
  description?: ReactNode | string
  closeModal: () => void
}

export function Modal({
  children,
  title,
  description,
  closeModal,
  width,
}: modalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className={modalVariants({ width })}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="font-lg font-semibold">{title}</h2>
              <button>
                <X className="size-5 text-zinc-400" onClick={closeModal} />
              </button>
            </div>

            <p className="text-sm text-zinc-400">
              {description}
            </p>
          </div>
          {children}
      </div>
    </div>
  )
}