// import { DateRange } from "react-day-picker";
import { Mail, User } from "lucide-react";
import { Input } from "../components/input";
import { Modal } from "../components/modal";
import { Button } from "../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { Participants } from "../../lib/participants";

interface ConfirmAttendanceModalProps {
  closeConfirmAttendanceModal: () => void,
  // setParticipants: React.Dispatch<React.SetStateAction<Participants[]>>,
  participants: Participants[],
  // destination: string,
  // displayedDate: DateRange | undefined
}

export function ConfirmAttendanceModal({
  closeConfirmAttendanceModal,
  participants,
}: ConfirmAttendanceModalProps) {

  async function confirmAttendance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = data.get('email')?.toString()

    function findGuestByEmail(participants: Participants[], emailToCheck: string): string | null {
      const participant = participants.find(participant => participant.email === emailToCheck)
      return participant ? participant.id: null
    }

    email && ( 
      api.get(`/participants/${findGuestByEmail(participants, email)}/confirm`)
    )

    window.location.reload()
  }

  return (
    <Modal 
      title="Confirmar participação"
      description={`Você foi convidado(a) para participar de uma viagem para ${null} nas datas de ${null}.

      Para confirmar sua presença na viagem, preencha os dados abaixo:`}
      closeModal={closeConfirmAttendanceModal}
    >
      <form onSubmit={confirmAttendance} className="space-y-3">
        <Input>
          <User className="size-5 text-zinc-400" />
          <input 
            name="nome"
            placeholder="Seu nome completo" 
            className="bg-transparent placeholder-zinc-400 text-lg outline-none flex-1"
          />
        </Input>
        <Input>
          <Mail className="size-5 text-zinc-400" />
          <input 
            type="email"
            name="email"
            placeholder="Seu e-mail" 
            className="bg-transparent placeholder-zinc-400 text-lg outline-none flex-1"
          />
        </Input>
        <Button size="full">
          Confirmar minha presença
        </Button>
      </form>
    </Modal>
  )
}