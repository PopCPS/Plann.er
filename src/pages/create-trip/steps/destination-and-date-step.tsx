import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react"
import { Button } from "../../components/button"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"
import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'

import "react-day-picker/dist/style.css"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean,
  closeGuestsInput: () => void,
  openGuestsInput: () => void,
  setDestination: (destination: string) => void,
  setEventStartAndEndDates: (dates: DateRange | undefined) => void  
  eventStartAndEndDates: DateRange | undefined 
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates
}: DestinationAndDateStepProps) {

  const [ isDatePickerOpen, setIsDatePickerOpen ] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d' de 'LLL", {locale: ptBR}).concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL", {locale: ptBR}))
    : null

  return (
    <Input size="tall">
      <div className='flex items-center gap-2 flex-1'>
        <MapPin className='text-zinc-400 size-5' />
        <input 
          disabled={isGuestsInputOpen} 
          className="flex-1 placeholder-zinc-400 text-lg bg-transparent outline-none" 
          placeholder="Para onde você vai?" 
          type="text" 
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      <button onClick={openDatePicker} className='flex items-center gap-2 text-left'>
        <Calendar className='text-zinc-400 size-5' />
        <span className="text-zinc-400 text-lg min-w-40 flex-1">
          {displayedDate || 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <Modal title="Selecione a data" closeModal={closeDatePicker} width="contentSized"> 
          
            <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
 
        </Modal>
      )}
    
      <div className='w-px h-6 bg-zinc-800' />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className='size-5' />
        </Button>

      ): (
        <Button onClick={openGuestsInput} >
          Continuar
          <ArrowRight className='size-5' />
        </Button>
      )}
    </Input>
  )
}