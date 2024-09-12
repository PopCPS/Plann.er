import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Input } from "../components/input";
import { Modal } from "../components/modal";
import { DateRange, DayPicker } from "react-day-picker";
import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale'
import { Button } from "../components/button";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { Loading } from "../components/loading";

interface ChangeDateAndLocationModalProps {
  closeModal: () => void,
  destination: string,
  starts_at: string,
  ends_at: string,
}

export function ChangeDateAndLocationModal({
  closeModal,
  destination,
  starts_at,
  ends_at
}: ChangeDateAndLocationModalProps) {

  const [ isDatePickerOpen, setIsDatePickerOpen ] = useState(false)
  const [ eventStartAndEndDates, setEventStartAndEndDates ] = useState<DateRange | undefined>()
  const [ isLoading, setIsLoading ] = useState(false)
  const { tripId } = useParams() 

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  function updateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const destination = data.get('destination')?.toString()

    if(!eventStartAndEndDates) {
      return
    }

    if(!destination) {
      return
    }

    setIsLoading(true)

    api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to
    })

    setIsLoading(false)

    window.location.reload()
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d' de 'LLL", {locale: ptBR}).concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL", {locale: ptBR}))
    : null

  const previousDate = starts_at && ends_at 
    ? format(starts_at, "d' de 'LLL", {locale: ptBR}).concat(' até ').concat(format(ends_at, "d' de 'LLL", {locale: ptBR}))
    : null

  return (
    <Modal
      width="contentSized"
      closeModal={closeModal}
      title="Alterar data e local da viagem."
    >
      <form onSubmit={updateTrip} className="space-y-3">
        <Input size="tall">
          <div className='flex items-center gap-2 flex-1'>
            <MapPin className='text-zinc-400 size-5' />
            <input 
              className="flex-1 placeholder-zinc-400 text-lg bg-transparent outline-none" 
              placeholder={destination}
              type="text" 
              name="destination"
              //onChange={event => setDestination(event.target.value)}
            />
          </div>
        </Input>
        <Input size="tall">
          <button onClick={openDatePicker} className='flex items-center gap-2 text-left'>
            <Calendar className='text-zinc-400 size-5' />
            <span className="text-zinc-400 text-lg min-w-40 flex-1">
              {displayedDate || previousDate}
            </span>
          </button>
        </Input>
      
        <Button size="full">
          Alterar local/data
          <Settings2 />
         </Button>

        {isDatePickerOpen && (
          <Modal title="Selecione a data" closeModal={closeDatePicker} width="contentSized"> 
            
              <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
  
          </Modal>
        )}

      </form>
      {isLoading && (
        <Loading />
      )}
    </Modal>
  )
}