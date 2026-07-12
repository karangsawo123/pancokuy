# Progres Pembangunan — PancoKuy

> **Baca file ini di awal setiap sesi coding.** Ini satu-satunya sumber status "sudah sampai
> mana". Perbarui setiap kali menyelesaikan atau memulai sebuah tahap.

**Terakhir diperbarui:** 2026-07-13
**Fase sekarang:** Tahap 1 — Setup Next.js 🟡 sebagian (Next.js + Tailwind + design system jalan;
Prisma schema belum)
**Berikutnya:** Lanjutkan Tahap 1 — `prisma/schema.prisma` 8 tabel + migration awal + seed
`wp_criteria` & `wilayah_kota_berbatasan`

---

## Checklist tahap

Urutan mengikuti `CLAUDE.md` §8. Status: ⬜ belum · 🟡 sedang dikerjakan · ✅ selesai

| # | Tahap | Status |
| :--- | :--- | :--- |
| 0 | Fondasi dokumentasi & struktur repo (README, docs/, decision log, CLAUDE.md) | ✅ |
| 1 | Setup project Next.js + TypeScript + Tailwind; Prisma schema seluruh 8 tabel + migration awal + seed `wp_criteria` & `wilayah_kota_berbatasan` | 🟡 |
| 2 | Auth (register/login) Auth.js v5 + role `anggota`/`admin` (lihat KP-006) | ⬜ |
| 3 | CRUD Basecamp (admin) + halaman direktori basecamp publik + CTA WhatsApp | ⬜ |
| 4 | CRUD Events (admin) + halaman jadwal/event | ⬜ |
| 5 | Form profil atlet (6 kriteria WP + basecamp aktif + style dominan) + validasi kelengkapan | ⬜ |
| 6 | Direktori anggota + Challenge Mode (filter + ajukan sparing) | ⬜ |
| 7 | `WPMatcher` — logic murni WP, diuji dengan data dummy sebelum menyentuh UI | ⬜ |
| 8 | Halaman Sparing Matcher + ajukan sparing | ⬜ |
| 9 | Inbox permintaan sparing — terima/tolak/batal (lihat KP-005) | ⬜ |
| 10 | Panel admin (basecamp, event, profil anggota, bobot WP + rekalkulasi normalisasi) | ⬜ |
| 11 | Pengujian: 24 skenario black-box + uji kesesuaian WP manual vs sistem | ⬜ |

---

## Catatan & hambatan

- **Tahap 1 (bagian Next.js) sudah jalan (2026-07-13):** project Next.js App Router + TypeScript +
  Tailwind v4 sudah di-bootstrap di root repo. Design system dari Claude Design (`design-system/`)
  sudah diporting ke kode aplikasi: token warna/tipografi/spacing/motion di `src/styles/pancokuy/`
  + `src/app/globals.css`, logo di `public/logo/`, 8 komponen dasar (Button, Badge, Card, Modal,
  Notification, Checkbox, Field, Input/Textarea/Select) di `src/components/ui/*.tsx`. Halaman
  `/` sekarang menampilkan showcase komponen ini (bukan fitur produk — itu Tahap 3+).
  `npm run build` dan `npm run dev` sudah diverifikasi jalan tanpa error.
- **Prisma schema (bagian lain Tahap 1) belum dikerjakan** — `prisma/schema.prisma`, migration
  awal, dan seed `wp_criteria`/`wilayah_kota_berbatasan` masih harus dibuat sebelum Tahap 1 resmi
  selesai.
- **KP-005 belum dikonfirmasi ke dosen pembimbing.** Fitur inbox terima/tolak sparing adalah
  deviasi dari 24 skenario BAB 3.5.1 (walau kolom `status` sudah ada di skema ACC). Bawa ke
  bimbingan berikutnya. Kalau ditolak, Tahap 9 dicoret.
- **Bobot awal WP (`nilai_bobot_awal`) belum ada.** Nilainya berasal dari wawancara terstruktur
  *expert judgement* dengan senior/pengurus komunitas (BAB 3.1.3) — belum dilakukan. Sampai data
  itu masuk, seed `wp_criteria` pakai nilai placeholder (jelas ditandai sementara), dan angkanya
  **tidak boleh** dipakai di laporan.
- **Data `wilayah_kota_berbatasan` belum dikumpulkan.** Dibutuhkan untuk skor C1 = 3. Minimal
  cukup mencakup kota-kota di wilayah komunitas yang jadi objek penelitian (Jawa Timur).
