import { Children, ReactNode } from "react";

interface modalProps {
  children: ReactNode
}

export function Modal({
  children,
}: modalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      {children}
    </div>
  )
}