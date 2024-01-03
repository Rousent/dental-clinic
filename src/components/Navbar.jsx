/* eslint-disable react/jsx-key */
"use client";
import {
	IconCalendarUser,
	IconAddressBook,
	IconTool,
	IconUserCircle,
	IconDoorExit,
} from "@tabler/icons-react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";

export default function Navigation({ userIsAdmin }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const links = [
		["Citas", "/citas", <IconCalendarUser className="mr-2" />],
		["Pacientes", "/pacientes", <IconAddressBook className="mr-2" />],
		["Admin", "/admin", <IconTool className="mr-2" />],
		["Perfil", "/perfil", <IconUserCircle className="mr-2" />],
		["Cerrar Sesión", "/logout", <IconDoorExit className="mr-2" />],
	];

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen} className="h-[110px]">
			<NavbarContent className="h-[110px]">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="lg:hidden"
				/>
				<NavbarBrand className="w-fit h-fit">
					<Link href="/" className="w-fit h-fit">
						<Image
							src="/logo.png"
							alt="Logo"
							width={289}
							height={118}
						></Image>
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden lg:flex gap-10" justify="center">
				{links.map((item) => {
					if (item[0] === "Admin" && !userIsAdmin) {
						return null;
					} else {
						return (
							<NavbarItem key={`${item[0]}`}>
								<Link isBlock color="primary" href={item[1]}>
									{item[2]} {item[0]}
								</Link>
							</NavbarItem>
						);
					}
				})}
			</NavbarContent>

			<NavbarMenu className="mt-12">
				{links.map((item) => {
					if (item[0] === "Admin" && !userIsAdmin) {
						return null;
					} else {
						return (
							<NavbarItem key={`${item[0]}`}>
								<Link isBlock color="foreground" href={item[1]}>
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
