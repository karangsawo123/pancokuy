# PancoKuy — Platform Digital Komunitas Arm Wrestling

Konteks ini WAJIB dipatuhi di setiap sesi coding. Proyek ini adalah implementasi dari
proposal skripsi Teknik Informatika S1 (Universitas Muhammadiyah Gresik). Semua fitur
yang dibangun harus sesuai dengan batasan proposal — JANGAN menambah fitur di luar scope
tanpa konfirmasi ke user, karena akan menyulitkan sidang/bimbingan.

> **Awali setiap sesi dengan membaca `docs/progres.md`** (status "sudah sampai mana") dan
> `docs/keputusan.md` (keputusan yang sudah diambil di sesi sebelumnya). Lihat §9.

## 1. Ringkasan Proyek

PancoKuy adalah platform web komunitas arm wrestling (panco) yang mengatasi masalah:
- Info basecamp/komunitas tersebar dan sulit dicari
- Kontak senior/pengurus berliku (numpuk di chat WA)
- Pencarian lawan sparing masih subjektif/visual, berisiko cedera kalau pemula
  melawan pro tanpa terkontrol

Fokus riset: penerapan algoritma **Weighted Product (WP)** pada fitur **Sparing Matcher**
untuk merekomendasikan lawan sparing yang seimbang secara terukur.

## 2. Batasan Scope — JANGAN DILANGGAR

Ini fondasi proposal yang tidak boleh diubah, karena proposal sudah fix di kampus:

- WP **HANYA** dipakai di fitur Sparing Matcher. Jangan terapkan WP ke fitur lain.
- **Challenge Mode** = pencarian manual lewat direktori anggota. Tidak ada perhitungan
  WP sama sekali di sini (`wp_score` selalu NULL untuk source ini).
- **Style dominan** (Toproll/Hook/Press/Kingsmove) TIDAK masuk kriteria WP. Ini murni
  data profil/informasi tambahan, dipakai untuk filter di Challenge Mode saja.
- Fitur *tracking latihan, ranking Elo, panduan pemula, edukasi cedera* = **BUKAN**
  bagian dari scope ini. Jangan dibangun kecuali user eksplisit minta sebagai
  pengembangan lanjutan di luar skripsi.
- Data pengujian WP pakai data dummy/simulasi, bukan data populasi riil.

## 3. Fitur Utama yang Dibangun (Scope Proposal)

1. Direktori basecamp/komunitas (publik untuk pengunjung, lebih lengkap untuk member)
2. Kontak pengurus/senior via WhatsApp (link CTA di halaman basecamp)
3. Jadwal latihan & event (bisa umum atau terikat ke basecamp tertentu)
4. Profil atlet/member (6 kriteria WP + style dominan sebagai info tambahan)
5. **Sparing Matcher** — rekomendasi otomatis via algoritma WP
6. **Challenge Mode** — pencarian manual di direktori anggota + filter
7. Panel admin (kelola basecamp, event, profil anggota, bobot kriteria WP)

## 4. Algoritma Weighted Product (WP) — Detail Krusial

### Pendekatan: Konversi Skor Kecocokan (bukan delta mentah)
Semua kriteria dihitung sebagai **selisih/delta** antara profil user aktif vs calon lawan,
lalu delta itu dikonversi ke **skor kecocokan skala 1–5**. Karena sudah dikonversi ke skor
kecocokan, **semua 6 kriteria diperlakukan sebagai kriteria Benefit** (pangkat positif),
tidak ada kriteria Cost dalam rumus WP di sini.

### 6 Kriteria & Aturan Konversi Skor

| Kode | Kriteria | Sumber Data | Aturan Skor (5=sangat cocok ... 1=tidak cocok) |
|---|---|---|---|
| C1 | Lokasi Latihan Aktif | `profil_atlet_basecamp` + `basecamp` + `wilayah_kota_berbatasan` | 5=basecamp sama, 4=beda basecamp kota sama, 3=kota berbatasan, 2=beda kota 1 provinsi, 1=beda provinsi. **Ambil skor terbaik** dari kombinasi seluruh basecamp aktif user vs seluruh basecamp aktif lawan. |
| C2 | Berat Badan | `profil_atlet.berat_badan` | Selisih kg: 5=0–2, 4=>2–4, 3=>4–7, 2=>7–10, 1=>10 |
| C3 | Lama Aktif Latihan | dihitung dinamis dari `bulan_mulai_latihan` + `tahun_mulai_latihan` (JANGAN simpan sebagai angka statis) | Selisih bulan: 5=0–6, 4=>6–12, 3=>12–24, 2=>24–36, 1=>36+ |
| C4 | Frekuensi Latihan | `profil_atlet.frekuensi_latihan` (sesi/minggu) | Selisih sesi: 5=0, 4=1, 3=2, 2=3, 1=>3 |
| C5 | Tangan Sparing | `profil_atlet.tangan_sparing` (Kanan/Kiri/Keduanya) | 5=cocok (mis. Kanan-Kanan, Kiri-Keduanya), 1=tidak cocok (mis. Kanan-Kiri). Hanya biner, tidak ada skor 2,3,4. |
| C6 | Level Kemampuan | `profil_atlet.level_kemampuan` (1=Pemula,2=SemiPro,3=Pro) | Selisih level: 5=sama(0), 3=beda 1 tingkat, 1=beda 2 tingkat. Hanya skor 5,3,1 — tidak ada 4,2. |

### Rumus Perhitungan
1. Normalisasi bobot: `w_j = W_j / Σ W_j` (bobot awal dari `wp_criteria.nilai_bobot_awal`,
   hasil expert judgement wawancara senior komunitas — bukan ditentukan sepihak oleh kode)
2. Vektor S untuk tiap kandidat lawan: `S_i = Π (x_ij ^ w_j)` untuk j=1..6, semua pangkat positif (benefit)
3. Vektor V (preferensi relatif): `V_i = S_i / Σ S_i`
4. Urutkan V dari terbesar ke terkecil → itu ranking rekomendasi

### Aturan Penting Implementasi WP
- Perhitungan WP **real-time**, tidak disimpan sebagai riwayat ranking permanen.
- Yang disimpan ke DB hanya saat user klik "Ajukan Sparing" → masuk ke `sparing_requests`.
- Kalau admin update `nilai_bobot_awal` salah satu kriteria, seluruh `bobot_normalisasi`
  di tabel `wp_criteria` harus dihitung ulang otomatis agar tetap Σw_j = 1.
- Profil dianggap "lengkap" (syarat wajib untuk pakai Sparing Matcher & Challenge Mode)
  jika: 6 kriteria WP di `profil_atlet` terisi **DAN** minimal 1 baris aktif
  (`is_aktif=true`) di `profil_atlet_basecamp`.
- User tidak boleh mengajukan sparing ke dirinya sendiri (validasi di level aplikasi).
- C1 TIDAK memakai konsep "basecamp utama" (frasa di BAB 3.1.2 hanya kelonggaran bahasa).
  Bandingkan SELURUH kombinasi basecamp aktif user × basecamp aktif lawan, ambil skor
  tertinggi. Tidak ada kolom/flag "utama" di `profil_atlet_basecamp`. Lihat KP-003.
- `style_dominan` BUKAN syarat profil lengkap (boleh 'Belum Teridentifikasi'). Lihat KP-002.

## 5. Skema Database (Final dari BAB 3 — ikuti persis, jangan improvisasi nama kolom)

```
users
  id PK, nama, email UNIQUE, password_hash, role ENUM('anggota','admin'),
  created_at, updated_at

profil_atlet
  id PK, user_id FK->users.id UNIQUE,
  berat_badan DECIMAL(5,2),
  bulan_mulai_latihan TINYINT, tahun_mulai_latihan SMALLINT,
  frekuensi_latihan TINYINT,
  style_dominan ENUM('Toproll','Hook','Press','Kingsmove','Belum Teridentifikasi'),  -- non-WP, info saja
  tangan_sparing ENUM('Kanan','Kiri','Keduanya'),
  level_kemampuan TINYINT,  -- 1=Pemula, 2=Semi Pro, 3=Pro
  created_at, updated_at

basecamp
  id PK, nama_basecamp, alamat, kota, provinsi, kontak_pengurus,
  created_by FK->users.id, created_at, updated_at

profil_atlet_basecamp   -- pivot many-to-many
  id PK, profil_atlet_id FK, basecamp_id FK, is_aktif BOOLEAN,
  created_at, updated_at
  UNIQUE(profil_atlet_id, basecamp_id)

wilayah_kota_berbatasan   -- referensi utk skor C1
  id PK, kota_a, kota_b, provinsi
  -- cek dua arah: (kota_a=X,kota_b=Y) ATAU (kota_a=Y,kota_b=X)

events
  id PK, basecamp_id FK->basecamp.id NULLABLE, judul_event, jenis_event,
  tanggal_event DATE, waktu_mulai TIME, waktu_selesai TIME NULLABLE,
  lokasi, deskripsi, created_by FK->users.id, created_at, updated_at

wp_criteria
  id PK, kode_kriteria UNIQUE (C1..C6), nama_kriteria,
  nilai_bobot_awal DECIMAL, bobot_normalisasi DECIMAL,
  updated_by FK->users.id NULLABLE, updated_at
  -- style dominan TIDAK ada di tabel ini

sparing_requests
  id PK, requester_id FK->users.id, opponent_id FK->users.id,
  source ENUM('sparing_matcher','challenge_mode'),
  wp_score DECIMAL(10,6) NULLABLE,  -- null jika source=challenge_mode
  status ENUM('pending','accepted','rejected','completed','cancelled') DEFAULT 'pending',
  message TEXT NULLABLE, created_at, updated_at
```

## 6. Tech Stack — SUDAH FIX, JANGAN DIUBAH

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Komponen UI**: shadcn/ui (copy-paste components berbasis Radix UI)
- **Database**: PostgreSQL via **Supabase** (managed cloud PostgreSQL)
- **Auth**: **Supabase Auth** — email + password, sesi dikelola Supabase.
  Tabel auth Supabase ada di schema `auth` yang terpisah dari schema `public`,
  sehingga tidak menabrak 8 tabel skema BAB 3. Lihat KP-006 di `docs/keputusan.md`.
- **Query DB**: Supabase client (`@supabase/ssr` + `@supabase/supabase-js`) + generated types
- **Deploy**: Vercel (frontend + API Route Handlers) — 1 repo, 1 push, langsung jalan

Jangan mengusulkan atau memakai Laravel/PHP/MySQL/Prisma/Auth.js — keputusan ini sudah final (KP-001, KP-006).

## 7. Konvensi Kode
- Nama tabel \& kolom **di database** pakai snake_case Bahasa Indonesia PERSIS seperti skema
  di §5 (dosen/penguji akan cek kesesuaian dengan BAB 3 proposal — jangan diterjemahkan ke
  Inggris). Di Supabase, buat tabel di schema `public` sesuai nama tersebut persis.
- Setiap perubahan schema dilakukan lewat **Supabase Dashboard → SQL Editor** atau
  **Supabase CLI** (`supabase migration new`). Ada file migration SQL-nya — jangan ubah
  struktur DB tanpa migration.
- Setiap fitur baru: schema/migration SQL → Supabase type generation → query layer → route/server action → UI
- Logic algoritma WP ditulis sebagai **modul murni** di `src/lib/wp/` — fungsi konversi skor
  dan perhitungan S/V menerima data biasa sebagai argumen dan TIDAK boleh menyentuh Supabase
  client atau session. Pengambilan data dari DB dilakukan di lapisan pemanggil. Ini syarat
  supaya perhitungan bisa diuji langsung dengan data dummy untuk BAB 3.5.2.
- Perhitungan WP wajib memakai `bobot_normalisasi` dari tabel `wp_criteria` (dari DB),
  bukan angka yang di-hardcode di kode.
- Gunakan `@supabase/ssr` untuk server-side queries (Server Components, Route Handlers).
  Gunakan `@supabase/supabase-js` untuk client-side (jika diperlukan).

## 8. Urutan Pembangunan yang Disarankan
Status terkini tiap tahap ada di `docs/progres.md` — perbarui file itu setiap kali selesai.
1. Setup Next.js + TS + Tailwind; `prisma/schema.prisma` seluruh 8 tabel + migration awal
   + seed `wp_criteria` & `wilayah_kota_berbatasan` (schema dulu, sebelum UI apapun)
2. Auth (register/login) + role admin/anggota
3. CRUD Basecamp (admin-only, lihat KP-004) + halaman direktori basecamp (publik)
4. CRUD Events + halaman jadwal/event
5. Form profil atlet (6 kriteria WP + basecamp aktif + style dominan) + validasi kelengkapan
6. Direktori anggota + Challenge Mode (pencarian manual + ajukan sparing)
7. Modul WP di `src/lib/wp/` (logic murni, test dengan data dummy dulu sebelum ke UI)
8. Halaman Sparing Matcher (pakai modul WP) + ajukan sparing
9. Inbox permintaan sparing — terima/tolak/batal (KP-005, menunggu ACC pembimbing)
10. Panel admin (kelola basecamp/event/profil/bobot WP kriteria)
11. Testing: black-box scenario (24 skenario di BAB 3.5.1) + uji kesesuaian WP manual vs sistem (BAB 3.5.2)

## 9. Peta Dokumentasi

| File | Perannya |
|---|---|
| `docs/proposal/` (BAB 1–3) | Sumber kebenaran akademik. **BEKU** — jangan pernah diedit. Semua aturan bisnis, rumus, dan skema berasal dari sini. |
| `CLAUDE.md` (file ini) | Sumber kebenaran operasional: ringkasan aturan bisnis + skema + konvensi kode. Tidak boleh bertentangan dengan proposal. |
| `docs/keputusan.md` | Decision log (KP-001 dst). Sumber kebenaran untuk segala hal yang proposal tidak jawab atau jawab secara ambigu. **Kalau bingung dan proposal diam, jawabannya di sini.** |
| `docs/progres.md` | Status pembangunan. Baca di awal sesi, perbarui di akhir sesi. |
| `docs/pengujian.md` | Lembar kerja 24 skenario black-box + uji kesesuaian WP (bahan BAB 4). |

Kalau menemukan ambiguitas baru di proposal: **tanya user**, lalu catat jawabannya sebagai
entri KP baru di `docs/keputusan.md`. Jangan berasumsi diam-diam.
