import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET(request) {
	const supabase = createRouteHandlerClient({ cookies });
	await supabase.auth.signOut();
	redirect("/login");
}
