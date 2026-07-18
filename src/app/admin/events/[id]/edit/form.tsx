"use client";

import { useActionState } from "react";
import { updateEventAction, type EventActionState } from "@/lib/events/actions";
import type { Database } from "@/lib/supabase/types";

const initialState: EventActionState = { error: null };

type Basecamp = Database["public"]["Tables"]["basecamp"]["Row"];
type Event = Database["public"]["Tables"]["events"]["Row"];

function toTimeInputValue(value: string | null) {
  return value ? value.slice(0, 5) : "";
}

export function EditEventForm({
  event,
  basecampList,
}: {
  event: Event;
  basecampList: Basecamp[];
}) {
  const [state, formAction, pending] = useActionState(updateEventAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="id" value={event.id} />
      <input
        name="judul_event"
        placeholder="Judul event"
        defaultValue={event.judul_event}
        className="rounded border px-3 py-2"
      />
      <input
        name="jenis_event"
        placeholder="Jenis event (mis. Latihan Rutin, Turnamen)"
        defaultValue={event.jenis_event}
        className="rounded border px-3 py-2"
      />
      <label className="flex flex-col gap-1 text-sm">
        Basecamp (kosongkan jika event umum)
        <select
          name="basecamp_id"
          defaultValue={event.basecamp_id ? String(event.basecamp_id) : ""}
          className="rounded border px-3 py-2"
        >
          <option value="">- Umum (tidak terikat basecamp) -</option>
          {basecampList.map((basecamp) => (
            <option key={basecamp.id} value={basecamp.id}>
              {basecamp.nama_basecamp}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Tanggal
        <input
          type="date"
          name="tanggal_event"
          defaultValue={event.tanggal_event}
          className="rounded border px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Waktu mulai
        <input
          type="time"
          name="waktu_mulai"
          defaultValue={toTimeInputValue(event.waktu_mulai)}
          className="rounded border px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Waktu selesai (opsional)
        <input
          type="time"
          name="waktu_selesai"
          defaultValue={toTimeInputValue(event.waktu_selesai)}
          className="rounded border px-3 py-2"
        />
      </label>
      <input
        name="lokasi"
        placeholder="Lokasi"
        defaultValue={event.lokasi}
        className="rounded border px-3 py-2"
      />
      <textarea
        name="deskripsi"
        placeholder="Deskripsi (opsional)"
        defaultValue={event.deskripsi ?? ""}
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
