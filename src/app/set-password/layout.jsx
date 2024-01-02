export default async function Layout({ children }) {
	return (
		<div className="flex h-full justify-center items-center fondo-gradiente">
			{children}
		</div>
	);
}
