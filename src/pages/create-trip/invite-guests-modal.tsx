import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../components/button"
import { Modal } from "../components/modal"

interface InviteGuestsModalProps {
  closeGuestsModal: () => void,
  emailsToInvite: string[],
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void,
  removeEmailFromInvites: (email: string) => void
}

export function InviteGuestsModal({ 
  addNewEmailToInvite, 
  closeGuestsModal, 
  emailsToInvite, 
  removeEmailFromInvites 
}: InviteGuestsModalProps) {
    return (
        <Modal title="Selecionar convidados" description="Os convidados irão receber e-mails para confirmar a participação na viagem." width="wide" closeModal={closeGuestsModal}>
          <div className='flex flex-wrap gap-2'>

            {emailsToInvite.map(email => {
              return (
                <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                  <span className='text-zinc-300'>{email}</span>
                  <button onClick={()=>{removeEmailFromInvites(email)}} type='button'>
                    <X className='text-zinc-400 size-4' />
                  </button>
                </div>
              )
            })}

          </div>

          <div className='h-px w-full bg-zinc-800'></div>

          <form onSubmit={addNewEmailToInvite} className='flex items-center bg-zinc-950 py-2.5 px-3 rounded-lg border border-zinc-800'>
            <div className='flex items-center gap-2 px-2 flex-1'>
              <AtSign className='size-5 text-zinc-400' />
              <input 
                placeholder='Digite o e-mail do convidado' 
                type="email" 
                name='email'
                className="flex-1 placeholder-zinc-400 text-lg bg-transparent outline-none" />
            </div>
            <Button type='submit'>
              Convidar
              <Plus />
            </Button>
          </form>
        </Modal>
    )
}