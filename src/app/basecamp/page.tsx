import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getBasecampList } from "@/lib/basecamp/queries";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default async function BasecampPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const basecampList = await getBasecampList(supabase);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 px-4 py-8">
      <Link href="/" className="text-sm underline">
        &larr; Kembali
      </Link>
      <h1 className="text-2xl font-bold">Direktori Basecamp</h1>

      {basecampList.length === 0 ? (
        <p>Belum ada basecamp terdaftar.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {basecampList.map((basecamp) => (
            <li key={basecamp.id} className="rounded border p-4">
              <Link href={`/basecamp/${basecamp.id}`} className="text-lg font-semibold underline">
                {basecamp.nama_basecamp}
              </Link>
              <p>{basecamp.alamat}</p>
              <p>
                {basecamp.kota}, {basecamp.provinsi}
              </p>
              {user ? (
                <a
                  href={getWhatsAppLink(basecamp.kontak_pengurus)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block rounded bg-black px-3 py-2 text-white"
                >
                  Hubungi via WhatsApp
                </a>
              ) : (
                <Link
                  href="/login"
                  className="mt-2 inline-block rounded border px-3 py-2"
                >
                  Login untuk lihat kontak
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
