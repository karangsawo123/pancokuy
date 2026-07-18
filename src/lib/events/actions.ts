"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";

export type EventActionState = { error: string | null };

function readFields(formData: FormData) {
  const basecampIdRaw = String(formData.get("basecamp_id") ?? "").trim();
  const waktuSelesaiRaw = String(formData.get("waktu_selesai") ?? "").trim();
  const deskripsiRaw = String(formData.get("deskripsi") ?? "").trim();

  return {
    basecamp_id: basecampIdRaw ? Number(basecampIdRaw) : null,
    judul_event: String(formData.get("judul_event") ?? "").trim(),
    jenis_event: String(formData.get("jenis_event") ?? "").trim(),
    tanggal_event: String(formData.get("tanggal_event") ?? "").trim(),
    waktu_mulai: String(formData.get("waktu_mulai") ?? "").trim(),
    waktu_selesai: waktuSelesaiRaw ? waktuSelesaiRaw : null,
    lokasi: String(formData.get("lokasi") ?? "").trim(),
    deskripsi: deskripsiRaw ? deskripsiRaw : null,
  };
}

function validateFields(fields: ReturnType<typeof readFields>): string | null {
  if (
    !fields.judul_event ||
    !fields.jenis_event ||
    !fields.tanggal_event ||
    !fields.waktu_mulai ||
    !fields.lokasi
  ) {
    return "Judul, jenis, tanggal, waktu mulai, dan lokasi wajib diisi.";
  }
  return null;
}

export async function createEventAction(
  _prevState: EventActionState,
  formData: FormData,
): Promise<EventActionState> {
  const admin = await requireAdmin();
  const fields = readFields(formData);

  const validationError = validateFields(fields);
  if (validationError) {
    return { error: validationError };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("events").insert({ ...fields, created_by: admin.id });

  if (error) {
    return { error: "Gagal menyimpan event." };
  }

  redirect("/admin/events");
}

export async function updateEventAction(
  _prevState: EventActionState,
  formData: FormData,
): Promise<EventActionState> {
  await requireAdmin();
  const id = Number(formData.get("id"));
  const fields = readFields(formData);

  if (!id) {
    return { error: "Event tidak ditemukan." };
  }

  const validationError = validateFields(fields);
  if (validationError) {
    return { error: validationError };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("events").update(fields).eq("id", id);

  if (error) {
    return { error: "Gagal memperbarui event." };
  }

  redirect("/admin/events");
}

export async function deleteEventAction(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id"));

  if (id) {
    const supabase = await createClient();
    await supabase.from("events").delete().eq("id", id);
  }

  redirect("/admin/events");
}
