"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";

export default function Login() {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert("Las contraseñas no coinciden");
		} else {
			const { error } = await supabase.auth.updateUser({
				password: password,
			});
			if (error) {
				alert(error.message);
			} else {
				router.push("/login");
			}
		}
	};

	const retriveSession = async () => {
		// Obtener el fragmento de la URL
		var fragmento = window.location.hash.substring(1);

		// Dividir los parámetros en un objeto
		var parametros = {};
		fragmento.split("&").forEach(function (param) {
			var partes = param.split("=");
			parametros[partes[0]] = partes[1];
		});

		// Acceder a los valores de los parámetros
		const access_token = parametros.access_token;
		const refresh_token = parametros.refresh_token;
		// ... y así sucesivamente

		const { error } = await supabase.auth.setSession({
			access_token,
			refresh_token,
		});
		alert(error.message);
		if (!session) {
			alert("No hay sesión");
		}
	};

	useEffect(() => {
		retriveSession();
	}, []);

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

						<div className="mb-4">
							<label
								htmlFor="password"
								className="block text-sm text-gray-600"
							>
								Confirmar Contraseña*
							</label>
							<input
								id="confirmPassword"
								type="password"
								className="w-full border border-black rounded-md px-3 py-2"
								placeholder="******"
								name="confirmPassword"
								required
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
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
