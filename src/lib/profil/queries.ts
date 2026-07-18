import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

export type ProfilAtlet = Database["public"]["Tables"]["profil_atlet"]["Row"];

export type ProfilWithBasecamp = {
  profil: ProfilAtlet | null;
  basecampAktifIds: number[];
};

export async function getProfilByUserId(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<ProfilWithBasecamp> {
  const { data: profil } = await supabase
    .from("profil_atlet")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (!profil) {
    return { profil: null, basecampAktifIds: [] };
  }

  const { data: pivotRows } = await supabase
    .from("profil_atlet_basecamp")
    .select("basecamp_id, is_aktif")
    .eq("profil_atlet_id", profil.id);

  const basecampAktifIds =
    pivotRows
      ?.filter((r: { basecamp_id: number; is_aktif: boolean }) => r.is_aktif)
      .map((r: { basecamp_id: number; is_aktif: boolean }) => r.basecamp_id) ?? [];

  return { profil, basecampAktifIds };
}

export function isProfilLengkap(profil: ProfilAtlet | null, basecampAktifIds: number[]): boolean {
  if (!profil) return false;
  return (
    profil.berat_badan !== null &&
    profil.bulan_mulai_latihan !== null &&
    profil.tahun_mulai_latihan !== null &&
    profil.frekuensi_latihan !== null &&
    profil.tangan_sparing !== null &&
    profil.level_kemampuan !== null &&
    basecampAktifIds.length > 0
  );
}
