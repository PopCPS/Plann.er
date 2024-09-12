import { Calendar, Tag } from "lucide-react";
import { Button } from "../components/button";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { Modal } from "../components/modal";
import { Input } from "../components/input";
import { Loading } from "../components/loading";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({
  closeCreateActivityModal
}: CreateActivityModalProps) {
  const { tripId } = useParams()

  const [ isLoading, setIsLoading ] = useState(false)

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsLoading(true)

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at
    })

    setIsLoading(false)
    window.document.location.reload()
  }

  return (
    <Modal title="Cadastrar atividade" description="Todos convidados podem visualizar as atividades." closeModal={closeCreateActivityModal}>
      <form onSubmit={createActivity} className="space-y-3">
        <Input>
          <Tag className="text-zinc-400 size-5" />
          <input
            name="title"
            placeholder="Qual a atividade?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </Input>

        <Input>
          <Calendar className="text-zinc-400 size-5" />
          <input
            type="datetime-local"
            name="occurs_at"
            placeholder="Data e horário da atividade"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </Input>

        <Button size="full">
          Salvar atividade
        </Button>
      </form>
      {isLoading && (
        <Loading />
      )}
    </Modal>
  )
}