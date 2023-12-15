import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
	title: "Dental Clinic",
	description: "Clinica Dental",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
