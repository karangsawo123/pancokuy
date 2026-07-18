"use client";

import { useActionState } from "react";
import { createBasecampAction, type BasecampActionState } from "@/lib/basecamp/actions";

const initialState: BasecampActionState = { error: null };

export function NewBasecampForm() {
  const [state, formAction, pending] = useActionState(createBasecampAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input
        name="nama_basecamp"
        placeholder="Nama basecamp"
        className="rounded border px-3 py-2"
      />
      <input name="alamat" placeholder="Alamat" className="rounded border px-3 py-2" />
      <input name="kota" placeholder="Kota" className="rounded border px-3 py-2" />
      <input name="provinsi" placeholder="Provinsi" className="rounded border px-3 py-2" />
      <input
        name="kontak_pengurus"
        placeholder="Nomor WhatsApp pengurus"
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
