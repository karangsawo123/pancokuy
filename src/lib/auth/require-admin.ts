import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profil } = await supabase
    .from("users")
    .select("nama, email, role")
    .eq("id", user.id)
    .single();

  if (!profil || profil.role !== "admin") {
    redirect("/");
  }

  return { id: user.id, nama: profil.nama, email: profil.email, role: profil.role };
}
