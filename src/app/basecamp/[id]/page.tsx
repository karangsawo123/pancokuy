import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getBasecampById } from "@/lib/basecamp/queries";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default async function BasecampDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const basecamp = await getBasecampById(supabase, Number(id));

  if (!basecamp) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col gap-4 px-4 py-8">
      <Link href="/basecamp" className="text-sm underline">
        &larr; Kembali ke direktori
      </Link>
      <h1 className="text-2xl font-bold">{basecamp.nama_basecamp}</h1>
      <p>{basecamp.alamat}</p>
      <p>
        {basecamp.kota}, {basecamp.provinsi}
      </p>

      {user ? (
        <a
          href={getWhatsAppLink(basecamp.kontak_pengurus)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded bg-black px-3 py-2 text-center text-white"
        >
          Hubungi via WhatsApp
        </a>
      ) : (
        <Link href="/login" className="inline-block rounded border px-3 py-2 text-center">
          Login untuk lihat kontak
        </Link>
      )}
    </main>
  );
}
