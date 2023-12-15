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

export default function DeleteEspecialidad({ especialidad, supabase }) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onSumbit = async (e) => {
		e.preventDefault();
		const { error } = await supabase
			.from("especialidades")
			.delete()
			.eq("id", especialidad.id);
		if (error) {
			alert(error.message);
		} else {
			location.reload();
		}
	};

	return (
		<>
			<Button color="danger" onPress={onOpen}>
				Eliminar
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={onSumbit}>
							<ModalHeader className="flex flex-col gap-1">
								Eliminar Especialidad
							</ModalHeader>
							<ModalBody>
								<p>
									¿Desea eliminar la especialidad{" "}
									<strong>{especialidad.nombre}</strong> ?
								</p>
								<span>
									<strong>
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
