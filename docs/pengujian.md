# Rencana & Hasil Pengujian — PancoKuy

Dokumen ini adalah lembar kerja pengujian yang nantinya menjadi bahan BAB 4.
Rencana pengujian bersumber dari [BAB 3.5](proposal/BAB3_AnalisisPerancangan.md).

Dua pendekatan:
- **Bagian A** — Pengujian fungsionalitas (*Black-Box Testing*), BAB 3.5.1
- **Bagian B** — Pengujian kesesuaian hasil perhitungan Weighted Product, BAB 3.5.2

Kolom **Hasil Aktual** dan **Status** diisi saat pengujian dijalankan.
Status: ✅ Valid · ❌ Tidak Valid · ⬜ Belum diuji

---

## Bagian A — Pengujian Fungsionalitas (Black-Box)

### A.1 — 24 Skenario sesuai BAB 3.5.1

> Tabel ini **persis** 24 skenario dari Tabel 3.1 proposal. Jangan mengubah, menghapus, atau
> menyisipkan baris di sini — penguji akan mencocokkannya langsung dengan proposal.

| No | Fitur yang Diuji | Skenario Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Registrasi | Pengguna mengisi formulir registrasi dengan data yang valid (nama, email, password) dan menekan tombol "Daftar". | Akun berhasil dibuat, pengguna diarahkan ke halaman login atau halaman profil. | | ⬜ |
| 2 | Registrasi | Pengguna mengisi formulir registrasi dengan email yang sudah terdaftar. | Sistem menampilkan pesan kesalahan bahwa email sudah digunakan. | | ⬜ |
| 3 | Login | Pengguna memasukkan email dan password yang valid, lalu menekan tombol "Masuk". | Pengguna berhasil login dan diarahkan ke halaman utama atau halaman profil (jika profil belum lengkap). | | ⬜ |
| 4 | Login | Pengguna memasukkan email atau password yang salah. | Sistem menampilkan pesan kesalahan bahwa kredensial tidak valid. | | ⬜ |
| 5 | Profil Atlet | Pengguna mengisi seluruh 6 kriteria WP dan memilih minimal satu basecamp aktif, lalu menekan tombol simpan. | Data profil berhasil disimpan, status profil berubah menjadi "Lengkap". | | ⬜ |
| 6 | Profil Atlet | Pengguna menyimpan profil tanpa melengkapi salah satu kriteria WP. | Sistem menampilkan peringatan bahwa data profil belum lengkap. | | ⬜ |
| 7 | Profil Atlet | Pengguna mengisi seluruh data teknis profil tetapi belum memilih minimal satu basecamp aktif. | Sistem menampilkan peringatan bahwa profil belum lengkap karena belum memiliki basecamp aktif. | | ⬜ |
| 8 | Direktori Basecamp | Pengguna membuka halaman direktori basecamp. | Sistem menampilkan daftar seluruh basecamp yang terdaftar beserta informasi nama, alamat, kota, dan kontak pengurus. | | ⬜ |
| 9 | Direktori Basecamp | Pengguna melakukan pencarian basecamp berdasarkan nama kota. | Sistem menampilkan hasil pencarian yang sesuai dengan kata kunci yang dimasukkan. | | ⬜ |
| 10 | Direktori Basecamp | Pengguna menekan tombol "Hubungi via WhatsApp" pada detail basecamp. | Sistem mengarahkan pengguna ke tautan WhatsApp pengurus yang sesuai. | | ⬜ |
| 11 | Jadwal / Event | Pengguna membuka halaman jadwal atau event. | Sistem menampilkan daftar jadwal latihan dan event yang tersedia sesuai rancangan Subbab 3.4.5. | | ⬜ |
| 12 | Hak Akses | Pengunjung belum login mencoba mengakses halaman Profil, Direktori Anggota, Sparing Matcher, atau Challenge Mode. | Sistem menolak akses dan mengarahkan pengguna ke halaman Login/Registrasi. | | ⬜ |
| 13 | Sparing Matcher | Pengguna dengan profil lengkap menekan tombol "Cari Lawan Sparing". | Sistem menampilkan daftar rekomendasi lawan sparing yang terurut berdasarkan nilai preferensi WP tertinggi. | | ⬜ |
| 14 | Sparing Matcher | Pengguna dengan profil belum lengkap mencoba mengakses fitur Sparing Matcher. | Sistem menampilkan peringatan atau mengarahkan pengguna ke halaman profil untuk melengkapi data. | | ⬜ |
| 15 | Sparing Matcher | Pengguna dengan profil lengkap menjalankan Sparing Matcher, tetapi tidak ada kandidat lain yang memiliki profil lengkap. | Sistem menampilkan pesan bahwa rekomendasi belum tersedia. | | ⬜ |
| 16 | Sparing Matcher | Pengguna menekan tombol "Ajukan Sparing" pada salah satu kandidat hasil rekomendasi. | Sistem mencatat pengajuan sparing ke basis data dengan `source` = 'sparing_matcher' dan `wp_score` terisi. | | ⬜ |
| 17 | Challenge Mode | Pengguna membuka halaman direktori anggota dan melakukan pencarian manual berdasarkan filter tertentu (misal: kota, level). | Sistem menampilkan daftar anggota yang sesuai dengan filter yang dipilih. | | ⬜ |
| 18 | Challenge Mode | Pengguna menekan tombol "Ajukan Sparing" pada profil anggota melalui Challenge Mode. | Sistem mencatat pengajuan sparing ke basis data dengan `source` = 'challenge_mode' dan `wp_score` bernilai Null. | | ⬜ |
| 19 | Challenge Mode | Pengguna yang sudah login tetapi profilnya belum lengkap mencoba mengakses Challenge Mode untuk mengajukan sparing. | Sistem menampilkan peringatan atau mengarahkan pengguna ke halaman profil untuk melengkapi data terlebih dahulu. | | ⬜ |
| 20 | Challenge Mode / Sparing Matcher | Pengguna mencoba mengajukan sparing kepada profil miliknya sendiri. | Sistem menolak pengajuan dan menampilkan pesan kesalahan. | | ⬜ |
| 21 | Admin – Data Anggota | Admin memperbarui data anggota/profil atlet melalui panel admin. | Data anggota/profil berhasil diperbarui dan tampil sesuai perubahan. | | ⬜ |
| 22 | Admin – Data Basecamp | Admin menambahkan data basecamp baru melalui panel admin. | Data basecamp berhasil ditambahkan dan muncul di halaman direktori basecamp. | | ⬜ |
| 23 | Admin – Jadwal / Event | Admin menambahkan data jadwal/event baru. | Data jadwal/event berhasil disimpan dan tampil pada halaman Jadwal/Event sesuai rancangan Subbab 3.4.5. | | ⬜ |
| 24 | Admin – Bobot WP | Admin memperbarui nilai bobot awal salah satu kriteria WP. | Nilai bobot berhasil diperbarui dan seluruh bobot normalisasi dihitung ulang secara otomatis oleh sistem sehingga Σw_j = 1. | | ⬜ |

### A.2 — Skenario tambahan (di luar Tabel 3.1)

> Skenario di bawah **tidak ada** di proposal. Berasal dari [KP-005](keputusan.md#kp-005--inbox-sparing-lawan-dapat-menerimamenolak-permintaan):
> pembangunan inbox terima/tolak sparing, yang memanfaatkan kolom `status` pada tabel
> `sparing_requests` (kolom ini sudah ada di skema BAB 3.3.3 yang di-ACC, tetapi alur
> pengubahnya tidak dijabarkan di use case maupun Tabel 3.1).
>
> **Statusnya menunggu persetujuan dosen pembimbing.** Bila ditolak, bagian A.2 dan fitur
> terkait dihapus.

| No | Fitur yang Diuji | Skenario Pengujian | Hasil yang Diharapkan | Hasil Aktual | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 25 | Inbox Sparing | Anggota membuka halaman Permintaan Sparing dan menekan tombol "Terima" pada salah satu permintaan masuk berstatus `pending`. | Status permintaan berubah menjadi `accepted` dan tampil pada daftar permintaan yang diterima. | | ⬜ |
| 26 | Inbox Sparing | Anggota menekan tombol "Tolak" pada salah satu permintaan masuk berstatus `pending`. | Status permintaan berubah menjadi `rejected`. | | ⬜ |
| 27 | Inbox Sparing | Pengguna membatalkan permintaan sparing yang ia kirim sendiri dan masih berstatus `pending`. | Status permintaan berubah menjadi `cancelled`. Pengguna tidak dapat membatalkan permintaan milik orang lain. | | ⬜ |

---

## Bagian B — Pengujian Kesesuaian Perhitungan Weighted Product

Tujuan: memverifikasi bahwa perhitungan WP oleh sistem sesuai dengan rumus pada BAB 2.2.3 dan
BAB 3.2.3. Ini **verifikasi internal implementasi algoritma**, bukan pembuktian efektivitas
metode WP secara statistik terhadap populasi atlet riil (BAB 1.3 butir 9).

### B.1 Protokol (BAB 3.5.2)

1. Siapkan 5–10 profil atlet simulasi (dummy) dengan variasi nilai pada 6 kriteria.
   **Wajib** menyertakan minimal satu atlet dengan **lebih dari satu basecamp aktif**, agar
   logika C1 "ambil skor lokasi terbaik" ([KP-003](keputusan.md#kp-003--skor-c1-diambil-dari-kombinasi-terbaik-seluruh-basecamp-aktif)) ikut teruji.
2. Tetapkan satu profil sebagai pengguna aktif (user referensi).
3. Hitung skor kecocokan (skala 1–5) tiap kandidat secara manual, per kriteria.
4. Normalisasi bobot (`w_j = W_j / ΣW_j`), lalu hitung vektor S: `S_i = Π x_ij^w_j`
   (semua kriteria benefit → pangkat positif).
5. Hitung vektor V: `V_i = S_i / ΣS_i`.
6. Urutkan V dari terbesar ke terkecil → ranking manual.
7. Jalankan Sparing Matcher pada sistem dengan data yang sama, bandingkan hasilnya.

**Kriteria lulus:** urutan ranking sistem **sama** dengan ranking manual, dan nilai V sistem sama
atau mendekati hasil manual (selisih pembulatan desimal ditoleransi selama tidak mengubah urutan).

### B.2 Bobot kriteria yang digunakan

> ⚠️ Diisi dari hasil wawancara *expert judgement* (BAB 3.1.3). **Belum tersedia.**

| Kode | Kriteria | Bobot Awal (W) | Bobot Normalisasi (w) |
| :--- | :--- | :--- | :--- |
| C1 | Lokasi Latihan Aktif | | |
| C2 | Berat Badan | | |
| C3 | Lama Aktif Latihan | | |
| C4 | Frekuensi Latihan | | |
| C5 | Tangan Sparing | | |
| C6 | Level Kemampuan | | |
| | **Total** | | **1,000000** |

### B.3 Data simulasi (dummy)

| Kode | Nama | Basecamp Aktif (kota, provinsi) | Berat (kg) | Mulai Latihan (bulan/tahun) | Frekuensi (sesi/mgg) | Tangan Sparing | Level |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| A0 | *(pengguna aktif)* | | | | | | |
| A1 | | | | | | | |
| A2 | | | | | | | |
| A3 | | | | | | | |
| A4 | | | | | | | |
| A5 | | | | | | | |

### B.4 Skor kecocokan (hasil konversi, manual)

| Kandidat | C1 | C2 | C3 | C4 | C5 | C6 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| A1 | | | | | | |
| A2 | | | | | | |
| A3 | | | | | | |
| A4 | | | | | | |
| A5 | | | | | | |

### B.5 Perbandingan hasil manual vs sistem

| Kandidat | S (manual) | V (manual) | Rank (manual) | V (sistem) | Rank (sistem) | Sesuai? |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| A1 | | | | | | |
| A2 | | | | | | |
| A3 | | | | | | |
| A4 | | | | | | |
| A5 | | | | | | |

**Kesimpulan pengujian:** _(diisi setelah pengujian dijalankan)_
