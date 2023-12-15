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

export default function BajaUsuario({ usuario, supabase }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const fullName = `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`;

	const onSubmit = async (e) => {
		e.preventDefault();

		await supabase
			.from("perfiles")
			.update({ estado: "BAJA" })
			.eq("id", usuario.id);
		location.reload();
	};

	return (
		<>
			<Button color="danger" onPress={onOpen}>
				Dar de Baja
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={onSubmit}>
							<ModalHeader className="flex flex-col gap-1">
								Dar de Baja Usuario
							</ModalHeader>
							<ModalBody>
								<p>¿Desea dar de baja al siguiente usuario?</p>
								<p>
									Nombre: <strong>{fullName}</strong>
								</p>
								<p>
									Especialidad:{" "}
									<strong>
										{usuario.especialidades.nombre}
									</strong>
								</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Cancelar
								</Button>
								<Button type="submit" color="danger">
									Dar de Baja
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
