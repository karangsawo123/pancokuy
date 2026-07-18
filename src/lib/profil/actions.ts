"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

export type ProfilActionState = { error: string | null; success?: boolean };

type StyleDominan = Database["public"]["Enums"]["style_dominan_enum"];
type TanganSparing = Database["public"]["Enums"]["tangan_sparing_enum"];

export async function saveProfilAction(
  _prevState: ProfilActionState,
  formData: FormData,
): Promise<ProfilActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const beratBadan = formData.get("berat_badan");
  const bulanMulai = formData.get("bulan_mulai_latihan");
  const tahunMulai = formData.get("tahun_mulai_latihan");
  const frekuensi = formData.get("frekuensi_latihan");
  const styleDominan = String(
    formData.get("style_dominan") ?? "Belum Teridentifikasi",
  ) as StyleDominan;
  const tanganSparing = formData.get("tangan_sparing");
  const levelKemampuan = formData.get("level_kemampuan");
  const basecampIds = formData.getAll("basecamp_ids").map(Number).filter(Boolean);

  if (
    !beratBadan ||
    !bulanMulai ||
    !tahunMulai ||
    !frekuensi ||
    !tanganSparing ||
    !levelKemampuan
  ) {
    return { error: "Semua kolom wajib diisi (kecuali style dominan)." };
  }

  if (basecampIds.length === 0) {
    return { error: "Pilih minimal satu basecamp aktif." };
  }

  const tahunNum = Number(tahunMulai);
  const currentYear = new Date().getFullYear();
  if (tahunNum < 1990 || tahunNum > currentYear) {
    return { error: `Tahun mulai latihan harus antara 1990–${currentYear}.` };
  }

  const profilData = {
    user_id: user.id,
    berat_badan: Number(beratBadan),
    bulan_mulai_latihan: Number(bulanMulai),
    tahun_mulai_latihan: tahunNum,
    frekuensi_latihan: Number(frekuensi),
    style_dominan: styleDominan,
    tangan_sparing: String(tanganSparing) as TanganSparing,
    level_kemampuan: Number(levelKemampuan),
  };

  const { data: profilRow, error: upsertError } = await supabase
    .from("profil_atlet")
    .upsert(profilData, { onConflict: "user_id" })
    .select("id")
    .single();

  if (upsertError || !profilRow) {
    return { error: "Gagal menyimpan profil." };
  }

  const profilAtletId = profilRow.id;

  // Set semua row lama jadi tidak aktif
  await supabase
    .from("profil_atlet_basecamp")
    .update({ is_aktif: false })
    .eq("profil_atlet_id", profilAtletId);

  // Upsert basecamp yang dipilih jadi aktif
  const upsertRows = basecampIds.map((bcId) => ({
    profil_atlet_id: profilAtletId,
    basecamp_id: bcId,
    is_aktif: true,
  }));

  const { error: pivotError } = await supabase
    .from("profil_atlet_basecamp")
    .upsert(upsertRows, { onConflict: "profil_atlet_id,basecamp_id" });

  if (pivotError) {
    return { error: "Gagal menyimpan data basecamp aktif." };
  }

  revalidatePath("/profil");
  return { error: null, success: true };
}
