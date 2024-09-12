import { LoaderCircle } from "lucide-react"

export const Loading = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
      <LoaderCircle size={40} className="animate-spin text-zinc-200" />
    </div>
  )
}