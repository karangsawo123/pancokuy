import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

export async function getBasecampList(supabase: SupabaseClient<Database>) {
  const { data } = await supabase
    .from("basecamp")
    .select("*")
    .order("nama_basecamp", { ascending: true });

  return data ?? [];
}

export async function getBasecampById(supabase: SupabaseClient<Database>, id: number) {
  const { data } = await supabase.from("basecamp").select("*").eq("id", id).single();

  return data;
}
