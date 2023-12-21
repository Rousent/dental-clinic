/* eslint-disable react/jsx-key */
"use client";
import {
	IconCalendarUser,
	IconAddressBook,
	IconTool,
	IconUserCircle,
	IconDoorExit,
	IconHome
} from "@tabler/icons-react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
} from "@nextui-org/navbar";
import Link from "next/link";
import { useState } from "react";

export default function Navigation({ userIsAdmin }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const links = [
		["Home", "/", <IconHome className="mr-2" />],
		["Citas", "/citas", <IconCalendarUser className="mr-2" />],
		["Pacientes", "/pacientes", <IconAddressBook className="mr-2" />],
		["Admin", "/admin", <IconTool className="mr-2" />],
		["Perfil", "/perfil", <IconUserCircle className="mr-2" />],
		["Cerrar Sesión", "/logout", <IconDoorExit className="mr-2" />],
	];

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="md:hidden"
				/>
				<NavbarBrand>
					<span className="text-2xl font-bold text-inherit">
						Dental Clinic
					</span>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden md:flex gap-10" justify="center">
				{links.map((item) => {
					if (item[0] === "Admin" && !userIsAdmin) {
						return null;
					} else {
						return (
							<NavbarItem key={`${item[0]}`}>
								<Link
									className="w-full flex"
									href={item[1]}
									size="lg"
								>
									{item[2]} {item[0]}
								</Link>
							</NavbarItem>
						);
					}
				})}
			</NavbarContent>

			<NavbarMenu>
				{links.map((item) => {
					if (item[0] === "Admin" && !userIsAdmin) {
						return null;
					} else {
						return (
							<NavbarItem key={`${item[0]}`}>
								<Link
									className="w-full flex"
									href={item[1]}
									size="lg"
								>
									{item[2]} {item[0]}
								</Link>
							</NavbarItem>
						);
					}
				})}
			</NavbarMenu>
		</Navbar>
	);
}
