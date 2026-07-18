import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getProfilByUserId, isProfilLengkap } from "@/lib/profil/queries";
import { getBasecampList } from "@/lib/basecamp/queries";
import { ProfilForm } from "./form";

export default async function ProfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ profil, basecampAktifIds }, basecampList] = await Promise.all([
    getProfilByUserId(supabase, user.id),
    getBasecampList(supabase),
  ]);

  const lengkap = isProfilLengkap(profil, basecampAktifIds);

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col gap-4 px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Profil Atlet</h1>
        <Link href="/" className="text-sm underline">
          Kembali
        </Link>
      </div>

      {!lengkap && (
        <p className="rounded border border-yellow-400 bg-yellow-50 px-3 py-2 text-sm text-yellow-800">
          Profil belum lengkap. Lengkapi semua kolom wajib untuk menggunakan
          fitur Sparing Matcher dan Challenge Mode.
        </p>
      )}

      {lengkap && (
        <p className="rounded border border-green-400 bg-green-50 px-3 py-2 text-sm text-green-800">
          Profil lengkap.
        </p>
      )}

      <ProfilForm
        profil={profil}
        basecampAktifIds={basecampAktifIds}
        basecampList={basecampList}
      />
    </main>
  );
}
