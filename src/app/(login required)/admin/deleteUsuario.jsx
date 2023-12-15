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

export default function DeleteUser({ usuario, supabase }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const fullName = `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`;

	const onSubmit = async (e) => {
		e.preventDefault();

		await supabase.from("perfiles").delete().eq("id", usuario.id);
		await supabase.rpc("eliminar_user", { _email: usuario.email });
		location.reload();
	};

	return (
		<>
			<Button color="danger" onPress={onOpen}>
				Eliminar Permanentemente
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={onSubmit}>
							<ModalHeader className="flex flex-col gap-1">
								Eliminar Usuario
							</ModalHeader>
							<ModalBody>
								<p>
									¿Desea eliminar PERMANENTEMENTE al siguiente
									usuario?
								</p>
								<p>
									Nombre: <strong>{fullName}</strong>
								</p>
								<p>
									Especialidad:{" "}
									<strong>
										{usuario.especialidades.nombre}
									</strong>
								</p>
								<p>
									Solo realice esta acción si se equivocó al
									crear el usuario y este no tiene citas
									asignadas.
								</p>
								<span>
									<strong className="text-red-700">
										Esta acción no se puede deshacer.
									</strong>
								</span>
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
									Eliminar
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
