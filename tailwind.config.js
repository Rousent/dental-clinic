import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				oficial: {
					extend: "light",
					colors: {
						foreground: "#171823",
						focus: "#152e55",
						primary: {
							DEFAULT: "#152e55",
							foreground: "#f1f5f5",
						},
						secondary: {
							DEFAULT: "#3490CA",
							foreground: "#171823",
						},
						warning: {
							DEFAULT: "#BAC6D9",
							foreground: "#171823",
						},
					},
				},
			},
		}),
	],
};
