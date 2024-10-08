import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../components/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

interface DestinationAndDateHeaderProps {
  openModal: () => void
  trip:{
    id: string,
    destination: string,
    starts_at: string,
    ends_at: string,
    is_confirmed: boolean
  }
}

export function DestinationAndDateHeader({
    openModal,
    trip
  }: DestinationAndDateHeaderProps) {
  

  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL", {locale: ptBR}).concat(' até ').concat(format(trip.ends_at, "d' de 'LLL", {locale: ptBR}))
    : null

  return (
    <div className="flex justify-between bg-zinc-900 shadow-shape rounded-xl px-4 h-16">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-100">{trip?.destination}</span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>
        <div className="w-px h-6 bg-zinc-800" />
          <Button onClick={openModal} variant="secondary">
            Alterar local/data
            <Settings2 className='size-5' />
          </Button>
        </div>
    </div>
  )
}