"use client";

import { useActionState } from "react";
import { updateBasecampAction, type BasecampActionState } from "@/lib/basecamp/actions";
import type { Database } from "@/lib/supabase/types";

const initialState: BasecampActionState = { error: null };

type Basecamp = Database["public"]["Tables"]["basecamp"]["Row"];

export function EditBasecampForm({ basecamp }: { basecamp: Basecamp }) {
  const [state, formAction, pending] = useActionState(updateBasecampAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="id" value={basecamp.id} />
      <input
        name="nama_basecamp"
        placeholder="Nama basecamp"
        defaultValue={basecamp.nama_basecamp}
        className="rounded border px-3 py-2"
      />
      <input
        name="alamat"
        placeholder="Alamat"
        defaultValue={basecamp.alamat}
        className="rounded border px-3 py-2"
      />
      <input
        name="kota"
        placeholder="Kota"
        defaultValue={basecamp.kota}
        className="rounded border px-3 py-2"
      />
      <input
        name="provinsi"
        placeholder="Provinsi"
        defaultValue={basecamp.provinsi}
        className="rounded border px-3 py-2"
      />
      <input
        name="kontak_pengurus"
        placeholder="Nomor WhatsApp pengurus"
        defaultValue={basecamp.kontak_pengurus}
        className="rounded border px-3 py-2"
      />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}
