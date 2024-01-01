"use client";
import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function ChangePassword() {
	const supabase = createClientComponentClient();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [currentPassword, setCurrentPassword] = React.useState(null);
	const [newPassword, setNewPassword] = React.useState(null);
	const [repeatNewPassword, setRepeatNewPassword] = React.useState(null);
	const [error, setError] = React.useState(null);

	const onSumbit = async (e) => {
		e.preventDefault();

		if (newPassword === repeatNewPassword) {
			const { error } = await supabase.rpc("change_user_password", {
				current_plain_password: currentPassword,
				new_plain_password: newPassword,
			});
			if (error) {
				setError(error.message);
			} else {
				setError(
					<p className="text-green-700">
						!Contraseña actualizada con exito!
					</p>
				);
				location.reload();
			}
		} else {
			setError("Las contraseñas no coinciden.");
		}
	};

	return (
		<>
			<Button onPress={onOpen} color="secondary" variant="light">
				Cambiar Contraseña
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<form onSubmit={onSumbit}>
							<ModalHeader className="flex flex-col gap-1">
								Cambiar Contraseña
							</ModalHeader>
							<ModalBody>
								<div className="space-y-2">
									<label htmlFor="actual" className="w-full">
										Actual Contraseña:
									</label>
									<input
										id="actual"
										type="password"
										required
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setCurrentPassword(e.target.value)
										}
									/>
								</div>
								<div className="space-y-2">
									<label htmlFor="nuevo" className="w-full">
										Nueva Contraseña:
									</label>
									<input
										id="nuevo"
										type="password"
										required
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setNewPassword(e.target.value)
										}
									/>
								</div>
								<div className="space-y-2">
									<label htmlFor="repetir" className="w-full">
										Repetir Contraseña:
									</label>
									<input
										id="repetir"
										type="password"
										required
										className="border-1 border-black w-full rounded px-2 py-1"
										onChange={(e) =>
											setRepeatNewPassword(e.target.value)
										}
									/>
								</div>
								{error && (
									<p className="text-red-500 text-center">
										{error}
									</p>
								)}
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="light"
									onPress={onClose}
								>
									Cancelar
								</Button>
								<Button color="secondary" type="submit">
									Confirmar
								</Button>
							</ModalFooter>
						</form>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
