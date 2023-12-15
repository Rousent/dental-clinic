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
import { Select, SelectItem } from "@nextui-org/react";

export default function CreateEspecialidad({ especialidades, supabase }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [especialidad, setEspecialidad] = React.useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const existe = especialidades.find(
			(esp) => esp.nombre === especialidad
		);

		if (!especialidad) {
			alert("El campo no puede quedar vacio.");
		} else if (existe) {
			alert("La especialidad ya existe.");
		} else {
			const { error } = await supabase
				.from("especialidades")
				.insert({ nombre: especialidad });

			if (error) {
				alert(error.message);
			} else {
				location.reload();
			}
		}
	};

	return (
		<>
			<Button color="secondary" onPress={onOpen}>
				Crear Especialidad
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleSubmit}>
							<ModalHeader className="flex flex-col gap-1">
								Crear Especialidad
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
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setEspecialidad(e.target.value)
										}
									/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="secondary"
									variant="light"
									onPress={onClose}
								>
									Cancelar
								</Button>
								<Button type="submit" color="secondary">
									Crear
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
