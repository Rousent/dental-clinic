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

export default function CreateUser({ especialidades, supabase }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [nombre, setNombre] = React.useState(null);
	const [paterno, setPaterno] = React.useState(null);
	const [materno, setMaterno] = React.useState(null);
	const [email, setEmail] = React.useState(null);
	const [confirmEmail, setConfirmEmail] = React.useState(null);
	const [especialidad, setEspecialidad] = React.useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!(
				nombre ||
				paterno ||
				materno ||
				email ||
				confirmEmail ||
				especialidad
			)
		) {
			alert("Faltan campos por rellenar");
		} else if (especialidad === "") {
			alert("El campo Especialidad no puede quedar vacio");
		} else if (email !== confirmEmail) {
			alert("Los correos no coinciden. Intente de nuevo.");
		} else {
			const { data } = await supabase.auth.signInWithOtp({
				email,
			});

			alert(data);

			const { error } = await supabase.rpc("crear_perfil", {
				_nombre: nombre,
				_apellido_paterno: paterno,
				_apellido_materno: materno,
				_especialidad: especialidad,
				_email: email,
				_rol: 2,
			});

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
				Crear Usuario
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={handleSubmit}>
							<ModalHeader className="flex flex-col gap-1">
								Crear Usuario
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
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setPaterno(e.target.value)
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
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setMaterno(e.target.value)
										}
									/>
								</div>
								<div className="space-y-2">
									<label htmlFor="email" className="w-full">
										Correo Electrónico:
									</label>
									<input
										id="email"
										type="email"
										required
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
								<div className="space-y-2">
									<label htmlFor="email" className="w-full">
										Confirmar Correo Electrónico:
									</label>
									<input
										id="email"
										type="email"
										required
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setConfirmEmail(e.target.value)
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
										onChange={(e) =>
											setEspecialidad(e.target.value)
										}
									>
										{especialidades.map((especialidad) => (
											<SelectItem
												key={especialidad.id}
												value={especialidad.id}
											>
												{especialidad.nombre}
											</SelectItem>
										))}
									</Select>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color="primary"
									variant="light"
									onPress={onClose}
								>
									Cancelar
								</Button>
								<Button type="submit" color="primary">
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
