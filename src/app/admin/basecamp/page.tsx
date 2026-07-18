import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createClient } from "@/lib/supabase/server";
import { getBasecampList } from "@/lib/basecamp/queries";
import { DeleteBasecampButton } from "./delete-button";

export default async function AdminBasecampPage() {
  await requireAdmin();

  const supabase = await createClient();
  const basecampList = await getBasecampList(supabase);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-4 px-4 py-8">
      <Link href="/" className="text-sm underline">
        &larr; Kembali
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Kelola Basecamp</h1>
        <Link href="/admin/basecamp/new" className="rounded bg-black px-3 py-2 text-white">
          Tambah Basecamp
        </Link>
      </div>

      {basecampList.length === 0 ? (
        <p>Belum ada basecamp terdaftar.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {basecampList.map((basecamp) => (
            <li key={basecamp.id} className="flex items-center justify-between rounded border p-4">
              <div>
                <p className="font-semibold">{basecamp.nama_basecamp}</p>
                <p>
                  {basecamp.kota}, {basecamp.provinsi}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/basecamp/${basecamp.id}/edit`}
                  className="rounded border px-3 py-1"
                >
                  Edit
                </Link>
                <DeleteBasecampButton id={basecamp.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
