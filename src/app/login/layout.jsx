import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();
	if (session) redirect("/");

	return (
		<div className="flex h-full justify-center items-center fondo-gradiente">
			{children}
		</div>
	);
}
