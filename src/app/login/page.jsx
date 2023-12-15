"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";

export default function Login() {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { data } = await supabase
			.from("perfiles")
			.select("*")
			.eq("email", email);

		if (data[0]["estado"] === "BAJA") {
			alert("El usuario se encuentra dado de baja");
			return;
		}

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			alert(error.message);
		} else {
			router.push("/");
		}
	};

	return (
		<div className="w-fit h-fit">
			<div className="flex items-center justify-center">
				<div className="bg-white shadow-md rounded-md p-6 w-96 mt-7 mb-7">
					<h2 className="text-center text-xl font-semibold mb-4">
						Dental Clinic
					</h2>

					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-sm text-gray-600"
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
								className="block text-sm text-gray-600"
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
						</div>

						<div className="mt-auto text-center">
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
