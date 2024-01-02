"use client";
import { Button } from "@nextui-org/button";
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from "@nextui-org/table";
import { Tabs, Tab } from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import DeleteUser from "./deleteUsuario";
import DeleteEspecialidad from "./deleteEspecialidad";
import EditUser from "./editUsuario";
import CreateUser from "./createUsuario";
import CreateEspecialidad from "./createEspecialidad";
import EditEspecialidad from "./editEspecialidad";
import BajaUsuario from "./bajaUsuario";
import { Tooltip } from "@nextui-org/tooltip";

export default function Admin() {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL,
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcmNvemZxY29pZ2JuZ2lrbGp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDg4MzAwMiwiZXhwIjoyMDE2NDU5MDAyfQ.HWfFDJquw2__99OEzq4WQlAdORBvzRALz1jrhgOZAX0",
		{
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				detectSessionInUrl: false,
			},
		}
	);
	const [usuarios, setUsuarios] = useState([]);
	const [especialidades, setEspecialidades] = useState([]);

	const getUsers = async () => {
		const { data } = await supabase
			.from("perfiles")
			.select(
				`id, nombre, apellido_paterno, apellido_materno, email, estado, especialidades (id, nombre)`
			);
		setUsuarios(data);
	};

	const getEspecialidades = async () => {
		const { data } = await supabase.from("especialidades").select("*");
		setEspecialidades(data);
	};

	const sendEmail = async (email) => {
		const { error } = await supabase.auth.signInWithOtp({
			email,
		});
		if (error) {
			alert(error.message);
		} else {
			alert("Email enviado a " + email);
		}
	};

	const altaUsuario = async (id) => {
		const { error } = await supabase
			.from("perfiles")
			.update({ estado: "ALTA" })
			.eq("id", id);
		if (error) {
			alert(error.message);
		}
		location.reload();
	};

	useEffect(() => {
		getUsers();
		getEspecialidades();
	}, []);

	return (
		<>
			<h1 className="flex items-center justify-center text-3xl font-bold mt-5 mb-3">
				Panel de Administración
			</h1>
			<div className="mt-auto text-center mb-5 space-x-4">
				<CreateUser
					especialidades={especialidades}
					supabase={supabase}
				/>
				<CreateEspecialidad
					especialidades={especialidades}
					supabase={supabase}
				/>
			</div>

			<div className="flex w-full flex-col">
				<Tabs>
					<Tab key="usuarios" title="Usuarios">
						<Table>
							<TableHeader>
								<TableColumn>Nombre</TableColumn>
								<TableColumn>Especialidad</TableColumn>
								<TableColumn>Email</TableColumn>
								<TableColumn>Estado</TableColumn>
								<TableColumn>Acciones</TableColumn>
							</TableHeader>
							<TableBody emptyContent="No hay usuarios">
								{usuarios.map((user) => (
									<TableRow key={"user" + user.id}>
										<TableCell>
											{user.nombre}{" "}
											{user.apellido_paterno}{" "}
											{user.apellido_materno}
										</TableCell>
										<TableCell>
											{user.especialidades.nombre}
										</TableCell>
										<TableCell>{user.email}</TableCell>
										<TableCell>{user.estado}</TableCell>
										{user.estado === "ALTA" ? (
											<TableCell className="space-x-1">
												<EditUser
													usuario={user}
													especialidades={
														especialidades
													}
													supabase={supabase}
												/>
												<Tooltip
													showArrow
													closeDelay={0}
													content="Enviar enlace de Inicio de Sesión de un solo uso al Email del usuario."
												>
													<Button
														color="warning"
														onPress={() =>
															sendEmail(
																user.email
															)
														}
													>
														Enviar Invitación
													</Button>
												</Tooltip>
												<BajaUsuario
													usuario={user}
													supabase={supabase}
												/>
											</TableCell>
										) : (
											<TableCell className="space-x-1 space-y-1">
												<Button
													color="success"
													onPress={() =>
														altaUsuario(user.id)
													}
												>
													Dar de Alta
												</Button>
												<DeleteUser
													usuario={user}
													supabase={supabase}
												/>
											</TableCell>
										)}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Tab>
					<Tab key="especialidades" title="Especialidades">
						<Table>
							<TableHeader>
								<TableColumn>Especialidad</TableColumn>
								<TableColumn>Acciones</TableColumn>
							</TableHeader>
							<TableBody>
								{especialidades.map((especialidad) => (
									<TableRow key={"esp" + especialidad.id}>
										<TableCell>
											{especialidad.nombre}
										</TableCell>
										<TableCell className="space-x-1">
											<EditEspecialidad
												especialidad={especialidad}
												especialidades={especialidades}
												supabase={supabase}
											/>
											<DeleteEspecialidad
												especialidad={especialidad}
												supabase={supabase}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Tab>
				</Tabs>
			</div>
		</>
	);
}
