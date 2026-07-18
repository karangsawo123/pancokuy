import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createClient } from "@/lib/supabase/server";
import { getBasecampById } from "@/lib/basecamp/queries";
import { EditBasecampForm } from "./form";

export default async function EditBasecampPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const supabase = await createClient();
  const basecamp = await getBasecampById(supabase, Number(id));

  if (!basecamp) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col gap-4 px-4 py-8">
      <Link href="/admin/basecamp" className="text-sm underline">
        &larr; Kembali
      </Link>
      <h1 className="text-2xl font-bold">Edit Basecamp</h1>
      <EditBasecampForm basecamp={basecamp} />
    </main>
  );
}
