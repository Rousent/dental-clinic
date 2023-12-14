"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
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

	/* const registerRoot = async (e) => {
		e.preventDefault();
		const { error } = await supabase.auth.signUp({
			email: "oliver_cruz.d@hotmail.com",
			password: "Panterita9",
		});
		if (error) {
			alert(error.message);
		} else {
			const { error } = await supabase.rpc("crear_perfil", {
				_nombre: "Oliver",
				_apellido_paterno: "Cruz",
				_apellido_materno: "Dominguez",
				_especialidad: 1,
				_email: "oliver_cruz.d@hotmail.com",
				_rol: 1,
			});
			if (error) {
				alert(error.message);
			} else {
				router.push("/");
			}
		}
	}; */

	return (
		<div className="w-fit h-fit">
			<div className="flex items-center justify-center">
				<div className="bg-white shadow-md rounded-md p-6 w-96 mt-7 mb-7">
					<h2 className="text-center text-xl font-semibold mb-4">
						Dental Clinic
					</h2>

					{/* <button onClick={registerRoot}>Admin</button> */}

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
							<button
								type="submit"
								className="bg-blue-500 text-white py-2 px-4 rounded-full"
							>
								Iniciar Sesión
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
