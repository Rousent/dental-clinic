"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import Image from "next/image";

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
		var fragmento = window.location.hash.substring(1);

		var parametros = {};
		fragmento.split("&").forEach(function (param) {
			var partes = param.split("=");
			parametros[partes[0]] = partes[1];
		});

		const access_token = parametros.access_token;
		const refresh_token = parametros.refresh_token;
		const type = parametros.type;

		if (type === "magiclink" || type === "recovery") {
			const {
				data: { session },
				error,
			} = await supabase.auth.setSession({
				access_token,
				refresh_token,
			});
			if (error) alert(error.message);
		} else {
			router.push("/login");
		}
	};

	useEffect(() => {
		retriveSession();
	}, []);

	return (
		<div className="w-fit h-fit">
			<div className="flex items-center justify-center">
				<div className="bg-white shadow-md rounded-md p-6 w-96 mt-7 mb-7">
					<Image
						src="/logo.png"
						width="578"
						height="236"
						alt="Logo"
					></Image>

					<h2 className="text-2xl font-bold mb-4 w-full text-center">
						Crear Contraseña
					</h2>

					<form onSubmit={handleSubmit}>
						<div className="my-4">
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
								Guardar
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
