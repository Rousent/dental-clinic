"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import esLocale from "@fullcalendar/core/locales/es"; // Importa el idioma español
import { ObtenerDatosCita } from "./citas/ObtenerDatosCita";
import { ObtenerDatosPaciente } from "./pacientes/ObtenerDatosPaciente";
import { ObtenerDatosEspecialista } from "./citas/crearCitaExistente/ObtenerDatosEspecialista";
import { useState } from "react";
import Link from "next/link";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalFooter,
	Button,
	ModalBody,
} from "@nextui-org/react";

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPatientData, setSelectedPatientData] = useState(null);
	const [selectedEspecialistaData, setSelectedEspecialistaData] =
		useState(null);
	const [selectedCita, setSelectedCita] = useState([]);

	const handleShowModal = (info) => {
		// Obtener los datos del paciente del evento
		const patientData = info.event.extendedProps.paciente;
		const especialistaData = info.event.extendedProps.especialista;
		const citaData = info.event.extendedProps.cita;

		// Almacenar los datos del paciente seleccionado en el estado
		setSelectedPatientData(patientData);

		setSelectedEspecialistaData(especialistaData);

		setSelectedCita(citaData);

		// Abrir el modal
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		// Cerrar el modal
		setIsModalOpen(false);

		// Limpiar los datos del paciente seleccionado
		setSelectedPatientData(null);

		setSelectedEspecialistaData(null);

		setSelectedCita(null);
	};

	return (
		<>
			<h1 className="flex items-center justify-center text-3xl font-bold mt-10 mb-5">
				Calendario de Citas
			</h1>

			<div className="mt-auto text-center mb-5">
				<Link href="citas/crearCitaExistente/">
					<Button color="primary">Crear Cita</Button>
				</Link>
			</div>

			<FullCalendar
				events={async (info, successCallback, failureCallback) => {
					try {
						const data = await ObtenerDatosCita();

						const events = await Promise.all(
							data.map(async (cita) => {
								const pacienteData = await ObtenerDatosPaciente(
									cita.paciente
								);
								const especialistaData =
									await ObtenerDatosEspecialista(
										cita.especialista
									);

								return {
									title: `${pacienteData.nombre} ${pacienteData.apellido_paterno} ${pacienteData.apellido_materno}`,
									start: new Date(
										`${cita.fecha}T${cita.hora_inicio}`
									),
									end: new Date(cita.fecha),
									paciente: pacienteData,
									especialista: especialistaData,
									cita: cita,
								};
							})
						);

						successCallback(events);
					} catch (error) {
						console.error("Error al obtener datos:", error.message);
						failureCallback(error);
					}
				}}
				eventContent={(info) => (
					<div
						style={{
							overflow: "hidden",
							cursor: "pointer",
							position: "relative",
						}}
						onClick={() => handleShowModal(info)}
					>
						<b>{info.timeText}</b>
						<br />
						<i>{info.event.title}</i>
					</div>
				)}
				timeZone="local"
				plugins={[
					dayGridPlugin,
					timeGridPlugin,
					interactionPlugin,
					bootstrap5Plugin,
				]}
				initialView="timeGridDay"
				headerToolbar={{
					start: "today prev,next", // will normally be on the left. if RTL, will be on the right
					center: "title",
					end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
				}}
				locales={[esLocale]} // Configura los idiomas disponibles
				locale="es" // Establece el idioma a español
			/>

			{/* Modal para mostrar los datos del paciente */}
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				className="text-lg"
			>
				<ModalContent>
					<ModalHeader>
						<b>Detalles de la cita</b>
					</ModalHeader>
					<ModalBody>
						{selectedEspecialistaData && (
							<>
								<p>
									<b>Especialista: </b>
									{selectedEspecialistaData.nombre}{" "}
									{selectedEspecialistaData.apellido_paterno}{" "}
									{selectedEspecialistaData.apellido_materno}
								</p>
								{/* Agrega más detalles del paciente según tus necesidades */}
							</>
						)}
						{selectedPatientData && (
							<>
								<p>
									<b>Paciente: </b>
									{selectedPatientData.nombre}{" "}
									{selectedPatientData.apellido_paterno}{" "}
									{selectedPatientData.apellido_materno}
								</p>
								<p>
									<b>Telefono: </b>{" "}
									{selectedPatientData.telefono}
								</p>
								{/* Agrega más detalles del paciente según tus necesidades */}
							</>
						)}

						{selectedCita && (
							<>
								<p>
									<b>Fecha (aa/mm/dd):</b>{" "}
									{selectedCita.fecha}
								</p>
								<p>
									<b>Hora de inicio: </b>{" "}
									{selectedCita.hora_inicio}
								</p>
								<p>
									<b>Hora de termino: </b>
									{selectedCita.hora_termino}
								</p>
								{/* Agrega más detalles de la cita según tus necesidades */}
							</>
						)}
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={handleCloseModal}>
							Cerrar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
