import { Link2, Tag } from "lucide-react";
import { Modal } from "../components/modal";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useParams } from "react-router-dom";
import { FormEvent } from "react";
import { api } from "../../lib/axios";

interface CreateImportantLinkModalProps {
  closeCreateImportantLinkModal: () => void
}

export function CreateImportantLinkModal({
  closeCreateImportantLinkModal
}: CreateImportantLinkModalProps) {
  const { tripId } = useParams()

  async function createImportantLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const link = data.get('link')?.toString()

    await api.post(`/trips/${tripId}/links`, {
      title,
      link
    })

    console.log({ title, link })
  }

  return (
    <Modal
      title="Cadastrar link"
      description="Todos convidados podem visualizar os links importantes."
      closeModal={closeCreateImportantLinkModal}
    >

      <form onSubmit={createImportantLink} className="space-y-3">
        <Input>
          <Tag className="size-5 text-zinc-400" />
          <input 
            className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none" 
            name="title"
            placeholder="Título do link"
        />
        </Input>
        <Input>
          <Link2 className="size-5 text-zinc-400" />
          <input 
            className="bg-transparent text-lg  placeholder-zinc-400 flex-1 outline-none" 
            name="link" 
            placeholder="URL" 
        />
        </Input>
        <Button size="full">
            Salvar link
        </Button>
      </form>

    </Modal>
  )
}