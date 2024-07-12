import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Input } from "../../components/input";

interface inviteGuestsStepProps { 
  openGuestsModal: () => void,
  openConfirmTripModal: () => void,
  emailsToInvite: string[]
}

export function InviteGuestsStep({
  openConfirmTripModal,
  openGuestsModal,
  emailsToInvite
}: inviteGuestsStepProps) {
  return (
    <Input size='tall'>
      <button onClick={openGuestsModal} className='flex items-center gap-2 flex-1'>
        <UserRoundPlus className='text-zinc-400 size-5' />
        {emailsToInvite.length > 0 ? (
          <span className='text-zinc-100 text-lg flex-1 text-left'>{emailsToInvite.length} pessoa(s) convidada(s)</span>
        ) : (
          <span className='text-zinc-400 text-lg flex-1 text-left'>Quem estará na viagem?</span>
        )}
      </button>

      <button onClick={openConfirmTripModal} className='bg-lime-300 text-lime-950 font-md px-5 py-2 rounded-lg flex gap-2 hover:bg-lime-400'>
        Confirmar viagem
        <ArrowRight className='size-5' />
      </button>
    </Input>
  )
}