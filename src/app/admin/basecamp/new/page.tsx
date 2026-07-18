import Link from "next/link";
import { requireAdmin } from "@/lib/auth/require-admin";
import { NewBasecampForm } from "./form";

export default async function NewBasecampPage() {
  await requireAdmin();

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col gap-4 px-4 py-8">
      <Link href="/admin/basecamp" className="text-sm underline">
        &larr; Kembali
      </Link>
      <h1 className="text-2xl font-bold">Tambah Basecamp</h1>
      <NewBasecampForm />
    </main>
  );
}
