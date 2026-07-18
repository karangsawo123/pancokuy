"use client";

import { deleteEventAction } from "@/lib/events/actions";

export function DeleteEventButton({ id }: { id: number }) {
  return (
    <form
      action={deleteEventAction}
      onSubmit={(e) => {
        if (!confirm("Yakin hapus event ini?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="rounded border px-3 py-1 text-red-600">
        Hapus
      </button>
    </form>
  );
}
