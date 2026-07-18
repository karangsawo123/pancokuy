"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export type BasecampActionState = { error: string | null };

function readFields(formData: FormData) {
  return {
    nama_basecamp: String(formData.get("nama_basecamp") ?? "").trim(),
    alamat: String(formData.get("alamat") ?? "").trim(),
    kota: String(formData.get("kota") ?? "").trim(),
    provinsi: String(formData.get("provinsi") ?? "").trim(),
    kontak_pengurus: String(formData.get("kontak_pengurus") ?? "").trim(),
  };
}

function validateFields(fields: ReturnType<typeof readFields>): string | null {
  if (
    !fields.nama_basecamp ||
    !fields.alamat ||
    !fields.kota ||
    !fields.provinsi ||
    !fields.kontak_pengurus
  ) {
    return "Semua kolom wajib diisi.";
  }
  return null;
}

export async function createBasecampAction(
  _prevState: BasecampActionState,
  formData: FormData,
): Promise<BasecampActionState> {
  const admin = await requireAdmin();
  const fields = readFields(formData);

  const validationError = validateFields(fields);
  if (validationError) {
    return { error: validationError };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("basecamp")
    .insert({ ...fields, created_by: admin.id });

  if (error) {
    return { error: "Gagal menyimpan basecamp." };
  }

  redirect("/admin/basecamp");
}

export async function updateBasecampAction(
  _prevState: BasecampActionState,
  formData: FormData,
): Promise<BasecampActionState> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const fields = readFields(formData);

  if (!id) {
    return { error: "Basecamp tidak ditemukan." };
  }

  const validationError = validateFields(fields);
  if (validationError) {
    return { error: validationError };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("basecamp").update(fields).eq("id", id);

  if (error) {
    return { error: "Gagal memperbarui basecamp." };
  }

  redirect("/admin/basecamp");
}

export async function deleteBasecampAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));

  if (id) {
    const supabase = await createClient();
    await supabase.from("basecamp").delete().eq("id", id);
  }

  redirect("/admin/basecamp");
}
