import Navigation from "@/components/Navbar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function NavigationLayout({ children }) {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) redirect("/login");

	const { data } = await supabase
		.from("perfiles")
		.select("*")
		.eq("id", session.user.id);

	if (data[0]["estado"] !== "ALTA") redirect("/login");

	const userIsAdmin = data[0]["rol"] === 1;

	return (
		<>
			<Navigation userIsAdmin={userIsAdmin} />
			<div className="max-w-[1024px] mx-auto px-10">{children}</div>
		</>
	);
}
