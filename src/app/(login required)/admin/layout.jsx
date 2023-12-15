import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	const { data } = await supabase
		.from("perfiles")
		.select("*")
		.eq("id", session.user.id);

	if (data[0]["rol"] !== 1) redirect("/");

	return <>{children}</>;
}
