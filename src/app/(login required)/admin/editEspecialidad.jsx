import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function EditEspecialidad({
	especialidad,
	especialidades,
	supabase,
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [newEspecialidad, setNewEspecialidad] = React.useState(
		especialidad.nombre
	);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const existe = especialidades.find(
			(especialidad) => especialidad.nombre === newEspecialidad
		);

		if (especialidad.nombre === newEspecialidad) {
			alert("No hay cambios que realizar.");
		} else if (!newEspecialidad) {
			alert("El campo no puede quedar vacio.");
		} else if (existe) {
			alert("La especialidad ya existe.");
		} else {
			const { error } = await supabase
				.from("especialidades")
				.update({ nombre: newEspecialidad })
				.eq("id", especialidad.id);

			if (error) {
				alert(error.message);
			} else {
				location.reload();
			}
		}
	};

	return (
		<>
			<Button color="primary" onPress={onOpen}>
				Modificar
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleSubmit}>
							<ModalHeader className="flex flex-col gap-1">
								Modificar Especialidad
							</ModalHeader>
							<ModalBody>
								<div className="space-y-2">
									<label htmlFor="nombre" className="w-full">
										Nombre:
									</label>
									<input
										id="nombre"
										type="text"
										required
										defaultValue={especialidad.nombre}
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setNewEspecialidad(e.target.value)
										}
									/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Cancelar
								</Button>
								<Button type="submit" color="primary">
									Guardar Cambios
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
