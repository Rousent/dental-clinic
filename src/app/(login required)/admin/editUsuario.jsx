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

export default function EditUser({ usuario, especialidades, supabase }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [nombre, setNombre] = React.useState(usuario.nombre);
	const [apellidoPaterno, setApellidoPaterno] = React.useState(
		usuario.apellido_paterno
	);
	const [apellidoMaterno, setApellidoMaterno] = React.useState(
		usuario.apellido_materno
	);
	const [email, setEmail] = React.useState(usuario.email);
	const [especialidad, setEspecialidad] = React.useState(
		usuario.especialidades.id
	);

	const onSubmit = async (e) => {
		e.preventDefault();

		if (
			nombre === usuario.nombre &&
			apellidoPaterno === usuario.apellido_paterno &&
			apellidoMaterno === usuario.apellido_materno &&
			email === usuario.email &&
			especialidad === usuario.especialidades.id
		) {
			alert("No hay cambios que realizar");
		} else if (especialidad === "") {
			alert("El campo Especialidad no puede quedar vacio");
		} else {
			const { error } = await supabase
				.from("perfiles")
				.update({
					nombre,
					apellido_paterno: apellidoPaterno,
					apellido_materno: apellidoMaterno,
					email,
					especialidad,
				})
				.eq("id", usuario.id);

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
						<form onSubmit={onSubmit}>
							<ModalHeader className="flex flex-col gap-1">
								Modificar Usuario
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
										defaultValue={usuario.nombre}
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setNombre(e.target.value)
										}
									/>
								</div>
								<div className="space-y-2">
									<label htmlFor="paterno" className="w-full">
										Apellido Paterno:
									</label>
									<input
										id="paterno"
										type="text"
										required
										defaultValue={usuario.apellido_paterno}
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setApellidoPaterno(e.target.value)
										}
									/>
								</div>
								<div className="space-y-2">
									<label htmlFor="materno" className="w-full">
										Apellido Materno:
									</label>
									<input
										id="materno"
										type="text"
										required
										defaultValue={usuario.apellido_materno}
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setApellidoMaterno(e.target.value)
										}
									/>
								</div>
								<div className="space-y-2">
									<label
										htmlFor="especialidad"
										className="w-full"
									>
										Especialidad:
									</label>
									<Select
										name="especialidad"
										id="especialidad"
										required
										defaultSelectedKeys={[
											`${usuario.especialidades.id}`,
										]}
										onChange={(e) =>
											setEspecialidad(e.target.value)
										}
									>
										{especialidades.map((esp) => (
											<SelectItem
												key={esp.id}
												value={esp.id}
											>
												{esp.nombre}
											</SelectItem>
										))}
									</Select>
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
