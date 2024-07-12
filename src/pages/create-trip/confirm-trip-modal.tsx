import { Mail, User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../components/button";
import { Modal } from "../components/modal";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void,
  createTrip: (event: FormEvent<HTMLFormElement>) => void,
  setOwnerName: (ownerName: string) => void,
  setOwnerEmail: (ownerEmail: string) => void,
  destination: string,
  eventStartAndEndDates: DateRange | undefined,
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  destination,
  eventStartAndEndDates
}: ConfirmTripModalProps) {

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d' de 'LLL", {locale: ptBR}).concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL", {locale: ptBR}))
    : null

  return (
    <Modal 
      title="Confirmar criação da viagem" 
      description={`Para concluir a criação da viagem para ${destination} nas datas de ${displayedDate} preencha seus dados abaixo:`} 
      closeModal={closeConfirmTripModal}
    >
        <form onSubmit={createTrip} className='space-y-3'>
          <div className='space-y-2'>
            <div className='flex items-center flex-1 gap-2 h-14 px-5 border border-zinc-800 bg-zinc-950 rounded-lg'>
              <User className='size-5 text-zinc-400' />
              <input 
                placeholder='Seu nome completo' 
                type="text" 
                name='name'
                className="flex-1 placeholder-zinc-400 text-lg bg-transparent outline-none" 
                onChange={event => setOwnerName(event.target.value)}
              />  
            </div>
            <div className='flex items-center flex-1 gap-2 h-14 px-5 border border-zinc-800 bg-zinc-950 rounded-lg'>
              <Mail className='size-5 text-zinc-400' />
              <input 
                placeholder='Seu e-mail pessoal' 
                type="email" 
                name='email'
                className="flex-1 placeholder-zinc-400 text-lg bg-transparent outline-none" 
                onChange={event => setOwnerEmail(event.target.value)}
              />
            </div>
          </div>
          <Button type='submit' size="full">
            Confirmar criação da viagem
          </Button>
        </form>
    </Modal>
  )
}