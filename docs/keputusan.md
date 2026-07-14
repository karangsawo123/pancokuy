# Decision Log — PancoKuy

Catatan keputusan untuk hal-hal yang **tidak diatur** atau **ambigu** di proposal
([docs/proposal/](proposal/)). Proposal tetap sumber kebenaran; file ini hanya mengisi celah
dan mencatat deviasi implementasi beserta alasannya.

Format tiap entri: Konteks → Keputusan → Alasan → Dampak.
Keputusan yang sudah ditetapkan **tidak diubah diam-diam** — kalau berubah, tulis entri baru
yang menggantikan (dan tandai entri lama sebagai *Digantikan oleh KP-xxx*).

---

## KP-001 — Tech stack: Next.js + Supabase + shadcn/ui

**Tanggal:** 2026-07-12 (ditetapkan) · 2026-07-14 (diperbarui) · **Status:** Ditetapkan

**Konteks.** Proposal tidak mengunci teknologi (BAB 3.1.4 hanya mensyaratkan "berbasis web",
"responsif", dan "DBMS relasional"). Stack awal sempat menggunakan Prisma ORM + PostgreSQL
manual + Auth.js v5, namun setelah evaluasi diganti ke stack yang lebih mudah untuk pemula
dan lebih mudah di-deploy.

**Keputusan.** Stack final: **Next.js (App Router) + TypeScript + Tailwind CSS v4 +
shadcn/ui + Supabase (PostgreSQL + Auth) + Vercel (deploy).**

**Alasan.** Seluruh syarat non-fungsional BAB 3.1.4 tetap terpenuhi: web, responsif, dan
Supabase menggunakan PostgreSQL yang merupakan DBMS relasional. Supabase Auth menyimpan
tabel di schema `auth` yang terpisah dari schema `public` — tidak menambah tabel di luar
8 tabel skema BAB 3. Deploy ke Vercel lebih sederhana: 1 repo, 1 push, tidak perlu
mendeploy frontend dan backend secara terpisah.

**Dampak.** Migrasi skema memakai Supabase Migration (SQL). Nama tabel & kolom di database
wajib tetap snake_case Bahasa Indonesia persis seperti BAB 3.3.3 — dibuat langsung di
Supabase schema `public` dengan nama tersebut.
Jangan mengusulkan Laravel/PHP/MySQL/Prisma/Auth.js — keputusan ini sudah final.

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

## KP-006 — Autentikasi: Supabase Auth dengan email + password

**Tanggal:** 2026-07-12 (ditetapkan Auth.js) · 2026-07-14 (diperbarui ke Supabase Auth) · **Status:** Ditetapkan

**Konteks.** Skema BAB 3.3.3 menyimpan `password_hash` di tabel `users` dan BAB 3.4.2 merancang
form registrasi/login dengan email + kata sandi. Stack sebelumnya memakai Auth.js v5 dengan
Credentials provider dan JWT — namun lebih kompleks untuk pemula dan memerlukan konfigurasi
tambahan yang tidak perlu.

**Keputusan.** Pakai **Supabase Auth** dengan email + password. Tabel autentikasi Supabase
berada di schema `auth` (terpisah dari schema `public`), sehingga **tidak menambah satu pun
tabel di luar 8 tabel skema BAB 3**. Data `role` (`anggota`/`admin`) tetap disimpan di kolom
`role` di tabel `users` di schema `public`, disinkronkan dengan `auth.users` via
`user_id` foreign key.

**Alasan.** Supabase Auth terintegrasi langsung dengan database Supabase, lebih mudah dikonfigurasi
dan di-deploy. Tidak ada tabel tambahan di schema `public` yang bisa membingungkan penguji.
Row Level Security (RLS) Supabase bisa dimanfaatkan untuk kontrol akses data di level DB.

**Dampak.** `role` dibaca dari tabel `users` di schema `public` setelah login, bukan dari JWT
token bawaan. Tidak ada login sosial (Google dsb.) — memang tidak ada di rancangan proposal.
Tidak ada tabel `Account`, `Session`, atau `VerificationToken` di schema `public`.

---

## KP-007 — Bentuk aplikasi: web biasa dibangun sebagai PWA (bukan native app)

**Tanggal:** 2026-07-14 · **Status:** Ditetapkan

**Konteks.** Proposal (BAB 3.1.4) hanya mensyaratkan "berbasis web" dan "responsif", tidak
menyebut web vs mobile app sama sekali — proposal juga belum di-ACC dosen pembimbing sehingga
poin ini masih terbuka untuk didiskusikan. Muncul kebutuhan agar sistem tidak berhenti jadi
sekadar syarat sidang, tapi juga benar-benar dipakai komunitas panco di lapangan, yang biasanya
mengharapkan pengalaman seperti "app" (ikon di HP, notifikasi).

**Keputusan.** Tetap dibangun sebagai **web app (Next.js, sesuai KP-001)**, bukan native app
(React Native/Flutter), tapi dilengkapi kapabilitas **PWA (Progressive Web App)**: `manifest.json`
+ service worker sehingga bisa di-*install* ke home screen HP, berjalan full-screen tanpa chrome
browser, mendukung push notification, dan caching dasar untuk koneksi tidak stabil.

**Alasan.** Native app akan menambah scope besar (stack baru, proses rilis ke app store,
pengujian multi-device) yang berisiko mengganggu linimasa skripsi yang dikerjakan solo, padahal
kontribusi akademik (algoritma WP) tidak bergantung pada platform yang dipakai. PWA memberi
sebagian besar pengalaman "app" (ikon, notifikasi, akses cepat) tanpa mengubah keputusan stack
di KP-001 dan tanpa hambatan instalasi lewat app store — pengguna komunitas cukup buka link,
tanpa dipaksa install juga tetap bisa.

**Dampak.** Tidak ada perubahan pada stack di KP-001 (tetap Next.js + Supabase + shadcn/ui).
Perlu ditambahkan `manifest.json`, service worker, dan ikon PWA di tahap build UI. Skenario
push notification (misal status sparing berubah) dapat memakai Web Push API — dukungan penuh
di Android, dukungan terbatas di iOS (Safari 16.4+).
