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

---

## KP-008 — Struktur tabel `users`: `id` = `auth.users.id`, `password_hash` dihapus

**Tanggal:** 2026-07-15 · **Status:** Ditetapkan

**Konteks.** Skema `users` di BAB 3.3.3 (CLAUDE.md §5) mencantumkan kolom `password_hash`,
peninggalan rancangan lama sebelum pindah ke Supabase Auth (KP-006). KP-006 menyebut `role`
disinkronkan dengan `auth.users` "via `user_id` foreign key", tapi tidak menegaskan bentuk
pastinya — apakah `public.users` punya PK sendiri + kolom `user_id` terpisah, atau `id`-nya
langsung sama dengan `auth.users.id`.

**Keputusan.** `public.users.id` adalah UUID yang sama dengan `auth.users.id` (sekaligus PK
dan FK ke `auth.users(id) ON DELETE CASCADE`). Kolom `password_hash` **dihapus** dari skema —
password sepenuhnya dikelola Supabase Auth di `auth.users.encrypted_password`, sehingga kolom
itu tidak akan pernah terisi dan membingungkan penguji.

**Alasan.** Pola "tabel profil dengan `id` = `auth.users.id`" adalah pola standar Supabase
(lebih sederhana daripada punya dua UUID + kolom relasi terpisah). Menyimpan `password_hash`
yang sengaja dikosongkan selamanya adalah dead column yang tidak bisa dijelaskan ke penguji
saat cek kesesuaian BAB 3.3.3 — menghapusnya lebih defensif daripada mempertahankan kolom mati.

**Dampak.** Migration `create_initial_schema` mendefinisikan `users.id` sebagai
`uuid primary key references auth.users(id) on delete cascade`, tanpa kolom `password_hash`.
Baris `public.users` dibuat lewat aplikasi (INSERT oleh user sendiri saat registrasi, RLS
`with check (id = auth.uid())`) — detail alur registrasi (Auth.js/Supabase Auth sign-up +
insert nama) menyusul di Tahap 2, bukan bagian migration schema ini. Kalau nanti ditemukan
BAB 3.3.3 memang mewajibkan kolom `password_hash` secara harfiah untuk kebutuhan sidang, ini
bisa didiskusikan ulang dengan dosen pembimbing dan entri ini diganti.

---

## KP-009 — Panel admin TIDAK punya fitur "jadikan admin"; promosi role manual lewat Supabase Studio

**Tanggal:** 2026-07-15 · **Status:** Ditetapkan

**Konteks.** Use Case Admin di BAB 3.2.4 (baris 176–181) hanya mendaftar 4 hak akses: kelola
basecamp, kelola jadwal/event, **kelola data anggota dan profil atlet**, dan kelola bobot WP.
Tidak ada use case "admin mengangkat anggota lain jadi admin". Frasa "mengelola data anggota"
ambigu — bisa dibaca sebatas edit `profil_atlet` (6 kriteria WP dkk), atau juga mencakup kolom
`role` di tabel `users`. Pertanyaan ini muncul karena migration schema (KP-008) sudah
mengizinkan admin mengubah `role` user manapun di level RLS (`users_update_self_or_admin` +
trigger `prevent_role_change_by_non_admin` yang mengizinkan perubahan role kalau pelakunya
admin).

**Keputusan.** Kapabilitas ubah `role` tetap ada di RLS (untuk fleksibilitas/jaga-jaga), **tapi
tidak dibangun jadi fitur UI** di Panel Admin (Tahap 10). Panel Admin hanya mencakup 4 hal
persis sesuai BAB 3.2.4: basecamp, event, profil anggota (`profil_atlet` + `profil_atlet_basecamp`),
dan bobot WP. Kalau perlu menambah admin baru, dilakukan manual lewat Supabase Studio SQL Editor
(`UPDATE users SET role='admin' WHERE id = ...`), di luar sistem.

**Alasan.** Menambah fitur "promote to admin" di UI adalah penambahan use case yang tidak ada
di BAB 3.2.4 maupun 24 skenario black-box BAB 3.5.1 — persis jenis penambahan scope yang harus
dihindari tanpa konfirmasi eksplisit ke dosen pembimbing (beda dengan KP-005 yang punya jejak di
skema `status` ENUM; di sini tidak ada jejak skema serupa untuk "role management" sebagai fitur).
Operasi manual lewat Studio sudah cukup karena promosi admin adalah kejadian langka yang
dilakukan sendiri oleh pemilik sistem, bukan aktivitas rutin yang perlu diuji di skenario
black-box.

**Dampak.** Halaman Panel Admin (Tahap 10) tidak menampilkan kontrol ubah role. RLS/trigger di
`create_initial_schema.sql` tetap dipertahankan apa adanya (tidak perlu diubah). Kalau ke depan
dosen pembimbing memang minta fitur ini, bisa diajukan sebagai deviasi baru mirip KP-005.

---

## KP-010 — Registrasi tanpa verifikasi email (`enable_confirmations = false`)

**Tanggal:** 2026-07-15 · **Status:** Ditetapkan

**Konteks.** Supabase Auth secara default mewajibkan user klik link konfirmasi di email sebelum
bisa login. Skenario black-box #1 dan #3 (BAB 3.5.1) tidak menyebut langkah verifikasi sama
sekali — "Akun berhasil dibuat, pengguna diarahkan ke halaman *login* atau halaman profil" dan
login langsung berhasil dengan kredensial valid.

**Keputusan.** Verifikasi email **dimatikan** (`enable_confirmations = false` di
`supabase/config.toml`, sudah di-push ke project via `supabase config push`). Setelah submit
form registrasi, akun langsung aktif dan bisa login tanpa langkah tambahan.

**Alasan.** Mengikuti skenario black-box secara harfiah supaya hasil pengujian BAB 3.5.1 cocok
persis dengan rancangan. Trade-off yang disadari: sistem tidak membuktikan kepemilikan email
pendaftar (orang bisa daftar pakai email siapa pun). Untuk skala aplikasi skripsi/komunitas kecil
ini dianggap dapat diterima; bisa dinyalakan lagi kapan saja lewat `config.toml` tanpa mengubah
skema atau kode aplikasi kalau di kemudian hari dianggap perlu.

**Dampak.** `src/lib/auth/actions.ts` (`registerAction`) mengasumsikan `supabase.auth.signUp()`
langsung mengembalikan sesi aktif tanpa status "menunggu konfirmasi". Kalau pengaturan ini
diaktifkan lagi di masa depan, alur registrasi perlu ditambah halaman "cek email kamu" dan
`registerAction` perlu menangani kasus `data.session === null`.

---

## KP-011 — Direktori basecamp publik: kontak WA disembunyikan sampai login

**Tanggal:** 2026-07-16 · **Status:** Ditetapkan

**Konteks.** CLAUDE.md §3 poin 1 menyebut direktori basecamp "publik untuk pengunjung, lebih
lengkap untuk member" tanpa merinci bedanya apa. Perlu diputuskan bagian mana yang disembunyikan
dari pengunjung yang belum login.

**Keputusan.** Pengunjung (belum login) tetap melihat seluruh info dasar basecamp (nama, alamat,
kota, provinsi). Yang membedakan hanya CTA kontak pengurus: pengunjung melihat tombol
"Login untuk lihat kontak" yang mengarahkan ke `/login`; setelah login, tombol yang sama berubah
jadi CTA WhatsApp asli (`wa.me/...`) memakai `kontak_pengurus`.

**Alasan.** Nomor kontak pengurus adalah data yang paling masuk akal untuk dibatasi ke member
(mencegah spam/penyalahgunaan oleh pengunjung anonim), sementara info lokasi basecamp tetap
berguna dibuka ke publik agar orang bisa menemukan basecamp terdekat sebelum daftar. Alamat &
kota/provinsi tetap terbuka karena tidak sensitif dan memang tujuan utama fitur direktori (poin
"info basecamp tersebar" di §1).

**Dampak.** Halaman `/basecamp` dan `/basecamp/[id]` perlu cek status login (session) untuk
menentukan tombol mana yang dirender. Tidak ada kolom baru di skema — logic ini murni di layer
UI/query, bukan di database.

---

## KP-012 — Format `kontak_pengurus`: disimpan mentah, dinormalisasi saat generate link WhatsApp

**Tanggal:** 2026-07-16 · **Status:** Ditetapkan

**Konteks.** Kolom `kontak_pengurus` di tabel `basecamp` perlu dirangkai jadi link `wa.me/<nomor>`
untuk CTA WhatsApp (§3 poin 2). Proposal tidak mengatur format penyimpanan nomor telepon.

**Keputusan.** Admin bebas input nomor dalam format apa saja saat CRUD basecamp (`08xx`,
`+628xx`, `628xx`, dengan/tanpa spasi atau tanda hubung). Data disimpan apa adanya di
`kontak_pengurus`. Normalisasi (strip semua karakter non-digit, lalu ganti awalan `0` dengan `62`)
dilakukan di satu util function murni saat link `wa.me` di-generate untuk ditampilkan.

**Alasan.** Memvalidasi format ketat di form CRUD menambah friksi untuk admin tanpa manfaat besar,
karena normalisasi saat render sama-sama menghasilkan link yang benar. Lebih sederhana untuk
skala aplikasi ini dibanding menambah validasi form yang kaku.

**Dampak.** Perlu util function (mis. `src/lib/whatsapp.ts`) untuk normalisasi nomor -> link
`wa.me`, dipakai di halaman direktori basecamp. Tidak ada constraint format di migration SQL
untuk kolom `kontak_pengurus`.

---

## KP-013 — Struktur halaman direktori basecamp: list + detail, tampilan minimalis dulu

**Tanggal:** 2026-07-16 · **Status:** Ditetapkan

**Konteks.** Proposal tidak merinci wireframe halaman basecamp. Perlu diputuskan apakah cukup satu
halaman list atau perlu halaman detail terpisah per basecamp, mengingat Tahap 4 (Events) mungkin
perlu menampilkan jadwal per basecamp nantinya.

**Keputusan.** Dibangun dua halaman: `/basecamp` (list/card ringkas seluruh basecamp) dan
`/basecamp/[id]` (detail satu basecamp). Untuk Tahap 3 ini, tampilan sengaja dibuat seminimalis
mungkin (Tailwind polos, belum shadcn/ui) — sama seperti pendekatan Tahap 2 (Auth) — karena desain
final menyusul begitu user memberi referensi desain.

**Alasan.** Halaman detail terpisah memberi ruang untuk menampilkan info tambahan di tahap
berikutnya (mis. daftar event per basecamp di Tahap 4) tanpa merombak struktur routing lagi.
Menunda styling final menghindari kerja ulang UI sebelum arah desain final diputuskan.

**Dampak.** Route baru `src/app/basecamp/page.tsx` dan `src/app/basecamp/[id]/page.tsx`. Styling
akan di-upgrade belakangan begitu shadcn/ui & desain final disepakati — tidak perlu revisi struktur
data/route saat itu terjadi.

---

## KP-014 — Trigger `trg_prevent_role_change` memblokir promosi admin di semua jalur non-JWT

**Tanggal:** 2026-07-16 · **Status:** ⏳ Menunggu keputusan

**Konteks.** Saat mencoba mempromosikan akun test menjadi admin, ditemukan bahwa trigger
`trg_prevent_role_change` (dibuat di migration Tahap 1, `create_initial_schema.sql`) **memblokir**
semua `UPDATE users SET role = ...` yang dijalankan di luar sesi JWT pengguna admin. Ini mencakup:

- **service_role REST API** — `auth.uid()` bernilai `NULL` karena tidak ada JWT user
- **Supabase CLI** (`supabase db query`) — sama, `auth.uid()` = `NULL`
- **Supabase Studio SQL Editor** — kemungkinan besar berlaku juga (belum diverifikasi)

Artinya, cara promosi admin yang didokumentasikan di **KP-009** ("UPDATE lewat Studio SQL Editor")
**mungkin tidak bisa jalan** seperti tertulis, karena Studio kemungkinan besar juga menjalankan
query tanpa sesi JWT user aktif.

**Akar masalah.** Trigger memanggil `auth.uid()` untuk memastikan pelaku perubahan role adalah
admin — tapi `auth.uid()` hanya mengembalikan UUID jika ada JWT Supabase Auth di konteks sesi.
Jalur service_role, CLI, dan Studio tidak membawa JWT semacam itu, sehingga `auth.uid()` = `NULL`
dan trigger selalu menolak update.

**Opsi perbaikan yang tersedia:**

| Opsi | Cara | Trade-off |
|------|------|-----------|
| **A** | Disable trigger sementara → UPDATE → enable lagi | Tidak mengubah skema; proses manual lebih panjang |
| **B** | Revisi trigger: bypass jika `current_role = 'service_role'` atau `current_user = 'postgres'` | Longgarkan satu jalur; harus pastikan tidak membuka celah RLS baru |
| **C** | Ganti trigger dengan RLS check saja (hapus trigger, andalkan policy) | Lebih sederhana; perlu audit ulang policy yang ada |

**Keputusan.** *(Belum ditetapkan — menunggu keputusan Anda)*

> **Pertanyaan untuk Anda:** Mau diperbaiki sekarang (revisi KP-009 + migration baru untuk
> salah satu Opsi A/B/C di atas), atau ditunda sampai benar-benar dibutuhkan (mis. Tahap 10
> saat Panel Admin mulai dibangun)?

**Dampak sementara (selama belum diperbaiki).** KP-009 tetap berlaku secara konseptual, tapi
langkah operasional promosi admin perlu workaround: jalankan query lewat `psql` direct (jika
koneksi DB string tersedia) atau lewat sesi JWT admin aktif (misalnya lewat API route
server-side yang sudah terautentikasi sebagai admin).
