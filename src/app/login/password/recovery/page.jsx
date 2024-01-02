"use client";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function PasswordRecovery() {
	const supabase = createClientComponentClient();
	const [mensaje, setMensaje] = useState(null);
	const [email, setEmail] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMensaje(null);
		const { error } = await supabase.auth.resetPasswordForEmail(email);

		if (error) {
			setMensaje(error.message);
		} else {
			setMensaje("¡Enlace enviado con exito!");
		}
	};

	return (
		<div className="w-fit h-fit">
			<div className="flex items-center justify-center">
				<div className="bg-white shadow-md rounded-md p-6 w-96 mt-7 mb-8">
					<Image
						src="/logo.png"
						width="578"
						height="236"
						alt="Logo"
					></Image>

					<h2 className="text-2xl font-bold mb-4 w-full text-center">
						Recupera tu contraseña
					</h2>

					<p className="w-full text-center">
						Introduce tu correo electrónico y te enviaremos un
						enlace para restaurar tu contraseña.
					</p>

					<form onSubmit={handleSubmit}>
						<div className="my-4">
							<label
								htmlFor="email"
								className="block text-gray-600"
							>
								Correo Electronico*
							</label>
							<input
								id="email"
								type="email"
								className="w-full border border-black rounded-md px-3 py-2"
								placeholder="Ej. nombre@mail.com"
								name="email"
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div className="mt-auto text-center">
							{mensaje && (
								<p className="text-[#152e55] mb-4">{mensaje}</p>
							)}
							<Button color="primary" type="submit">
								Enviar
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
