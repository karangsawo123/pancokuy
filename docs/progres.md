# Progres Pembangunan — PancoKuy

> **Baca file ini di awal setiap sesi coding.** Ini satu-satunya sumber status "sudah sampai
> mana". Perbarui setiap kali menyelesaikan atau memulai sebuah tahap.

**Terakhir diperbarui:** 2026-07-18
**Fase sekarang:** Tahap 5 — Form profil atlet ✅ selesai
**Berikutnya:** Tahap 6 — Direktori anggota + Challenge Mode (filter + ajukan sparing)

---

## Checklist tahap

Urutan mengikuti `CLAUDE.md` §8. Status: ⬜ belum · 🟡 sedang dikerjakan · ✅ selesai

| # | Tahap | Status |
| :--- | :--- | :--- |
| 0 | Fondasi dokumentasi & struktur repo (README, docs/, decision log, CLAUDE.md) | ✅ |
| 1 | Setup project Next.js + TypeScript + Tailwind; Prisma schema seluruh 8 tabel + migration awal + seed `wp_criteria` & `wilayah_kota_berbatasan` | ✅ |
| 2 | Auth (register/login) Supabase Auth + role `anggota`/`admin` (lihat KP-006, KP-008) | ✅ |
| 3 | CRUD Basecamp (admin) + halaman direktori basecamp publik + CTA WhatsApp | ✅ |
| 4 | CRUD Events (admin) + halaman jadwal/event | ✅ |
| 5 | Form profil atlet (6 kriteria WP + basecamp aktif + style dominan) + validasi kelengkapan | ✅ |
| 6 | Direktori anggota + Challenge Mode (filter + ajukan sparing) | ⬜ |
| 7 | `WPMatcher` — logic murni WP, diuji dengan data dummy sebelum menyentuh UI | ⬜ |
| 8 | Halaman Sparing Matcher + ajukan sparing | ⬜ |
| 9 | Inbox permintaan sparing — terima/tolak/batal (lihat KP-005) | ⬜ |
| 10 | Panel admin (basecamp, event, profil anggota, bobot WP + rekalkulasi normalisasi) | ⬜ |
| 11 | Pengujian: 24 skenario black-box + uji kesesuaian WP manual vs sistem | ⬜ |

---

## Catatan & hambatan

- **Tahap 5 — Form profil atlet selesai (2026-07-18).** Tidak ada migration baru —
  tabel `profil_atlet` dan `profil_atlet_basecamp` sudah ada sejak Tahap 1.
  - File baru: `src/lib/profil/queries.ts` (`getProfilByUserId` ambil profil +
    basecamp aktif per user; `isProfilLengkap` cek 6 kriteria WP terisi + minimal
    1 basecamp aktif, sesuai KP-002), `src/lib/profil/actions.ts`
    (`saveProfilAction` — upsert `profil_atlet` via `onConflict: 'user_id'`, lalu
    reset semua pivot `profil_atlet_basecamp` ke `is_aktif=false`, kemudian upsert
    basecamp terpilih ke `is_aktif=true`), `src/app/profil/page.tsx` (halaman
    `/profil`, guard login, banner status lengkap/belum), `src/app/profil/form.tsx`
    (client form: berat_badan, bulan+tahun mulai latihan, frekuensi, tangan_sparing,
    level_kemampuan, style_dominan opsional, checkbox basecamp aktif).
  - `src/lib/auth/actions.ts` diperbarui: `loginAction` cek `isProfilLengkap`
    setelah sign-in sukses, redirect ke `/profil` jika belum lengkap, ke `/` jika
    sudah — menyambungkan catatan yang ditunda dari Tahap 2.
  - `src/app/page.tsx` diperbarui: tambah link "Profil Saya" untuk user yang sudah
    login.
  - **Belum diuji end-to-end** (tidak ada dev server aktif di sesi ini). Perlu
    diverifikasi di sesi berikutnya sebelum atau saat Tahap 6 dimulai.
- **Tahap 4 — CRUD Events (admin) + halaman jadwal/event selesai (2026-07-17).** Tabel
  `events` dan RLS-nya sudah ada sejak migration Tahap 1 (select publik untuk
  anon/authenticated, write khusus admin via `is_admin()`), jadi tahap ini juga murni
  query layer + Server Actions + UI mengikuti pola persis Tahap 3 (basecamp), tanpa
  migration baru.
  - File baru: `src/lib/events/queries.ts` (`getEventList`, `getEventById`, join ke
    `basecamp(id, nama_basecamp)` untuk menampilkan nama basecamp terkait),
    `src/lib/events/actions.ts` (`createEventAction`, `updateEventAction`,
    `deleteEventAction` — pola sama dengan `basecamp/actions.ts`), halaman admin
    `src/app/admin/events/page.tsx` + `new/page.tsx` + `new/form.tsx` +
    `[id]/edit/page.tsx` + `[id]/edit/form.tsx` + `delete-button.tsx`, halaman publik
    `src/app/events/page.tsx`. `src/app/page.tsx` diperbarui: tambah link "Jadwal &
    Event" (selalu tampil) dan "Kelola Event" (khusus admin).
  - `basecamp_id` nullable di form (dropdown "- Umum (tidak terikat basecamp) -" vs
    pilih basecamp tertentu), sesuai CLAUDE.md §3 poin 3 ("bisa umum atau terikat ke
    basecamp tertentu"). Kolom `waktu_mulai`/`waktu_selesai` bertipe `time` di DB;
    di form pakai `<input type="time">` dan dikonversi ke format `HH:MM` saat
    menampilkan `defaultValue` (DB mengembalikan `HH:MM:SS`).
  - Styling sengaja tetap minimalis (Tailwind polos, belum shadcn/ui) — konsisten
    dengan KP-013, menyusul upgrade desain final di tahap terpisah nanti.
  - **Teruji end-to-end lewat Playwright** (dev server lokal + project Supabase asli):
    non-admin (anggota) diarahkan pergi saat coba akses `/admin/events`; admin bisa
    tambah event umum (tanpa basecamp), event langsung muncul di admin list dan di
    halaman publik `/events` dengan label "(Umum)"; edit judul event tersimpan dan
    tampil; hapus event berhasil menghilangkannya dari list. Akun & data test yang
    dibuat selama pengujian (4 akun `test*@example.com` dan event
    "Latihan Rutin Mingguan") sudah dihapus dari project Supabase asli lewat Auth
    Admin API — diverifikasi tidak ada sisa data.
  - **Catatan lingkungan (bukan soal kode):** selama pengujian ditemukan proses
    `next dev` "hantu" (zombie) yang masih listen di port 3000 dari sesi sebelumnya
    dan sempat membuat `page.goto` Playwright timeout berulang kali — bukan bug
    aplikasi. Solusinya cukup `Stop-Process` PID yang memegang port 3000 sebelum
    menjalankan dev server baru untuk pengujian berikutnya.
- **Tahap 3 — CRUD Basecamp + Direktori Publik selesai (2026-07-16).** Tabel `basecamp`
  dan RLS-nya sudah ada sejak migration Tahap 1, jadi tahap ini murni type generation +
  query layer + Server Actions + UI, tidak ada migration baru. Tiga keputusan dikonfirmasi
  user & dicatat sebagai KP-011 (kontak WA disembunyikan sampai login, tombol
  "Login untuk lihat kontak"), KP-012 (nomor disimpan mentah, dinormalisasi ke `wa.me/...`
  lewat `src/lib/whatsapp.ts`), dan KP-013 (list + detail, styling minimalis dulu).
  - File baru: `src/lib/supabase/types.ts` (generated via `supabase gen types typescript
    --project-id uiesgtjexsvkbsgcseij`, di-wire ke `client.ts`/`server.ts` lewat generic
    `Database`), `src/lib/whatsapp.ts`, `src/lib/auth/require-admin.ts` (guard admin
    per-halaman, bukan lewat middleware — konsisten dengan `src/middleware.ts` yang memang
    sengaja tidak menjaga rute lain), `src/lib/basecamp/queries.ts` &
    `src/lib/basecamp/actions.ts`, halaman publik `src/app/basecamp/page.tsx` +
    `src/app/basecamp/[id]/page.tsx`, halaman admin `src/app/admin/basecamp/page.tsx` +
    `new/` + `[id]/edit/` + `delete-button.tsx`. `src/app/page.tsx` diperbarui: query
    `role` ditambahkan, ada link "Direktori Basecamp" (selalu tampil) dan
    "Kelola Basecamp" (khusus admin).
  - **Teruji end-to-end lewat Playwright** (dev server lokal + project Supabase asli):
    anon lihat "Login untuk lihat kontak" mengarah ke `/login`; setelah login CTA berubah
    jadi link `wa.me/<nomor ternormalisasi>` (diverifikasi hasil normalisasi
    `081234567890` → `6281234567890` benar); non-admin diarahkan pergi saat coba akses
    `/admin/basecamp`; admin bisa tambah/edit/hapus basecamp dan hasilnya konsisten di
    direktori publik. Akun & data test dibersihkan sesudahnya (pola sama seperti Tahap 2).
  - **Temuan penting — trigger `trg_prevent_role_change` (migration Tahap 1) memblokir
    workflow promosi admin yang didokumentasikan KP-009.** Trigger ini menolak `UPDATE
    users SET role=...` kapan pun `auth.uid()` tidak cocok dengan admin yang sedang login
    — termasuk lewat REST `service_role` key maupun `supabase db query --linked` (CLI),
    karena kedua jalur itu tidak membawa sesi JWT admin, jadi `auth.uid()` bernilai NULL
    dan `is_admin()` selalu `false`. Kemungkinan besar hal yang sama berlaku juga untuk
    Supabase Studio SQL Editor. Workaround yang dipakai untuk pengujian: jalankan
    `alter table users disable trigger trg_prevent_role_change;` sebelum `UPDATE`, lalu
    `enable trigger` lagi sesudahnya. **KP-009 perlu direvisi** untuk mencantumkan langkah
    disable/enable trigger ini (atau triggernya dilonggarkan agar mengecualikan
    `service_role`) — belum diputuskan, tunggu konfirmasi user.
- **Tahap 2 — Auth selesai (2026-07-15).** Register/login/logout jalan pakai Supabase Auth,
  diuji end-to-end lewat browser (Playwright): daftar -> redirect ke home + tampil nama, keluar,
  masuk lagi, daftar dengan email duplikat -> error "Email sudah terdaftar", login password
  salah -> error "Email atau password salah". Semua lulus.
  - File baru: `src/lib/supabase/client.ts` & `server.ts` (setup `@supabase/ssr`),
    `src/middleware.ts` (refresh session + redirect user yang sudah login menjauh dari
    `/login`/`/register`), `src/lib/auth/actions.ts` (Server Actions `registerAction`,
    `loginAction`, `logoutAction`), `src/app/register/page.tsx`, `src/app/login/page.tsx`.
    `src/app/page.tsx` diperbarui untuk menampilkan status login.
  - **KP-010 baru ditambahkan**: verifikasi email dimatikan (`enable_confirmations = false`),
    supaya sesuai skenario black-box #1/#3 yang tidak menyebut langkah konfirmasi email.
  - **Tampilan sengaja dibuat sederhana** (Tailwind polos, belum shadcn/ui) atas permintaan user
    — desain final menyusul begitu user memberi referensi desain. shadcn/ui **belum** di-init.
  - **Belum diimplementasikan**: "setelah login, cek kelengkapan profil -> redirect ke halaman
    profil jika belum lengkap" (BAB 3.4.2). Sengaja ditunda karena halaman profil atlet baru
    dibangun di Tahap 5 — saat ini login/register selalu redirect ke `/`. Perlu disambungkan
    nanti begitu Tahap 5 selesai.
  - Akun test yang dibuat saat pengujian Playwright (email `test*@example.com`) sudah dihapus
    dari project Supabase asli lewat Auth Admin API — tidak ada data sampah tersisa.
- **Tahap 1 (bagian Next.js) sudah jalan (2026-07-13):** project Next.js App Router + TypeScript +
  Tailwind v4 sudah di-bootstrap di root repo. `npm run dev` sudah diverifikasi jalan tanpa error.
- **Tech stack diperbarui (2026-07-14):** Stack diganti dari Prisma + Auth.js v5 ke
  **Supabase (PostgreSQL + Auth) + shadcn/ui**. Skills baru sudah diinstall:
  `supabase`, `supabase-postgres-best-practices`, `shadcn`, `vercel-react-best-practices`,
  `nextjs-supabase-auth`, `nextjs-app-router-patterns`. Lihat KP-001 & KP-006 di `docs/keputusan.md`.
- **Project Supabase dibuat & schema 8 tabel di-push (2026-07-15).** Project ref
  `uiesgtjexsvkbsgcseij`. Data API: "Automatically expose new tables" **dimatikan** (rekomendasi
  Supabase saat ini) — sebagai gantinya, setiap tabel dapat `GRANT` eksplisit di migration untuk
  role yang memang butuh akses (`anon` hanya untuk `basecamp`/`events`; `authenticated` sesuai
  RLS; `service_role` full lewat migration terpisah). "Enable automatic RLS" dinyalakan sebagai
  jaring pengaman untuk tabel baru yang dibuat lewat Studio nanti.
  - `supabase/migrations/20260715083340_create_initial_schema.sql` — 8 tabel BAB 3.3.3 persis
    (nama tabel/kolom snake_case Indonesia), 5 enum type, RLS aktif + policy + `GRANT` eksplisit
    di semua tabel sesuai aturan yang sudah diputuskan (KP-004 admin-only basecamp/event, dst.),
    trigger `updated_at` otomatis, trigger rekalkulasi `bobot_normalisasi` otomatis di
    `wp_criteria` (sesuai CLAUDE.md §4), dan constraint `requester_id <> opponent_id` di
    `sparing_requests`.
  - `supabase/migrations/20260715083343_seed_wp_criteria_and_wilayah.sql` — seed 6 baris
    `wp_criteria` (bobot **placeholder sama rata**, BUKAN hasil wawancara expert judgement —
    jangan dipakai untuk laporan BAB 4) dan 46 pasangan `wilayah_kota_berbatasan` untuk
    kabupaten/kota Jawa Timur (data dummy, perlu diverifikasi/dipersempit ke basecamp riil objek
    penelitian).
  - `supabase/migrations/20260715090428_grant_service_role_access.sql` — tambahan grant
    `service_role` (sempat tertinggal di migration pertama, ketahuan saat verifikasi lewat REST
    API — sudah diperbaiki & di-push).
  - **KP-008 baru ditambahkan**: `public.users.id` disamakan dengan `auth.users.id`, kolom
    `password_hash` dihapus dari skema (lihat `docs/keputusan.md`).
  - Sudah diverifikasi lewat Data API (REST): seed `wp_criteria` & `wilayah_kota_berbatasan`
    terbaca benar, `bobot_normalisasi` ter-hitung otomatis oleh trigger, dan RLS bekerja sesuai
    desain (anon boleh baca `basecamp`, ditolak baca `users`). Tidak ada Docker di mesin ini
    untuk `supabase start` lokal, jadi pengujian berjalan langsung di project remote.
  - `@supabase/ssr`, `@supabase/supabase-js`, dan `supabase` CLI (sebagai devDependency,
    dipanggil via `npx supabase`) sudah terpasang di `package.json`. CLI login pakai Personal
    Access Token (bukan OAuth browser, karena environment non-TTY).
  - `.env.local` (gitignored) sudah diisi kredensial project asli. `.env.example` sudah
    diperbarui ke variabel Supabase (`NEXT_PUBLIC_SUPABASE_URL`,
    `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`), menggantikan variabel
    Prisma/Auth.js lama.
- **KP-005 belum dikonfirmasi ke dosen pembimbing.** Fitur inbox terima/tolak sparing adalah
  deviasi dari 24 skenario BAB 3.5.1 (walau kolom `status` sudah ada di skema ACC). Bawa ke
  bimbingan berikutnya. Kalau ditolak, Tahap 9 dicoret.
- **Bobot awal WP (`nilai_bobot_awal`) belum ada.** Nilainya berasal dari wawancara terstruktur
  *expert judgement* dengan senior/pengurus komunitas (BAB 3.1.3) — belum dilakukan. Sampai data
  itu masuk, seed `wp_criteria` pakai nilai placeholder (jelas ditandai sementara), dan angkanya
  **tidak boleh** dipakai di laporan.
- **Data `wilayah_kota_berbatasan` sudah diseed (46 pasangan, dummy, Jawa Timur).** Perlu
  ditinjau ulang & dipersempit/ditambah begitu basecamp riil objek penelitian sudah pasti,
  supaya cakupannya cocok dengan kota-kota basecamp yang benar-benar dipakai.
