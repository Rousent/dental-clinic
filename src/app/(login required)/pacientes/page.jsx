"use client";
import Link from "next/link";
import { ObtenerDatosPacienteAll } from "./ObtenerDatosPacienteAll";
import { useEffect, useState } from "react";
import { actualizarDatos } from "./actualizarDatos";
import eliminarPaciente from "./eliminarPaciente";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalFooter,
	Button,
	ModalBody,
} from "@nextui-org/react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@nextui-org/react";

export default function Pacientes() {
	const [filtroNombre, setFiltroNombre] = useState("");

	const [datos, setDatos] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [nuevosDatos, setNuevosDatos] = useState({ telefono: "", email: "" });

	useEffect(() => {
		async function cargarDatos() {
			const datos = await ObtenerDatosPacienteAll();
			if (datos) {
				setDatos(datos);
			}
		}
		cargarDatos();
	}, []);

	const handleAbrirModal = (item) => {
		const nombreCompleto = `${item.nombre} ${item.apellido_paterno} ${item.apellido_materno}`;

		if (nombreCompleto.toLowerCase().includes(filtroNombre.toLowerCase())) {
			setSelectedItem(item);
			setNuevosDatos({ telefono: item.telefono, email: item.email }); // Inicializar el formulario con los datos actuales
			setModalIsOpen(true);
		}
	};

	const handleCerrarModal = () => {
		setModalIsOpen(false);
	};

	const onClose = () => setModalIsOpen(false);

	const handleActualizar = async () => {
		const { id } = selectedItem;
		const updatedData = await actualizarDatos(id, nuevosDatos);
		console.log("Datos actualizados con éxito:", updatedData);
		setModalIsOpen(false); // Cerrar el modal después de la actualización
		window.location.reload(); // Recargar la página
	};

	const handleEliminar = async (pacienteId) => {
		const confirmacion = window.confirm(
			"¿Seguro que deseas eliminar este paciente?"
		);

		if (confirmacion) {
			await eliminarPaciente(pacienteId);
			window.location.reload(); // Recargar la página después de la eliminación
		}
	};

	return (
		<>
			<h1 className="flex items-center justify-center text-3xl font-bold mt-5 mb-3">
				Lista de pacientes
			</h1>
			<div className="mt-auto text-center mb-5">
				<Link href="pacientes/crearPaciente/">
					<Button color="primary">Crear Paciente</Button>
				</Link>
			</div>

			<div className="mb-3">
				<label className="block text-gray-700 text-sm font-bold mb-2">
					Buscar por nombre del paciente:
				</label>
				<input
					type="text"
					value={filtroNombre}
					onChange={(e) => setFiltroNombre(e.target.value)}
					className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
					placeholder="Nombre del paciente"
				/>
			</div>

			<Table aria-label="Example static collection table">
				<TableHeader>
					<TableColumn>ID</TableColumn>
					<TableColumn>Nombre del paciente</TableColumn>
					<TableColumn>Telefono</TableColumn>
					<TableColumn>Email</TableColumn>
					<TableColumn>Actualizar datos</TableColumn>
					<TableColumn>Eliminar</TableColumn>{" "}
					{/* Nueva columna para el botón de eliminar */}
				</TableHeader>
				<TableBody emptyContent={"No hay pacientes."}>
					{datos
						.filter((item) => {
							const nombreCompleto = `${item.nombre} ${item.apellido_paterno} ${item.apellido_materno}`;
							return nombreCompleto
								.toLowerCase()
								.includes(filtroNombre.toLowerCase());
						})
						.map((item) => (
							<TableRow key={item.id}>
								<TableCell>{item.id}</TableCell>
								<TableCell>
									{item.nombre} {item.apellido_paterno}{" "}
									{item.apellido_materno}
								</TableCell>
								<TableCell>{item.telefono}</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell>
									<Button
										color="primary"
										onClick={() => handleAbrirModal(item)}
									>
										Actualizar
									</Button>
								</TableCell>
								<TableCell>
									<Button
										color="danger"
										onClick={() => handleEliminar(item.id)}
									>
										Eliminar
									</Button>
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>

			{/* Modal de actualización */}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={handleCerrarModal}
				onClose={onClose}
			>
				<ModalContent>
					<ModalHeader className="text-center">
						Actualizar Datos
					</ModalHeader>
					<form>
						<ModalBody>
							<label>
								Telefono:
								<input
									type="number"
									value={nuevosDatos.telefono}
									onChange={(e) =>
										setNuevosDatos({
											...nuevosDatos,
											telefono: e.target.value,
										})
									}
								/>
							</label>
							<label>
								Email:
								<input
									type="email"
									value={nuevosDatos.email}
									onChange={(e) =>
										setNuevosDatos({
											...nuevosDatos,
											email: e.target.value,
										})
									}
								/>
							</label>
						</ModalBody>
						<ModalFooter>
							<Button
								color="success"
								type="button"
								onClick={handleActualizar}
							>
								Actualizar
							</Button>
							<Button
								color="danger"
								type="button"
								onClick={handleCerrarModal}
							>
								Cancelar
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}
