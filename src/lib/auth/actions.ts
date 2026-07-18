"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthActionState = { error: string | null };

function mapAuthError(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("already registered")) return "Email sudah terdaftar.";
  if (lower.includes("invalid login credentials")) return "Email atau password salah.";
  if (lower.includes("password") && lower.includes("least")) {
    return "Password minimal 6 karakter.";
  }
  return message;
}

export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const nama = String(formData.get("nama") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!nama || !email || !password) {
    return { error: "Semua kolom wajib diisi." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: mapAuthError(error.message) };
  }
  if (!data.user) {
    return { error: "Registrasi gagal, silakan coba lagi." };
  }

  const { error: insertError } = await supabase
    .from("users")
    .insert({ id: data.user.id, nama, email });

  if (insertError) {
    return { error: "Registrasi gagal menyimpan profil pengguna." };
  }

  redirect("/");
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: mapAuthError(error.message) };
  }

  redirect("/");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
