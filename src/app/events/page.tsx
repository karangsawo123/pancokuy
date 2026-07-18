import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getEventList } from "@/lib/events/queries";

export default async function EventsPage() {
  const supabase = await createClient();
  const eventList = await getEventList(supabase);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 px-4 py-8">
      <Link href="/" className="text-sm underline">
        &larr; Kembali
      </Link>
      <h1 className="text-2xl font-bold">Jadwal & Event</h1>

      {eventList.length === 0 ? (
        <p>Belum ada jadwal/event terdaftar.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {eventList.map((event) => (
            <li key={event.id} className="rounded border p-4">
              <p className="text-lg font-semibold">{event.judul_event}</p>
              <p>{event.jenis_event}</p>
              <p>
                {event.tanggal_event} &middot; {event.waktu_mulai.slice(0, 5)}
                {event.waktu_selesai ? ` - ${event.waktu_selesai.slice(0, 5)}` : ""}
              </p>
              <p>
                {event.lokasi}
                {event.basecamp ? ` (${event.basecamp.nama_basecamp})` : " (Umum)"}
              </p>
              {event.deskripsi && <p className="mt-1 text-sm">{event.deskripsi}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
