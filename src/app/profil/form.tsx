"use client";

import { useActionState } from "react";
import { saveProfilAction, type ProfilActionState } from "@/lib/profil/actions";
import type { ProfilAtlet } from "@/lib/profil/queries";

type Basecamp = { id: number; nama_basecamp: string; kota: string };

type Props = {
  profil: ProfilAtlet | null;
  basecampAktifIds: number[];
  basecampList: Basecamp[];
};

const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const initialState: ProfilActionState = { error: null };

export function ProfilForm({ profil, basecampAktifIds, basecampList }: Props) {
  const [state, formAction, pending] = useActionState(saveProfilAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Berat Badan (kg) *</label>
        <input
          name="berat_badan"
          type="number"
          step="0.01"
          min="1"
          placeholder="Contoh: 75.5"
          defaultValue={profil?.berat_badan ?? ""}
          className="rounded border px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Bulan Mulai Latihan *</label>
        <select
          name="bulan_mulai_latihan"
          defaultValue={profil?.bulan_mulai_latihan ?? ""}
          className="rounded border px-3 py-2"
        >
          <option value="">-- Pilih bulan --</option>
          {BULAN.map((b, i) => (
            <option key={i + 1} value={i + 1}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Tahun Mulai Latihan *</label>
        <input
          name="tahun_mulai_latihan"
          type="number"
          min="1990"
          max={new Date().getFullYear()}
          placeholder="Contoh: 2020"
          defaultValue={profil?.tahun_mulai_latihan ?? ""}
          className="rounded border px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Frekuensi Latihan (sesi/minggu) *</label>
        <input
          name="frekuensi_latihan"
          type="number"
          min="0"
          placeholder="Contoh: 3"
          defaultValue={profil?.frekuensi_latihan ?? ""}
          className="rounded border px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Tangan Sparing *</label>
        <select
          name="tangan_sparing"
          defaultValue={profil?.tangan_sparing ?? ""}
          className="rounded border px-3 py-2"
        >
          <option value="">-- Pilih tangan --</option>
          <option value="Kanan">Kanan</option>
          <option value="Kiri">Kiri</option>
          <option value="Keduanya">Keduanya</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Level Kemampuan *</label>
        <select
          name="level_kemampuan"
          defaultValue={profil?.level_kemampuan ?? ""}
          className="rounded border px-3 py-2"
        >
          <option value="">-- Pilih level --</option>
          <option value="1">Pemula</option>
          <option value="2">Semi Pro</option>
          <option value="3">Pro</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Style Dominan (opsional)</label>
        <select
          name="style_dominan"
          defaultValue={profil?.style_dominan ?? "Belum Teridentifikasi"}
          className="rounded border px-3 py-2"
        >
          <option value="Belum Teridentifikasi">Belum Teridentifikasi</option>
          <option value="Toproll">Toproll</option>
          <option value="Hook">Hook</option>
          <option value="Press">Press</option>
          <option value="Kingsmove">Kingsmove</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Basecamp Aktif * (pilih minimal 1)</label>
        {basecampList.length === 0 ? (
          <p className="text-sm text-gray-500">Belum ada basecamp terdaftar.</p>
        ) : (
          <div className="flex flex-col gap-1 rounded border px-3 py-2">
            {basecampList.map((bc) => (
              <label key={bc.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name="basecamp_ids"
                  value={bc.id}
                  defaultChecked={basecampAktifIds.includes(bc.id)}
                />
                {bc.nama_basecamp} — {bc.kota}
              </label>
            ))}
          </div>
        )}
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-green-600">Profil berhasil disimpan.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-black px-3 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Menyimpan..." : "Simpan Profil"}
      </button>
    </form>
  );
}
