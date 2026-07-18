import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createClient } from "@/lib/supabase/server";
import { getEventList } from "@/lib/events/queries";
import { DeleteEventButton } from "./delete-button";

export default async function AdminEventsPage() {
  await requireAdmin();

  const supabase = await createClient();
  const eventList = await getEventList(supabase);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 px-4 py-8">
      <Link href="/" className="text-sm underline">
        &larr; Kembali
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Event</h1>
        <Link href="/admin/events/new" className="rounded bg-black px-3 py-2 text-white">
          Tambah Event
        </Link>
      </div>

      {eventList.length === 0 ? (
        <p>Belum ada event terdaftar.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {eventList.map((event) => (
            <li key={event.id} className="flex items-center justify-between rounded border p-4">
              <div>
                <p className="font-semibold">{event.judul_event}</p>
                <p>
                  {event.jenis_event} &middot; {event.tanggal_event} &middot; {event.waktu_mulai}
                </p>
                <p>
                  {event.lokasi}
                  {event.basecamp ? ` (${event.basecamp.nama_basecamp})` : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/events/${event.id}/edit`} className="rounded border px-3 py-1">
                  Edit
                </Link>
                <DeleteEventButton id={event.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
