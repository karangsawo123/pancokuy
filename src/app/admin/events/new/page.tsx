import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createClient } from "@/lib/supabase/server";
import { getBasecampList } from "@/lib/basecamp/queries";
import { NewEventForm } from "./form";

export default async function NewEventPage() {
  await requireAdmin();

  const supabase = await createClient();
  const basecampList = await getBasecampList(supabase);

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col gap-4 px-4 py-8">
      <Link href="/admin/events" className="text-sm underline">
        &larr; Kembali
      </Link>
      <h1 className="text-2xl font-bold">Tambah Event</h1>
      <NewEventForm basecampList={basecampList} />
    </main>
  );
}
