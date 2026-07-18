import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createClient } from "@/lib/supabase/server";
import { getEventById } from "@/lib/events/queries";
import { getBasecampList } from "@/lib/basecamp/queries";
import { EditEventForm } from "./form";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const supabase = await createClient();
  const [event, basecampList] = await Promise.all([
    getEventById(supabase, Number(id)),
    getBasecampList(supabase),
  ]);

  if (!event) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col gap-4 px-4 py-8">
      <Link href="/admin/events" className="text-sm underline">
        &larr; Kembali
      </Link>
      <h1 className="text-2xl font-bold">Edit Event</h1>
      <EditEventForm event={event} basecampList={basecampList} />
    </main>
  );
}
