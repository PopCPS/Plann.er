import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participants {
  id: string,
  name: string,
  email: string,
  is_confirmed: boolean,
}

export function Guests() {

  const { tripId } = useParams()
  const [ participants, setParticipants ] = useState<Participants[]>([]) 

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <span className="text-xl font-semibold">Convidados</span>
      
      <div className="space-y-5">

        {participants.map((participants, index) => {
          return (
            <div key={participants.id} className="flex items-center justify-between">
              <div className="flex flex-col space-y-1.5 max-w-60">								
                <span className="font-semibold text-zinc-100">{participants.name ?? `Convidado ${index}`}</span>
                <span className="text-sm text-zinc-400 truncate">{participants.email}</span>
              </div>
              {participants.is_confirmed ? (
                <CircleCheck className="size-5 text-lime-300" />
              ): (
                <CircleDashed className="size-5 text-zinc-400" />
              )}
            </div>
          )
        })}

        <Button type='submit' variant="secondary" size="full">
          <UserCog />
          Gerenciar convidados
        </Button>
        
      </div>
    </div>
  )
}