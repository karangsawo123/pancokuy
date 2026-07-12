# PancoKuy

Platform digital komunitas *arm wrestling* (panco) berbasis web.

PancoKuy mengatasi tiga masalah yang ditemukan dari observasi komunitas panco di lapangan:
informasi basecamp dan kontak pengurus tersebar di Instagram/WhatsApp sehingga calon anggota
sulit bergabung, koordinasi via grup WhatsApp rentan *information overload*, dan pencarian
lawan latih tanding (sparing) masih subjektif — hanya dinilai dari postur atau perkiraan berat
badan, yang berisiko menurunkan efektivitas latihan dan meningkatkan risiko cedera.

**Fokus riset:** penerapan algoritma **Weighted Product (WP)** pada fitur **Sparing Matcher**
untuk merekomendasikan lawan sparing yang seimbang secara terukur berdasarkan 6 kriteria.

Repositori ini adalah implementasi dari proposal skripsi Teknik Informatika S1,
Universitas Muhammadiyah Gresik, berjudul *"Rancang Bangun PancoKuy sebagai Platform Komunitas
Arm Wrestling Berbasis Web dengan Metode Weighted Product untuk Rekomendasi Lawan Sparing"*.

## Fitur dalam scope

1. Direktori basecamp/komunitas + kontak pengurus via WhatsApp
2. Jadwal latihan & event (umum maupun terikat basecamp)
3. Profil atlet (6 kriteria WP + style dominan sebagai info tambahan)
4. **Sparing Matcher** — rekomendasi lawan otomatis via algoritma WP
5. **Challenge Mode** — pencarian lawan manual di direktori anggota (tanpa WP)
6. Pengajuan sparing + inbox terima/tolak
7. Panel admin (kelola basecamp, event, profil anggota, bobot kriteria WP)

## Di luar scope (bukan bagian penelitian ini)

Pencatatan progres latihan, ranking/riwayat *supermatch* (Elo), panduan pemula, dan edukasi
pemulihan cedera diposisikan sebagai rencana pengembangan lanjutan — tidak dibangun di sini.
WP **hanya** dipakai di Sparing Matcher; Challenge Mode sepenuhnya di luar perhitungan WP.

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS · Prisma ORM · PostgreSQL · Auth.js v5

## Menjalankan proyek

> Belum tersedia — scaffolding aplikasi belum dibuat. Lihat [docs/progres.md](docs/progres.md)
> untuk status pembangunan terkini.

Konfigurasi environment yang dibutuhkan ada di [.env.example](.env.example).

## Peta dokumentasi

| Dokumen | Isinya |
| :--- | :--- |
| [CLAUDE.md](CLAUDE.md) | Konteks operasional untuk AI agent: aturan bisnis WP, skema DB, konvensi kode |
| [docs/proposal/](docs/proposal/) | Proposal skripsi BAB 1–3 — **beku**, sudah ACC dosen, sumber kebenaran akademik |
| [docs/keputusan.md](docs/keputusan.md) | Decision log — semua hal yang tidak diatur proposal, beserta alasannya |
| [docs/progres.md](docs/progres.md) | Status pembangunan per tahap; **baca ini di awal setiap sesi** |
| [docs/pengujian.md](docs/pengujian.md) | Skenario black-box + protokol uji kesesuaian perhitungan WP |
