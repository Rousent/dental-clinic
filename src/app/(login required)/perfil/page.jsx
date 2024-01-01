import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import ChangePassword from "./changePassword";

export default async function Perfil() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { user },
	} = await supabase.auth.getUser();
	let perfil = await supabase
		.from("perfiles")
		.select("*, especialidades (*)")
		.eq("id", user.id);
	perfil = perfil.data;

	return (
		<Card className="mt-5">
			<CardHeader>
				<h2 className="text-xl font-bold">Perfil</h2>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>
					<b>Nombre:</b> {perfil[0].nombre}{" "}
					{perfil[0].apellido_paterno} {perfil[0].apellido_materno}
				</p>
				<p>
					<b>Email:</b> {user.email}
				</p>
				<p>
					<b>Especialidad:</b> {perfil[0].especialidades.nombre}
				</p>
			</CardBody>
			<Divider />
			<CardFooter className="flex justify-end">
				<ChangePassword />
			</CardFooter>
		</Card>
	);
}
