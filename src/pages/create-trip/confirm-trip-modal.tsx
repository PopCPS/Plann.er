import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../components/button";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void,
  createTrip: (event: FormEvent<HTMLFormElement>) => void,
  setOwnerName: (ownerName: string) => void
  setOwnerEmail: (ownerEmail: string) => void
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail
}: ConfirmTripModalProps) {
  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
      <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg'>Confirmar criação da viagem</h2>
            <button onClick={closeConfirmTripModal}>
              <X className='size-5 text-zinc-400' />
            </button>
          </div>
          <p className='text-sm text-zinc-400'>Para concluir a criação da viagem para <span className='text-zinc-100 font-semibold'>Florianópolis, Brasil</span> nas datas de <span className='text-zinc-100 font-semibold'>16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
        </div>

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
      </div>  
    </div>
  )
}