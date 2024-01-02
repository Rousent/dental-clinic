"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import Image from "next/image";

export default function Login() {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError(null);

		const { data } = await supabase
			.from("perfiles")
			.select("*")
			.eq("email", email);

		if (!data[0] || data[0]["estado"] === "BAJA") {
			setError(
				"El usuario no está registrado o se encuentra dado de baja."
			);
			return;
		}

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			setError(error.message);
		} else {
			router.push("/");
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
						Inicio de Sesión
					</h2>

					<form onSubmit={handleSubmit}>
						<div className="mb-4">
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

						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-gray-600"
							>
								Contraseña*
							</label>
							<input
								id="password"
								type="password"
								className="w-full border border-black rounded-md px-3 py-2"
								placeholder="******"
								name="password"
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
							<div className="flex justify-end">
								<Link
									href="/login/password/recovery"
									color="primary"
									className="text-sm mt-1 mr-5"
								>
									Olvide mi contraseña
								</Link>
							</div>
						</div>

						<div className="mt-auto text-center">
							{error && (
								<p className="text-red-500 mb-4">{error}</p>
							)}
							<Button color="primary" type="submit">
								Iniciar Sesión
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
