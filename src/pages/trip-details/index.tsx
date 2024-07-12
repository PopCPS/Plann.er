import { Plus } from "lucide-react"
import { useState } from "react"
import { CreateActivityModal } from "./create-activity-modal"
import { ImportantLinks } from "./important-links"
import { Guests } from "./guests"
import { Activities } from "./activities"
import { DestinationAndDateHeader } from "./destination-and-date-header"
import { Button } from "../components/button"
import { CreateImportantLinkModal } from "./create-important-link-modal"
import { ConfirmAttendanceModal } from "./confirm-attendance-modal"
import { Participants } from "../../lib/participants"

export function TripDetailsPage() {

	const [ isCreateActivityModalOpen, setIsCreateActivityModalOpen ] = useState(false)
	const [ isCreateImportantLinkModalOpen, setIsCreateImportantLinkModalOpen ] = useState(false)
	const [ isConfirmAttendanceModalOpen, setIsConfirmAttendanceModalOpen ] = useState(false)
	const [ participants, setParticipants ] = useState<Participants[]>([])

	function openCreateActivityModal() {
		setIsCreateActivityModalOpen(true)
	}

	function closeCreateActivityModal() {
		setIsCreateActivityModalOpen(false)
	}

	function openCreateImportantLinkModal() {
		setIsCreateImportantLinkModalOpen(true)
	}

	function closeCreateImportantLinkModal() {
		setIsCreateImportantLinkModalOpen(false)
	}

	function openConfirmAttendanceModal() {
		setIsConfirmAttendanceModalOpen(true)
	}

	function closeConfirmAttendanceModal() {
		setIsConfirmAttendanceModalOpen(false)
	}

	return (
		<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
			
			<DestinationAndDateHeader />

			<main className="flex gap-16 px-4">
				<div className="flex-1 space-y-6">
					<div className="flex items-center justify-between">
						<h2 className="text-3xl font-semibold">Atividades</h2>
						<Button onClick={openCreateActivityModal}>
							<Plus />
							Cadastrar atividade
						</Button>
					</div>

					<Activities />
				</div>

				<aside className="w-80 space-y-6">
					<ImportantLinks
						openCreateImportantLinkModal={openCreateImportantLinkModal}
					/>
					<div className="w-full h-px bg-zinc-800" />
					<Guests
						participants={participants}
						setParticipants={setParticipants}
						openConfirmAttendanceModal={openConfirmAttendanceModal}
					/>
				</aside>

			</main>

			{isCreateActivityModalOpen && (
				<CreateActivityModal 
					closeCreateActivityModal={closeCreateActivityModal}
				/>
			)}

			{isCreateImportantLinkModalOpen && (
				<CreateImportantLinkModal
					closeCreateImportantLinkModal={closeCreateImportantLinkModal}
				/>
			)}

			{isConfirmAttendanceModalOpen && (
				<ConfirmAttendanceModal 
					closeConfirmAttendanceModal={closeConfirmAttendanceModal}
					setParticipants={setParticipants}
					participants={participants}
				/>
			)}
		</div>
	)
}