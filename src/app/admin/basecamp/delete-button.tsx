"use client";

import { deleteBasecampAction } from "@/lib/basecamp/actions";

export function DeleteBasecampButton({ id }: { id: number }) {
  return (
    <form
      action={deleteBasecampAction}
      onSubmit={(e) => {
        if (!confirm("Yakin hapus basecamp ini?")) {
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
