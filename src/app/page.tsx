import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/lib/auth/actions";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let nama: string | null = null;
  let role: string | null = null;
  if (user) {
    const { data: profil } = await supabase
      .from("users")
      .select("nama, role")
      .eq("id", user.id)
      .single();
    nama = profil?.nama ?? null;
    role = profil?.role ?? null;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 px-4">
      <h1 className="text-2xl font-bold">PancoKuy</h1>
      <p>Platform komunitas arm wrestling — sedang dibangun.</p>

      <Link href="/basecamp" className="rounded border px-3 py-2 text-center">
        Direktori Basecamp
      </Link>
      <Link href="/events" className="rounded border px-3 py-2 text-center">
        Jadwal & Event
      </Link>

      {user ? (
        <div className="flex flex-col gap-3">
          <p>Halo, {nama ?? user.email}!</p>
          <Link href="/profil" className="rounded border px-3 py-2 text-center">
            Profil Saya
          </Link>
          {role === "admin" && (
            <>
              <Link href="/admin/basecamp" className="rounded border px-3 py-2 text-center">
                Kelola Basecamp
              </Link>
              <Link href="/admin/events" className="rounded border px-3 py-2 text-center">
                Kelola Event
              </Link>
            </>
          )}
          <form action={logoutAction}>
            <button type="submit" className="rounded border px-3 py-2">
              Keluar
            </button>
          </form>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link href="/login" className="rounded bg-black px-3 py-2 text-white">
            Masuk
          </Link>
          <Link href="/register" className="rounded border px-3 py-2">
            Daftar
          </Link>
        </div>
      )}
    </main>
  );
}
