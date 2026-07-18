import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

export async function getEventList(supabase: SupabaseClient<Database>) {
  const { data } = await supabase
    .from("events")
    .select("*, basecamp(id, nama_basecamp)")
    .order("tanggal_event", { ascending: true });

  return data ?? [];
}

export async function getEventById(supabase: SupabaseClient<Database>, id: number) {
  const { data } = await supabase
    .from("events")
    .select("*, basecamp(id, nama_basecamp)")
    .eq("id", id)
    .single();

  return data;
}
