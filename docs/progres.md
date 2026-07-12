# Progres Pembangunan — PancoKuy

> **Baca file ini di awal setiap sesi coding.** Ini satu-satunya sumber status "sudah sampai
> mana". Perbarui setiap kali menyelesaikan atau memulai sebuah tahap.

**Terakhir diperbarui:** 2026-07-12
**Fase sekarang:** Tahap 0 — Fondasi dokumentasi ✅ selesai
**Berikutnya:** Tahap 1 — Setup project Next.js + Prisma schema

---

## Checklist tahap

Urutan mengikuti `CLAUDE.md` §8. Status: ⬜ belum · 🟡 sedang dikerjakan · ✅ selesai

| # | Tahap | Status |
| :--- | :--- | :--- |
| 0 | Fondasi dokumentasi & struktur repo (README, docs/, decision log, CLAUDE.md) | ✅ |
| 1 | Setup project Next.js + TypeScript + Tailwind; Prisma schema seluruh 8 tabel + migration awal + seed `wp_criteria` & `wilayah_kota_berbatasan` | ⬜ |
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

- **KP-005 belum dikonfirmasi ke dosen pembimbing.** Fitur inbox terima/tolak sparing adalah
  deviasi dari 24 skenario BAB 3.5.1 (walau kolom `status` sudah ada di skema ACC). Bawa ke
  bimbingan berikutnya. Kalau ditolak, Tahap 9 dicoret.
- **Bobot awal WP (`nilai_bobot_awal`) belum ada.** Nilainya berasal dari wawancara terstruktur
  *expert judgement* dengan senior/pengurus komunitas (BAB 3.1.3) — belum dilakukan. Sampai data
  itu masuk, seed `wp_criteria` pakai nilai placeholder (jelas ditandai sementara), dan angkanya
  **tidak boleh** dipakai di laporan.
- **Data `wilayah_kota_berbatasan` belum dikumpulkan.** Dibutuhkan untuk skor C1 = 3. Minimal
  cukup mencakup kota-kota di wilayah komunitas yang jadi objek penelitian (Jawa Timur).
