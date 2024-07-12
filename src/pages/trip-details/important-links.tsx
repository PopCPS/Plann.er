import { Link2, Plus } from "lucide-react";
import { Button } from "../components/button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Links {
  id: string,
  title: string,
  url: string
}

interface ImportantLinksProps {
  openCreateImportantLinkModal: () => void
}

export function ImportantLinks({
  openCreateImportantLinkModal
}: ImportantLinksProps) {

  const { tripId } = useParams()
  const [ links, setLinks ] = useState<Links[]>([])
  
  useEffect(() => {
    axios.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])

  return(
    <div className="space-y-6">
      <span className="text-xl font-semibold">Links importantes</span>
      
      <div className="space-y-5">

        {links && (
          links.map(link => {
            return (
              <div key={link.id} className="flex items-center justify-between">
                <div className="flex flex-col space-y-1.5 max-w-60">								
                  <span className="font-semibold text-zinc-100">{link.title}</span>
                  <a href="#" className="text-xs text-zinc-400 truncate hover:text-zinc-200">
                    {link.url}
                  </a>
                </div>
                <Link2 className="size-5 text-zinc-400" />
              </div>
            )
          })
        )}

      </div>

      <Button onClick={openCreateImportantLinkModal} variant="secondary" size="full">
          <Plus />
          Cadastrar novo link
      </Button>

    </div>
  )
}