import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  date: string,
  activities: {
    id: string,
    title: string,
    occurs_at: string
  }[]
}

export function Activities() {

  const { tripId } = useParams()
  const [ activities, setActivities ] = useState<Activity[]>([]) 

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
  }, [tripId])

  return (
    <div className="space-y-8">

      {activities.map(category => {
        return (
          <div key={category.date} className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-xl text-zinc-300 font-semibold">Dia {format(category.date, 'd')}</span>
              <span className="text-xs text-zinc-500">{format(category.date,'EEEE', {locale: ptBR})}</span>
            </div>
            {category.activities.length === 0 ? (
              <p className="text-sm text-zinc-500">Nenhuma atividade cadastrada nessa data.</p>
            ): (
              category.activities.map(activity => {
                return (
                  <div key={activity.id} className="flex items-center gap-3 px-4 h-10 rounded-xl shadow-shape bg-zinc-900">
                    <CircleCheck className="text-lime-300 size-5"/>
                    <span className="text-md text-zinc-100">{activity.title}</span>
                    <span className="text-zinc-400 text-sm ml-auto">
                      {format(activity.occurs_at, "HH:mm")}h
                    </span>
                  </div>
                )
              })
            )}
          </div>
        )
      })}

      
      {/* <div className="space-y-3">

        <div className="space-y-3">
          <div className="flex items-center gap-3 px-4 h-10 rounded-xl shadow-shape bg-zinc-900">
            <CircleCheck className="text-lime-300 size-5"/>
            <span className="text-md text-zinc-100">Corrida de kart</span>
            <span className="text-zinc-400 text-sm ml-auto">14:00h</span>
          </div>

          <div className="flex items-center gap-3 px-4 h-10 rounded-xl shadow-shape bg-zinc-900">
            <CircleDashed className="text-zinc-400 size-5"/>
            <span className="text-md text-zinc-100">Gaming session</span>
            <span className="text-zinc-400 text-sm ml-auto">18:00h</span>
          </div>
        </div>
      </div> */}
    </div>
  )
}