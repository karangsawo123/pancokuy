# Decision Log — PancoKuy

Catatan keputusan untuk hal-hal yang **tidak diatur** atau **ambigu** di proposal
([docs/proposal/](proposal/)). Proposal tetap sumber kebenaran; file ini hanya mengisi celah
dan mencatat deviasi implementasi beserta alasannya.

Format tiap entri: Konteks → Keputusan → Alasan → Dampak.
Keputusan yang sudah ditetapkan **tidak diubah diam-diam** — kalau berubah, tulis entri baru
yang menggantikan (dan tandai entri lama sebagai *Digantikan oleh KP-xxx*).

---

## KP-001 — Tech stack: Next.js, bukan Laravel

**Tanggal:** 2026-07-12 · **Status:** Ditetapkan

**Konteks.** Proposal tidak mengunci teknologi (BAB 3.1.4 hanya mensyaratkan "berbasis web",
"responsif", dan "DBMS relasional"). Versi awal `CLAUDE.md` sempat merekomendasikan Laravel +
Blade + MySQL sebagai default.

**Keputusan.** Stack final: **Next.js (App Router) + TypeScript + Tailwind CSS + Prisma ORM +
PostgreSQL + Auth.js v5.** Rekomendasi Laravel dibatalkan dan dihapus dari `CLAUDE.md`.

**Alasan.** Ditetapkan oleh peneliti. Seluruh syarat non-fungsional BAB 3.1.4 tetap terpenuhi:
web, responsif, dan PostgreSQL adalah DBMS relasional.

**Dampak.** Migrasi skema memakai `prisma migrate`. Nama tabel & kolom di database wajib tetap
snake_case Bahasa Indonesia persis seperti BAB 3.3.3 — dipaksakan lewat `@map` / `@@map` di
Prisma schema, karena penguji akan mencocokkan struktur DB dengan proposal.

---

## KP-002 — Definisi "profil lengkap": style dominan tidak wajib

**Tanggal:** 2026-07-12 · **Status:** Ditetapkan

**Konteks.** Ada inkonsistensi di proposal. BAB 3.1.4 menyebut syarat akses fitur adalah
6 kriteria WP + minimal satu basecamp aktif **"serta mengisi informasi profil pendukungnya"**,
sedangkan BAB 3.2.2 (flowchart), BAB 3.3.2 (catatan kelengkapan profil), dan BAB 3.4.3 hanya
menyebut 6 kriteria WP + minimal satu basecamp aktif.

**Keputusan.** Profil dianggap **lengkap** jika: seluruh 6 kriteria WP di `profil_atlet` terisi
**DAN** terdapat minimal satu baris `is_aktif = true` di `profil_atlet_basecamp`.
`style_dominan` **tidak** menjadi syarat kelengkapan.

**Alasan.** Definisi ini dipakai di tiga tempat (termasuk flowchart yang menjadi acuan
implementasi) melawan satu tempat. Selain itu `style_dominan` punya nilai enum
`'Belum Teridentifikasi'` yang secara desain memang mengakomodasi atlet yang belum tahu
style-nya — mewajibkannya jadi tidak bermakna. Style juga bukan kriteria WP, sehingga tidak
memengaruhi kelayakan perhitungan.

**Dampak.** Validasi form profil dan *guard* akses Sparing Matcher / Challenge Mode tidak
memeriksa `style_dominan`. Frasa di BAB 3.1.4 diperlakukan sebagai kelonggaran bahasa.

---

## KP-003 — Skor C1 diambil dari kombinasi terbaik seluruh basecamp aktif

**Tanggal:** 2026-07-12 · **Status:** Ditetapkan

**Konteks.** BAB 3.1.2 menyebut C1 menilai kesesuaian "*basecamp* utama", sementara BAB 3.3.2
dan BAB 3.5.2 tegas menyatakan sistem membandingkan **seluruh** basecamp aktif pengguna
terhadap **seluruh** basecamp aktif calon lawan, lalu mengambil **skor lokasi terbaik**.

**Keputusan.** Pakai aturan BAB 3.3.2: bandingkan semua kombinasi pasangan basecamp aktif
(user × lawan), hitung skor C1 tiap pasangan (5/4/3/2/1), ambil **nilai maksimum** sebagai
input C1. Tidak ada konsep "basecamp utama" dan **tidak ada kolom baru** di `profil_atlet_basecamp`.

**Alasan.** Skema BAB 3 sengaja memakai tabel pivot many-to-many karena atlet realistis berlatih
di lebih dari satu basecamp. Menambah flag "utama" berarti mengubah skema yang sudah ACC.
Selain itu BAB 3.5.2 secara eksplisit mewajibkan data dummy memuat atlet dengan >1 basecamp
aktif agar logika "skor terbaik" ini teruji — jadi aturan inilah yang dimaksud proposal.

**Dampak.** Frasa "basecamp utama" di BAB 3.1.2 diperlakukan sebagai kelonggaran bahasa, bukan
aturan. Perhitungan C1 wajib menelusuri seluruh kombinasi.

---

## KP-004 — Hanya admin yang mengelola data basecamp

**Tanggal:** 2026-07-12 · **Status:** Ditetapkan

**Konteks.** Use Case BAB 3.2.4 hanya memberi hak "mengelola data komunitas atau *basecamp*"
kepada aktor Admin, tetapi tabel `basecamp` memiliki kolom `created_by` FK ke `users.id`
sehingga secara teknis siapa pun bisa jadi pembuatnya.

**Keputusan.** CRUD basecamp **hanya** untuk `role = 'admin'`. Kolom `created_by` selalu berisi
id admin yang membuat. Anggota hanya **memilih** basecamp yang sudah terdaftar saat mengisi
profil (mengisi `profil_atlet_basecamp`), tidak bisa membuat basecamp baru.

**Alasan.** Sesuai use case yang sudah ACC. Membuka pembuatan basecamp untuk anggota akan
menambah fitur, halaman, dan skenario uji di luar 24 skenario BAB 3.5.1.

**Dampak.** Skenario uji no. 22 (admin menambah basecamp) tetap relevan. Perlu penanganan UX:
jika basecamp anggota belum terdaftar, dia menghubungi admin — di luar sistem.

---

## KP-005 — Inbox sparing: lawan dapat menerima/menolak permintaan

**Tanggal:** 2026-07-12 · **Status:** Ditetapkan · **⚠ Deviasi dari BAB 3.5.1**

**Konteks.** Tabel `sparing_requests` (BAB 3.3.3) memiliki kolom `status` ENUM
(`pending`, `accepted`, `rejected`, `completed`, `cancelled`) dengan default `pending`. Namun
tidak ada satu pun use case (BAB 3.2.4) maupun skenario black-box (24 skenario BAB 3.5.1) yang
menjelaskan siapa yang mengubah status tersebut. Secara harfiah, proposal hanya menuntut
pengajuan sparing **dicatat**.

**Keputusan.** Bangun halaman **Permintaan Sparing** bagi anggota: melihat permintaan masuk lalu
**menerima** (`accepted`) atau **menolak** (`rejected`), serta membatalkan permintaan yang ia
kirim sendiri (`cancelled`). Status `completed` ditandai setelah sparing terlaksana.

**Alasan.** Kolom `status` beserta seluruh nilai enum-nya **sudah ada di skema BAB 3 yang
di-ACC** — artinya alur ini memang diniatkan proposal, hanya tidak dijabarkan di use case.
Tanpa fitur ini, kolom `status` akan selamanya bernilai `pending` dan skema jadi tidak masuk
akal saat diperiksa penguji. Ini **bukan** fitur di luar batasan masalah BAB 1.3 (yang dilarang
adalah tracking latihan, panduan pemula, ranking supermatch, dan edukasi cedera — bukan ini).

**Dampak.** Skenario uji **25–27** ditambahkan di [pengujian.md](pengujian.md) pada bagian
terpisah, sehingga 24 skenario asli BAB 3.5.1 tetap utuh dan mudah dicocokkan penguji dengan
proposal. **Wajib dikonsultasikan ke dosen pembimbing** saat bimbingan berikutnya — bila
pembimbing menolak, fitur ini dicabut dan status dibiarkan `pending` (entri ini diganti).

---

## KP-006 — Autentikasi: Auth.js v5 dengan Credentials provider

**Tanggal:** 2026-07-12 · **Status:** Ditetapkan

**Konteks.** Skema BAB 3.3.3 menyimpan `password_hash` di tabel `users` dan BAB 3.4.2 merancang
form registrasi/login dengan email + kata sandi. Auth.js secara default mendorong OAuth dan
tabel `Account`/`Session` miliknya sendiri.

**Keputusan.** Pakai **Credentials provider** Auth.js v5 dengan strategi sesi **JWT**,
memverifikasi email + password terhadap kolom `password_hash` (hash memakai bcrypt/argon2).
**Tidak** memakai Prisma Adapter bawaan Auth.js, sehingga tidak ada tabel tambahan
(`Account`, `Session`, `VerificationToken`) di luar skema BAB 3.

**Alasan.** Skema DB sudah ACC dan hanya berisi 8 tabel. Menambah tabel bawaan Auth.js akan
membuat struktur DB tidak cocok dengan BAB 3.3 saat diperiksa penguji. Sesi JWT membuat tabel
`Session` tidak diperlukan.

**Dampak.** `role` (`anggota`/`admin`) dibawa di dalam JWT/session callback untuk otorisasi.
Tidak ada login sosial (Google dsb.) — memang tidak ada di rancangan proposal.
