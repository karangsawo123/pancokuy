# Task Harian — Tahap 1 (Setup Next.js + Supabase Schema)

> Breakdown harian dari `docs/progres.md` Tahap 1. File ini HANYA berisi tahap yang sedang
> aktif dikerjakan — begitu Tahap 1 selesai, isi file ini diganti breakdown tahap berikutnya
> (bukan riwayat permanen). Status tahap besar tetap dilacak di `docs/progres.md`.
>
> Centang `[x]` setiap task selesai. Satu task = target satu sesi kerja.

**Tahap terkait:** Tahap 1 — `CLAUDE.md` §8.1
**Skema acuan:** `CLAUDE.md` §5 (8 tabel, nama kolom snake_case Bahasa Indonesia — jangan diubah)

---

## Task 1 — Buat Supabase project

- [ ] Buat project baru di [Supabase Dashboard](https://supabase.com/dashboard)
- [ ] Install/cek Supabase CLI: `supabase --version`
- [ ] Login CLI: `supabase login`
- [ ] Link project lokal ke project remote: `supabase link --project-ref <ref>`
- [ ] Simpan `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` ke `.env.local`
      (jangan commit file ini — pastikan ada di `.gitignore`)

**Selesai kalau:** `supabase status` / dashboard menunjukkan project aktif dan terhubung.

---

## Task 2 — Tulis migration SQL: 8 tabel skema

Project ini pakai workflow **imperative migrations** (belum ada `supabase/schemas/`).

- [ ] Buat file migration baru: `supabase migration new create_core_schema`
      (nama file otomatis diberi prefix timestamp oleh CLI — jangan bikin manual)
- [ ] Tulis DDL persis sesuai `CLAUDE.md` §5, urutan sesuai dependency FK:
  1. `users`
  2. `basecamp` (FK → `users.id` via `created_by`)
  3. `profil_atlet` (FK → `users.id`)
  4. `profil_atlet_basecamp` (FK → `profil_atlet.id`, `basecamp.id`, UNIQUE pair)
  5. `wilayah_kota_berbatasan` (tabel referensi, tidak ada FK ke tabel lain)
  6. `events` (FK → `basecamp.id` NULLABLE, `users.id`)
  7. `wp_criteria` (FK → `users.id` NULLABLE via `updated_by`)
  8. `sparing_requests` (FK → `users.id` x2 — `requester_id`, `opponent_id`)
- [ ] Iterasi cepat pakai `supabase db query` atau MCP `execute_sql` dulu sebelum commit ke file
      migration (biar bisa diubah bebas tanpa bikin banyak history entry)
- [ ] Aktifkan RLS di semua 8 tabel (`alter table ... enable row level security`) — wajib
      karena schema `public` ter-expose ke Data API secara default

**Selesai kalau:** file migration di `supabase/migrations/` berisi DDL lengkap 8 tabel + RLS enabled.

---

## Task 3 — Apply migration + tulis RLS policy dasar

- [ ] Apply migration ke project: `supabase db push`
- [ ] Verifikasi 8 tabel muncul di dashboard sesuai nama & kolom §5 (persis, jangan diterjemahkan)
- [ ] Tulis RLS policy dasar per tabel (least-privilege, sesuaikan role `anggota`/`admin`):
      - `SELECT` policy dulu (tanpa ini, `UPDATE` policy tidak akan bisa lihat baris yang diupdate)
      - Pastikan `UPDATE` policy punya `USING` **dan** `WITH CHECK`, bukan cuma salah satu
      - Pakai klausa `TO authenticated` / `TO anon`, jangan `auth.role() = 'authenticated'` (deprecated)
- [ ] Jalankan `supabase db advisors` (atau MCP `get_advisors`), perbaiki temuan yang muncul

**Selesai kalau:** `supabase migration list --local` menunjukkan migration ter-apply, advisors bersih.

---

## Task 4 — Seed `wp_criteria`

- [ ] Buat migration/seed terpisah: `supabase migration new seed_wp_criteria`
- [ ] Insert 6 baris (C1–C6) sesuai `CLAUDE.md` §4 tabel kriteria
- [ ] `nilai_bobot_awal` pakai **nilai placeholder yang jelas ditandai sementara**
      (komentar SQL: belum dari wawancara expert judgement — lihat `docs/progres.md` catatan)
- [ ] Hitung & isi `bobot_normalisasi` = `nilai_bobot_awal / Σ nilai_bobot_awal` (Σ = 1)

**Selesai kalau:** `select * from wp_criteria` menampilkan 6 baris, Σ `bobot_normalisasi` = 1.

---

## Task 5 — Seed `wilayah_kota_berbatasan`

- [ ] Buat migration/seed: `supabase migration new seed_wilayah_kota_berbatasan`
- [ ] Kumpulkan data dummy kota-kota berbatasan di Jawa Timur (minimal cakup kota basecamp
      yang direncanakan jadi objek penelitian)
- [ ] Insert baris `(kota_a, kota_b, provinsi)` — ingat aturan cek dua arah di §5, jadi tidak perlu
      duplikat `(kota_b, kota_a)`

**Selesai kalau:** ada baris yang mencakup skenario uji skor C1 = 3 (kota berbatasan).

---

## Task 6 — Generate TypeScript types

- [ ] Generate types dari remote project:
      `supabase gen types typescript --project-id <ref> --schema public > src/lib/database.types.ts`
      (atau `--linked` kalau sudah link, atau `--local` kalau generate dari DB lokal)
- [ ] Commit file types ke repo
- [ ] Cek tidak ada error import saat dipakai di Supabase client (`createClient<Database>(...)`)

**Selesai kalau:** `src/lib/database.types.ts` ada, ter-commit, dan bisa di-import tanpa error TS.

---

## Setelah Task 6 selesai

- [ ] Update `docs/progres.md`: Tahap 1 → ✅, update "Fase sekarang" & "Berikutnya" ke Tahap 2 (Auth)
- [ ] Hapus/ganti isi file ini dengan breakdown Tahap 2
