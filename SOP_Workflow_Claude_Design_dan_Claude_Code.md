# SOP Workflow Claude Design, Claude Code, Higgsfield, dan Netlify

> Dokumen ini merupakan penulisan ulang dan restrukturisasi transkrip video menjadi panduan kerja yang dapat dipahami dan ditiru oleh AI agent.
>
> Fokus utamanya bukan menyalin ucapan video secara kata per kata, tetapi mengubahnya menjadi **workflow operasional**, **prompt yang dapat digunakan ulang**, **struktur repositori**, **aturan eksekusi**, dan **checklist validasi**.

---

## 1. Tujuan Dokumen

Workflow ini menjelaskan cara membangun satu ekosistem desain dan implementasi digital untuk sebuah perusahaan fiktif bernama **Apex Roofing**.

Ekosistem yang dibuat mencakup:

1. Design system atau panduan merek.
2. Website pemasaran dan formulir permintaan penawaran.
3. Halaman layanan.
4. Generator iklan gambar dan video.
5. Slide presentasi produk.
6. Dokumen kontrak atau proposal pelanggan.
7. Tools internal berbasis Claude Skills.
8. Repositori kode terpadu.
9. Deployment website ke Netlify.
10. Halaman admin untuk melihat data prospek.

Workflow ini dapat diadaptasi untuk proyek lain dengan mengganti identitas perusahaan, bidang usaha, layanan, target pengguna, aset, dan kebutuhan deployment.

---

## 2. Normalisasi Istilah dari Transkrip

Beberapa istilah di dalam transkrip terdengar tidak konsisten akibat hasil transkripsi otomatis. Dalam dokumen ini digunakan istilah berikut:

| Istilah pada transkrip | Istilah yang digunakan |
|---|---|
| Claw Design / Cloud Design | Claude Design |
| Claw Code / Cloud Code | Claude Code |
| Higsfield | Higgsfield |
| Netlefi / Netifi | Netlify |
| reals | Reels |
| dropdown popover | menu dropdown/popover |
| Kazoo | Kalamazoo, sesuai konteks wilayah pada video |

Nama model yang disebutkan di dalam video, seperti Sonnet 4.6, Opus 4.8, Recraft V4.1, Cdream 4.5, dan Kling 3.0, dipertahankan sebagai contoh workflow. Gunakan model yang benar-benar tersedia pada akun dan platform yang digunakan.

---

## 3. Prinsip Kerja Utama

AI agent yang mengikuti workflow ini harus mematuhi prinsip berikut:

1. **Design system dibuat lebih dahulu.**  
   Semua website, slide, dokumen, iklan, dan tools harus menggunakan identitas visual yang sama.

2. **Prototype dibuat sebelum implementasi produksi.**  
   Claude Design digunakan untuk membuat rancangan visual dan interaktif awal. Claude Code digunakan untuk mengubah hasil tersebut menjadi codebase yang terstruktur dan dapat dikembangkan.

3. **Aset visual dibuat berdasarkan kebutuhan layout.**  
   Jangan membuat gambar secara acak. Tentukan lebih dahulu posisi, fungsi, rasio aspek, dan prompt setiap gambar.

4. **Semua hasil harus dapat diedit.**  
   Warna, teks, gambar, video, nomor telepon, layanan, dan data pelanggan harus dapat diganti tanpa membangun ulang seluruh sistem.

5. **Repositori menjadi pusat kebenaran proyek.**  
   Setelah prototype selesai, semua aset, kode, panduan, skills, dan dokumentasi dipindahkan ke satu repositori terpadu.

6. **Setiap tahap memiliki pemeriksaan hasil.**  
   Agent tidak boleh menganggap pekerjaan selesai hanya karena file berhasil dibuat.

7. **Gunakan placeholder untuk data yang belum tersedia.**  
   Jangan mengarang nomor telepon, alamat, testimoni, rating, kredensial, atau data perusahaan nyata.

8. **Jangan menyimpan rahasia langsung di source code.**  
   Username, password, API key, dan token harus diletakkan pada environment variables.

---

## 4. Gambaran Besar Workflow

Urutan kerja yang digunakan:

```text
Buat akun dan buka Claude Design
        ↓
Buat design system
        ↓
Buat website prototype
        ↓
Buat kebutuhan dan prompt aset gambar
        ↓
Generate gambar di Higgsfield
        ↓
Masukkan gambar ke website
        ↓
Buat studio/generator iklan
        ↓
Generate gambar dan video iklan
        ↓
Rangkai video menjadi iklan
        ↓
Buat slide presentasi
        ↓
Buat dokumen kontrak/proposal
        ↓
Kirim seluruh prototype ke Claude Code
        ↓
Bangun repositori terpadu
        ↓
Buat Claude Skills dan tools internal
        ↓
Deploy website ke Netlify
        ↓
Atur environment variables
        ↓
Uji formulir, login admin, dan data prospek
```

---

# BAGIAN I — PERSIAPAN

## 5. Perangkat dan Layanan

Workflow di dalam video menggunakan:

- Claude.ai.
- Claude Desktop.
- Claude Design.
- Claude Code.
- Higgsfield untuk pembuatan gambar dan video.
- Git atau repositori kode.
- Netlify untuk deployment.
- Koneksi atau CLI yang diperlukan oleh Claude Code.

Sebelum memulai, pastikan:

- Akun Claude sudah aktif.
- Claude Desktop sudah terpasang apabila ingin menggunakan aplikasi desktop.
- Claude Design dapat dibuka.
- Claude Code dapat mengakses folder proyek.
- Platform pembuat aset visual dapat digunakan.
- Akun Netlify sudah tersedia.
- Tidak ada kredensial yang ditulis ke dalam prompt publik atau source code.

---

## 6. Membuka Claude Design

Claude Design dapat diakses melalui:

1. Sidebar pada Claude.ai.
2. Tombol **Design** pada aplikasi Claude Desktop.

Dalam video, aplikasi desktop dipilih karena memberi area kerja yang lebih luas dan memudahkan perpindahan antara Claude Design dan Claude Code.

---

# BAGIAN II — MEMBUAT DESIGN SYSTEM

## 7. Membuat Design System Baru

Masuk ke tab **Design Systems**, kemudian pilih **Create Design System**.

Design system harus memiliki konteks identitas yang jelas.

### Contoh identitas proyek

```text
Nama perusahaan: Apex Roofing

Deskripsi:
Perusahaan atap lokal di wilayah Midwest yang melayani Southwest Michigan.
```

Deskripsi singkat berfungsi sebagai identitas awal bagi seluruh desain yang akan dibuat.

---

## 8. Menambahkan Referensi Desain

Claude Design dapat menerima beberapa jenis referensi:

- Repositori GitHub.
- Folder kode dari komputer.
- File Figma.
- Font.
- Logo.
- Gambar.
- Aset merek lainnya.
- Catatan tambahan.

Dalam workflow video, sumber utama yang digunakan adalah:

- Logo SVG.
- Pilihan font.
- Palet warna.
- Instruksi penggantian teks logo.
- Tujuan penggunaan design system.

---

## 9. Membuat Logo SVG

Logo dibuat melalui Higgsfield menggunakan model yang mendukung keluaran vektor atau SVG.

Alasan memilih SVG:

- Dapat diperbesar tanpa kehilangan kualitas.
- Cocok untuk website, pakaian, cetak, dan billboard.
- Warna dapat diedit.
- Teks pada logo lebih mudah disesuaikan.
- Dapat digunakan sebagai elemen animasi.

Dalam contoh video, logo awal memiliki teks yang salah, yaitu “Durable Roofing”. Claude Design kemudian diminta mengganti teks tersebut menjadi “Apex Roofing”.

### Instruksi catatan logo

```text
File logo SVG yang diunggah saat ini bertuliskan “Durable Roofing”.
Ganti tulisan tersebut menjadi “Apex Roofing” menggunakan font yang telah
ditentukan dalam design system. Pertahankan struktur simbol utama dan buat
variasi warna yang konsisten dengan palet merek.
```

---

## 10. Menentukan Font

Claude Chat digunakan sebagai tempat eksplorasi sebelum font dimasukkan ke Claude Design.

### Prompt eksplorasi font

```text
Berikut identitas perusahaan:

Apex Roofing adalah perusahaan atap lokal di wilayah Midwest yang melayani
Southwest Michigan.

Berikan empat variasi pasangan Google Fonts untuk heading dan body.

Kriteria:
- Terlihat dapat dipercaya.
- Cocok untuk perusahaan lokal.
- Tidak terlihat terlalu klise.
- Tidak terlalu eksperimental.
- Tetap memiliki karakter yang unik.
- Jelaskan alasan setiap pasangan.
- Tampilkan contoh pemakaian heading dan body.
- Pilih satu rekomendasi terbaik.
```

Setelah salah satu opsi dipilih, masukkan hasilnya ke bagian catatan design system.

### Format penyimpanan keputusan font

```text
Typography

Heading font:
[Nama font yang dipilih]

Body font:
[Nama font yang dipilih]

Aturan:
- Heading utama menggunakan bobot tebal.
- Body harus mudah dibaca pada layar desktop dan seluler.
- Hindari penggunaan terlalu banyak variasi bobot.
- Logo menggunakan keluarga font yang selaras dengan heading.
```

---

## 11. Menentukan Palet Warna

Setelah font dipilih, Claude Chat diminta membuat beberapa pilihan warna.

### Prompt eksplorasi palet warna

```text
Saya memilih pasangan font sebelumnya untuk Apex Roofing.

Sekarang buat empat palet warna yang:
- Menimbulkan rasa percaya.
- Terlihat kuat dan profesional.
- Tetap terasa seperti perusahaan lokal atau bisnis keluarga.
- Tidak terlalu korporat.
- Memiliki warna utama, warna aksen, warna netral, background, border,
  warna teks, success, warning, dan error.
- Sertakan kode warna setiap pilihan.
- Jelaskan konteks penggunaan setiap warna.
```

Palet yang dipilih kemudian dimasukkan ke dalam catatan design system.

### Format dokumentasi palet

```text
Brand Colors

Primary:
[HEX]

Secondary:
[HEX]

Accent:
[HEX]

Background:
[HEX]

Surface:
[HEX]

Text Primary:
[HEX]

Text Secondary:
[HEX]

Border:
[HEX]

Success:
[HEX]

Warning:
[HEX]

Error:
[HEX]
```

---

## 12. Mendefinisikan Cakupan Design System

Design system tidak langsung diminta membuat website. Ia lebih dahulu diminta membuat fondasi merek dan komponen yang dapat digunakan pada berbagai media.

### Prompt pembuatan design system

```text
Buat sebuah brand guide dan design system lengkap untuk Apex Roofing
berdasarkan seluruh identitas, font, warna, logo, dan aset yang telah diberikan.

Design system harus mencakup:

1. Prinsip visual merek.
2. Variasi logo.
3. Aturan clear space dan ukuran minimum logo.
4. Penggunaan logo pada background terang dan gelap.
5. Palet warna utama, netral, dan semantic status.
6. Skala typography.
7. Heading, subheading, body, caption, label, dan button text.
8. Tombol utama, sekunder, outline, dan destructive.
9. Form input, textarea, select, checkbox, dan validasi.
10. Card, badge, notification, modal, dan navigation.
11. Elevation atau tingkat bayangan.
12. Grid dan spacing.
13. Contoh komponen website.
14. Ide motion graphic.
15. Penggunaan warna untuk background dan surface.
16. Aturan penggunaan font.
17. Contoh aset yang dapat dikembangkan pada masa mendatang.

Jangan membuat website final pada tahap ini.
Fokus pada sistem desain yang dapat digunakan kembali untuk website,
iklan, slide, dokumen, dan tools internal.
```

---

## 13. Memeriksa Hasil Design System

Hasil yang diharapkan:

- Logo telah menggunakan nama Apex Roofing.
- Terdapat beberapa variasi logo.
- Warna utama dan warna netral terdokumentasi.
- Terdapat semantic colors.
- Terdapat contoh card dan form.
- Terdapat level elevation.
- Terdapat aturan tipografi.
- Terdapat contoh motion.
- Dokumen dapat diedit.
- Design system dapat dipublikasikan.

Setelah diperiksa, ubah status design system menjadi **Published**.

Design system dapat dijadikan default apabila seluruh desain berikutnya memang harus memakai sistem tersebut.

---

# BAGIAN III — MEMBUAT WEBSITE PROTOTYPE

## 14. Membuat Desain Website Baru

Pilih **New Design**, kemudian pilih design system Apex Roofing.

Website yang dibuat berjenis landing page pemasaran dengan fokus konversi dan kepercayaan.

---

## 15. Spesifikasi Website

Struktur halaman utama:

1. Navigation.
2. Hero section.
3. Formulir free quote di area atas.
4. Trust signals.
5. Services section.
6. Location atau service area section.
7. Call to action bagian bawah.
8. Formulir free quote kedua.
9. Footer.

Halaman tambahan:

- Roof Repair.
- Roof Replacement.
- New Construction.

Perilaku navigasi:

- Home mengarah ke hero dengan anchor link.
- Bagian yang berada pada halaman utama menggunakan anchor.
- Services menggunakan dropdown atau popover.
- Setiap layanan mengarah ke halaman layanan tersendiri.

---

## 16. Prompt Utama Website

```text
Gunakan design system Apex Roofing yang telah dibuat.

Buat sebuah website landing page dasar yang berfokus pada konversi dan
kepercayaan pelanggan.

Struktur yang dibutuhkan:

1. Navigation bar.
   - Home mengarah ke hero section pada halaman utama.
   - Services berupa dropdown/popover.
   - Setiap item layanan mengarah ke halaman layanan tersendiri.
   - Sediakan item navigasi lain yang relevan.

2. Hero section.
   - Jelaskan bahwa Apex Roofing adalah perusahaan atap lokal dan terpercaya.
   - Tampilkan free quote form di sisi kanan pada desktop.
   - Layout harus tetap baik pada perangkat seluler.
   - Gunakan trust signals yang jelas.
   - CTA harus terlihat kuat tanpa terasa agresif.

3. Free quote form.
   - Nama lengkap.
   - Nomor telepon.
   - Email.
   - Alamat.
   - Jenis layanan.
   - Seberapa cepat layanan dibutuhkan.
   - Pesan tambahan.

4. Services section.
   - Roof Repair.
   - Roof Replacement.
   - New Construction.
   - Setiap card mengarah ke halaman layanan yang sesuai.

5. Location section.
   - Menjelaskan wilayah layanan di Southwest Michigan.

6. Bottom CTA section.
   - Gunakan layout yang berbeda dari hero.
   - Tampilkan kembali free quote form untuk pengguna yang telah menggulir
     sampai bagian bawah.

7. Footer.
   - Informasi bisnis.
   - Tautan navigasi.
   - Placeholder kontak.

Buat halaman khusus untuk setiap layanan sekarang.

Untuk seluruh gambar:
- Gunakan placeholder terlebih dahulu.
- Berikan nama aset yang konsisten.
- Berikan prompt pembuatan gambar untuk setiap placeholder.
- Berikan rasio aspek setiap gambar.
- Jelaskan posisi dan fungsi masing-masing gambar.

Tambahkan tweak controls agar saya dapat mencoba:
- Posisi form.
- Gaya form.
- Variasi headline.
- Tingkat kekuatan tampilan merek.
- Variasi CTA.
- Opsi layout lain yang relevan.
```

---

## 17. Menjawab Pertanyaan Klarifikasi Website

Claude Design dapat mengajukan pertanyaan. Jawaban pada contoh video:

### Layanan

```text
- Roof Repair
- Roof Replacement
- New Construction
```

### Nomor telepon

```text
Gunakan placeholder untuk sementara.
```

### Trust signals

```text
- A+ rating pada Better Business Bureau.
- Lebih dari 500 ulasan.
- Rata-rata rating 4,7 bintang.
- Local and family-owned.
```

> Untuk proyek nyata, seluruh klaim harus diverifikasi. Gunakan placeholder apabila data belum tersedia.

### Wilayah layanan

```text
- Kalamazoo
- Portage
- Battle Creek
- Three Rivers
- Paw Paw
```

### Field formulir

```text
- Full name
- Phone
- Email
- Address
- Service needed
- How soon
- Message
```

### Halaman layanan

```text
Ya, buat seluruh halaman layanan sekarang.
```

### Tweak controls

Aktifkan seluruh opsi yang relevan agar desain dapat dieksplorasi tanpa mengubah source secara manual.

---

## 18. Menggunakan Tweak Controls

Contoh opsi yang tersedia:

- Form di sisi kanan atau di bawah hero.
- Form inline atau card.
- Headline “Built to Last”.
- Headline yang menonjolkan bisnis lokal.
- Headline respons cepat terhadap kerusakan akibat badai.
- Intensitas brand: subtle, balanced, atau bold.
- Variasi warna aksen.
- Variasi CTA.

Pilih satu konfigurasi utama, tetapi pertahankan opsi lainnya apabila berguna untuk pengujian.

---

# BAGIAN IV — MEMBUAT DAN MEMASUKKAN ASET WEBSITE

## 19. Meminta Daftar Aset

Claude Design harus menghasilkan daftar kebutuhan gambar.

Format yang disarankan:

```markdown
| ID | Nama file | Digunakan pada | Rasio | Prompt | Catatan |
|---|---|---|---|---|---|
| IMG-01 | hero-roofing-crew.webp | Hero homepage | 16:9 | ... | Sisakan area untuk teks |
| IMG-02 | roof-repair.webp | Card service | 3:2 | ... | Tidak ada teks pada gambar |
```

---

## 20. Aturan Prompt Gambar

Setiap prompt gambar sebaiknya menyebutkan:

- Subjek utama.
- Lingkungan.
- Wilayah atau karakter arsitektur.
- Pencahayaan.
- Mood.
- Sudut kamera.
- Realisme.
- Ruang kosong untuk teks apabila dibutuhkan.
- Larangan teks, watermark, dan logo palsu.
- Rasio aspek.

### Contoh pola prompt

```text
Wide cinematic photograph of a professional local roofing crew working on a
well-maintained residential home in Southwest Michigan, trustworthy and
approachable atmosphere, realistic safety equipment, natural daylight,
suburban Midwestern neighborhood, premium commercial photography, room for
headline text on the left, no visible brand logos, no text, no watermark.
Aspect ratio: 16:9.
```

---

## 21. Generate Gambar di Higgsfield

Tahapan:

1. Salin prompt dari Claude Design.
2. Pilih model gambar yang sesuai.
3. Tentukan resolusi.
4. Tentukan rasio aspek.
5. Generate beberapa variasi.
6. Pilih hasil terbaik.
7. Simpan sebagai WebP apabila ukuran file terlalu besar.
8. Beri nama sesuai ID aset.

Contoh penamaan:

```text
image-01-hero.webp
image-02-roof-repair.webp
image-03-roof-replacement.webp
image-04-new-construction.webp
```

Jangan menggunakan nama ambigu seperti:

```text
final.png
final2.png
new-final.png
```

---

## 22. Memasukkan Gambar ke Claude Design

Setelah seluruh aset tersedia, unggah gambar dan gunakan prompt berikut:

```text
Masukkan seluruh gambar yang telah saya unggah ke placeholder yang sesuai.

Aturan pemetaan:
- image-01 sesuai prompt dan placeholder nomor 1.
- image-02 sesuai prompt dan placeholder nomor 2.
- Lanjutkan berdasarkan nomor file dan nomor prompt.

Pastikan:
- Aspect ratio tidak rusak.
- Gambar tidak terdistorsi.
- Crop mempertahankan subjek utama.
- Overlay menjaga keterbacaan teks.
- Seluruh halaman layanan menggunakan gambar yang sesuai.
- Tidak ada placeholder yang tertinggal.
```

---

## 23. Pemeriksaan Website Prototype

Periksa:

- Hero terlihat profesional.
- Form terlihat jelas.
- Heading tetap terbaca di atas gambar.
- Semua card layanan memiliki gambar.
- Semua halaman layanan tersedia.
- Dropdown services bekerja.
- Anchor link bekerja.
- CTA atas dan bawah konsisten.
- Mobile layout tidak rusak.
- Tidak ada teks placeholder yang tidak disengaja.
- Tidak ada klaim bisnis palsu.
- Tidak ada aset yang salah posisi.

---

# BAGIAN V — MEMBUAT AD STUDIO

## 24. Membuat Proyek Iklan

Kembali ke halaman proyek Claude Design.

Pilih:

- Design system: Apex Roofing.
- Template: Animation.

Tujuannya adalah membuat dashboard yang dapat menghasilkan iklan untuk format Meta dan Instagram.

---

## 25. Prompt Ad Studio

```text
Gunakan design system Apex Roofing.

Buat sebuah ad studio atau generator iklan yang dapat digunakan untuk
menghasilkan format iklan Facebook, Meta, dan Instagram.

Dukung:
- Iklan video.
- Iklan gambar statis.
- Feed.
- Reels.
- Stories.
- Beberapa rasio aspek yang relevan.

Dashboard harus memungkinkan pengguna:
- Memilih ukuran iklan.
- Mengganti gambar.
- Mengganti video.
- Mengganti headline.
- Mengganti body copy.
- Mengganti CTA.
- Mengganti nomor telepon.
- Mengganti warna aksen.
- Mengatur kecepatan animasi.
- Memutar dan menjeda preview.
- Memilih variasi intro dan outro.

Buat terlebih dahulu motion graphics, animated intro, dan animated outro
menggunakan elemen SVG dari design system.

Untuk setiap background image atau video yang dibutuhkan:
- Berikan prompt pembuatannya.
- Berikan rasio aspek.
- Berikan durasi apabila berbentuk video.
- Jelaskan penggunaannya.
```

---

## 26. Mengembangkan Konsep Iklan Berbasis Masalah dan Solusi

Prompt awal dari generator dapat terasa terlalu umum. Gunakan Claude Chat untuk mengembangkan ide yang lebih emosional dan memiliki alur cerita.

### Prompt pengembangan konsep

```text
Buat beberapa konsep iklan visual untuk perusahaan atap.

Iklan harus menampilkan transformasi:
1. Masalah atau pain point.
2. Respons atau proses penanganan.
3. Hasil akhir yang melegakan.

Contoh masalah:
- Atap bocor.
- Air menetes ke dalam rumah.
- Pemilik rumah stres.
- Kerusakan setelah badai.

Setiap konsep dapat memiliki beberapa scene.

Untuk setiap scene, berikan:
- Prompt gambar.
- Prompt image-to-video.
- Gerakan subjek.
- Gerakan kamera.
- Mood.
- Durasi.
- Rasio aspek.
- Transisi ke scene berikutnya.

Hindari konsep yang hanya menampilkan pekerja atap tanpa cerita.
Fokus pada masalah pelanggan, tindakan cepat, dan hasil akhir.
Jangan menambahkan teks di dalam gambar karena teks akan dibuat sebagai overlay.
```

---

## 27. Contoh Struktur Iklan Tiga Scene

### Scene 1 — Masalah

Seorang pemilik rumah berdiri di dapur yang redup. Air menetes dari plafon ke ember. Ekspresi menunjukkan stres dan kekhawatiran.

### Scene 2 — Penanganan

Dua pekerja menggunakan perlengkapan hujan dan menutup bagian atap yang rusak dengan terpal.

### Scene 3 — Hasil

Pemilik rumah berdiri di jalan masuk dan melihat atap baru dalam kondisi cerah. Ia tampak lega dan puas.

---

## 28. Generate Gambar Dasar

Untuk iklan vertikal, gunakan rasio yang sesuai dengan Reels atau Stories, umumnya 9:16.

Pastikan prompt tidak meminta ruang CTA di dalam gambar apabila generator cenderung membuat teks palsu.

Aturan:

- Tidak ada tulisan di dalam gambar.
- Tidak ada logo.
- Tidak ada watermark.
- Karakter dan rumah sebisa mungkin konsisten.
- Setiap scene memiliki kesinambungan visual.
- Scene akhir harus terlihat jelas lebih positif dari scene awal.

---

## 29. Mengubah Gambar Menjadi Video

Contoh prompt image-to-video:

### Scene 1

```text
Water drips steadily from the ceiling as the homeowner picks up the bucket
and slowly walks toward the camera. Maintain realistic motion and a worried
expression. Subtle handheld camera movement.
```

### Scene 2

```text
The roofers carefully drag a heavy tarp across the damaged open section of
the roof and secure it in place. Rain and wind remain realistic. Camera
tracks slightly from left to right.
```

### Scene 3

```text
The camera slowly pulls back as the homeowner looks up at the completed roof
from left to right, appearing relieved and satisfied. Bright calm morning,
natural movement.
```

Setelah video selesai:

1. Preview setiap hasil.
2. Periksa artefak aneh.
3. Pilih hasil terbaik.
4. Download.
5. Beri nama berurutan.

Contoh:

```text
ad-scene-01-problem.mp4
ad-scene-02-response.mp4
ad-scene-03-result.mp4
```

---

## 30. Merangkai Video Menjadi Iklan

Unggah video ke Claude Design.

### Prompt perakitan iklan

```text
Buat sebuah iklan vertikal untuk Reels dan Stories dengan menggabungkan
seluruh video yang telah saya unggah.

Urutan:
1. Pemilik rumah dengan ember akibat kebocoran.
2. Pekerja memasang terpal pada atap yang rusak.
3. Pemilik rumah yang bahagia setelah atap selesai diperbaiki.

Kebutuhan:
- Gunakan transisi yang halus.
- Mulai dari pain point.
- Bangun rasa urgensi.
- Tunjukkan respons profesional.
- Akhiri dengan hasil yang melegakan.
- Tambahkan CTA yang jelas pada bagian akhir.
- Tampilkan logo pada ending.
- Gunakan teks berukuran besar.
- Hindari terlalu banyak eyebrow text, super-header, atau tulisan kecil.
- Berikan gradient atau fade di belakang teks agar mudah dibaca.
- Pastikan desain tetap konsisten dengan Apex Roofing.
- Target durasi sekitar 15 detik.
```

---

## 31. Pemeriksaan Iklan

Periksa:

- Scene memiliki urutan yang jelas.
- Iklan dapat dipahami tanpa suara.
- Teks cukup besar.
- Teks tidak tertutup elemen antarmuka platform.
- Kontras teks baik.
- CTA terlihat.
- Logo hanya muncul secara wajar.
- Durasi sesuai format.
- Tidak ada frame rusak.
- Tidak ada karakter berubah ekstrem.
- Tidak ada watermark.
- Tidak ada klaim yang belum diverifikasi.

---

# BAGIAN VI — MEMBUAT SLIDE PRESENTASI

## 32. Tujuan Slide

Slide digunakan sebagai pitch deck pelanggan untuk menjelaskan:

- Jenis konfigurasi shingles.
- Pilihan warna.
- Perbedaan visual.
- Pertimbangan iklim lokal.
- Pilihan pelanggan.

---

## 33. Prompt Slide Deck

```text
Gunakan design system Apex Roofing.

Buat sebuah pitch deck yang dapat ditampilkan kepada pelanggan untuk
menjelaskan pilihan shingle.

Deck harus mencakup:
- Sampul.
- Cara memilih shingle.
- Jenis atau konfigurasi shingle.
- Galeri keluarga warna.
- Pertimbangan tampilan rumah.
- Pertimbangan cuaca Michigan.
- Ringkasan pilihan.
- Langkah berikutnya.

Saya akan memberikan daftar warna dan spesifikasi shingle.

Gunakan pendekatan brand-neutral untuk produsen apabila tidak ada merek
tertentu yang diberikan.

Tampilkan keluarga warna dalam bentuk swatch atau grid gallery pada jumlah
slide yang lebih sedikit.

Untuk setiap placeholder gambar:
- Berikan prompt pembuatannya.
- Berikan nama file.
- Berikan rasio aspek.
- Jelaskan penempatan.
```

---

## 34. Memasukkan Gambar Slide

Generate seluruh gambar berdasarkan prompt.

Beri nama file secara konsisten, lalu unggah.

### Prompt pemetaan gambar slide

```text
Berikut seluruh gambar untuk pitch deck.

Nama file telah disesuaikan dengan ID placeholder.
Masukkan setiap gambar ke slide yang benar.

Pastikan:
- Tidak ada gambar yang tertukar.
- Crop konsisten.
- Swatch warna tetap terlihat jelas.
- Teks tidak bertabrakan dengan gambar.
- Seluruh slide memakai design system Apex Roofing.
```

---

## 35. Pemeriksaan Slide

Periksa:

- Cover kuat dan mudah dibaca.
- Tidak terlalu banyak teks.
- Swatch warna tidak berubah akibat overlay.
- Istilah teknis dijelaskan secara sederhana.
- Slide dapat dilihat dari tablet atau laptop.
- Urutan presentasi logis.
- Tidak ada merek produsen yang diklaim apabila deck dibuat brand-neutral.
- Semua gambar sudah masuk.

---

# BAGIAN VII — MEMBUAT DOKUMEN KONTRAK ATAU PROPOSAL

## 36. Tujuan Dokumen

Dokumen dibuat agar staf dapat:

- Mengisi nama pelanggan.
- Mengganti alamat.
- Mengganti item layanan.
- Mengganti harga.
- Menambahkan syarat sederhana.
- Memperoleh tanda tangan pelanggan.
- Memperoleh tanda tangan perusahaan.

---

## 37. Prompt Dokumen

```text
Gunakan design system Apex Roofing.

Buat dokumen kontrak atau service authorization dasar yang dapat
ditandatangani pelanggan untuk memulai pekerjaan.

Dokumen harus tetap terlihat seperti dokumen bisnis standar dan mudah
dicetak. Tambahkan identitas merek secara ringan, bukan seperti brosur.

Sediakan field yang mudah diganti:
- Nama pelanggan.
- Alamat pelanggan.
- Kontak pelanggan.
- Nomor proposal.
- Tanggal.
- Jenis pekerjaan.
- Line items layanan.
- Jumlah.
- Pajak apabila diperlukan.
- Total.
- Jadwal perkiraan.
- Ketentuan pembayaran.
- Ketentuan perubahan pekerjaan.
- Persetujuan.
- Tanda tangan pelanggan.
- Tanda tangan perusahaan.

Gunakan placeholder untuk data yang belum diberikan.
Jangan mengarang ketentuan hukum spesifik.
Tandai bagian yang harus diperiksa oleh penasihat hukum.
```

---

## 38. Catatan Legal

Dokumen hasil AI adalah draft operasional, bukan jaminan kepatuhan hukum.

Sebelum digunakan:

- Minta peninjauan pengacara.
- Sesuaikan dengan hukum wilayah.
- Verifikasi pajak.
- Verifikasi garansi.
- Verifikasi pembatalan.
- Verifikasi pembayaran.
- Verifikasi lisensi dan asuransi.
- Jangan menggunakan placeholder pada kontrak final.

---

# BAGIAN VIII — MEMINDAHKAN HASIL KE CLAUDE CODE

## 39. Tujuan Konsolidasi

Claude Design menghasilkan prototype. Claude Code digunakan untuk:

- Mengambil seluruh hasil desain.
- Mengubahnya menjadi codebase.
- Menata file.
- Membuat tools internal.
- Membuat Claude Skills.
- Menyiapkan deployment.
- Melanjutkan iterasi melalui kode.

---

## 40. Mengirim Hasil Claude Design ke Claude Code

Untuk setiap aset:

1. Buka proyek di Claude Design.
2. Klik **Share**.
3. Pilih **Send to Claude Code**.
4. Salin prompt yang dihasilkan.
5. Tempelkan ke sesi Claude Code yang sama.

Kirim:

- Design system.
- Website.
- Dokumen kontrak.
- Pitch deck.
- Ad generator.
- Prototype lain yang relevan.

---

## 41. Prompt Konsolidasi Repositori

```text
Ambil seluruh file, desain, prototype, dan instruksi yang saya berikan dari
Claude Design.

Konsolidasikan semuanya ke dalam satu repositori yang terstruktur.

Tujuan repositori:

1. Menyimpan website publik Apex Roofing.
2. Menyiapkan website agar dapat dideploy ke Netlify.
3. Menyimpan design system sebagai sumber kebenaran visual.
4. Menyimpan tools internal.
5. Menyimpan generator dokumen.
6. Menyimpan generator pitch deck.
7. Menyimpan generator video ads.
8. Menyimpan lead qualifier.
9. Membuat Claude Skills agar saya dapat meminta Claude menjalankan tugas
   tersebut melalui instruksi natural language.
10. Menyediakan dokumentasi yang memungkinkan developer atau AI agent lain
    melanjutkan proyek.

Sebelum mengubah file:
- Audit seluruh input.
- Identifikasi duplikasi.
- Buat rencana struktur repositori.
- Tentukan dependency.
- Tentukan batas antara website publik dan tools internal.
- Jangan menghapus aset sumber.
- Jangan menaruh kredensial di source code.

Setelah rencana selesai, implementasikan struktur tersebut.
```

---

## 42. Struktur Repositori yang Disarankan

```text
apex-roofing/
├── .claude/
│   └── skills/
│       ├── apex-document/
│       │   └── SKILL.md
│       ├── apex-deck/
│       │   └── SKILL.md
│       ├── apex-video-ad/
│       │   └── SKILL.md
│       └── apex-lead-qualifier/
│           └── SKILL.md
│
├── design-system/
│   ├── README.md
│   ├── tokens/
│   ├── logos/
│   ├── fonts/
│   ├── components/
│   └── motion/
│
├── website/
│   ├── public/
│   │   ├── images/
│   │   ├── videos/
│   │   └── logos/
│   ├── src/
│   ├── netlify/
│   ├── netlify.toml
│   ├── package.json
│   └── README.md
│
├── tools/
│   ├── documents/
│   │   ├── templates/
│   │   ├── generated/
│   │   └── README.md
│   ├── decks/
│   │   ├── templates/
│   │   ├── generated/
│   │   └── README.md
│   ├── ads/
│   │   ├── assets/
│   │   ├── templates/
│   │   ├── generated/
│   │   └── README.md
│   └── lead-qualifier/
│       └── README.md
│
├── docs/
│   ├── architecture.md
│   ├── deployment.md
│   ├── content-guide.md
│   ├── asset-manifest.md
│   └── workflow.md
│
├── CLAUDE.md
├── README.md
├── .gitignore
└── .vscode/
    └── launch.json
```

Struktur aktual dapat berbeda sesuai framework dan hasil ekspor, tetapi pemisahan tanggung jawab harus dipertahankan.

---

## 43. Isi Minimum CLAUDE.md

```markdown
# CLAUDE.md

## Project
Apex Roofing digital design and operations repository.

## Primary Goals
- Maintain one consistent design system.
- Operate the public marketing website.
- Generate documents, decks, and video ads.
- Process and qualify incoming leads.
- Deploy safely to Netlify.

## Rules
1. Read this file before editing.
2. Inspect relevant README and SKILL.md files.
3. Do not modify brand tokens without documenting the decision.
4. Do not hardcode credentials.
5. Preserve source assets.
6. Use descriptive filenames.
7. Run tests and builds after changes.
8. Update progress documentation.
9. Explain breaking changes.
10. Keep public website code separate from internal tools.

## Design Source of Truth
See `/design-system`.

## Website
See `/website`.

## Internal Tools
See `/tools`.

## Claude Skills
See `/.claude/skills`.

## Deployment
See `/docs/deployment.md`.
```

---

## 44. Claude Skills yang Diharapkan

### Apex Document

Digunakan untuk membuat proposal atau service authorization berdasarkan data pelanggan.

Input:

- Data pelanggan.
- Line items.
- Harga.
- Tanggal.
- Ketentuan.

Output:

- Dokumen siap ditinjau.
- Tidak langsung dianggap legal final.

### Apex Deck

Digunakan untuk membuat presentasi pelanggan.

Input:

- Tujuan presentasi.
- Produk.
- Warna.
- Gambar.
- Durasi presentasi.

Output:

- Slide deck konsisten dengan design system.

### Apex Video Ad

Digunakan untuk membuat konsep dan aset iklan.

Input:

- Platform.
- Rasio.
- Durasi.
- Pain point.
- Layanan.
- CTA.
- Aset video.

Output:

- Storyboard.
- Prompt gambar.
- Prompt video.
- Copy.
- Komposisi iklan.

### Apex Lead Qualifier

Digunakan untuk menilai prospek berdasarkan:

- Lokasi.
- Jenis kebutuhan.
- Urgensi.
- Kontak.
- Kesesuaian service area.

Output:

- Status prospek.
- Prioritas.
- Ringkasan.
- Langkah tindak lanjut.

---

# BAGIAN IX — DEPLOYMENT KE NETLIFY

## 45. Menyiapkan Deployment

Claude Code diminta melakukan deployment dari direktori website.

### Prompt deployment

```text
Deploy website publik dari direktori `/website` ke akun Netlify yang
terhubung.

Sebelum deploy:
- Jalankan instalasi dependency.
- Jalankan lint apabila tersedia.
- Jalankan test apabila tersedia.
- Jalankan production build.
- Periksa konfigurasi Netlify.
- Pastikan asset path benar.
- Pastikan environment variables tidak berada di repository.

Setelah deploy:
- Berikan status build.
- Berikan URL website.
- Catat konfigurasi yang dibuat.
- Periksa halaman utama dan halaman layanan.
```

---

## 46. Menyesuaikan Service Area

Dalam video, lead qualifier lama masih menggunakan wilayah Denver. Ia harus disesuaikan ke wilayah yang benar.

### Instruksi perubahan wilayah

```text
Ubah seluruh referensi wilayah pada Apex Lead Qualifier agar sesuai dengan
service area Apex Roofing:

- Kalamazoo
- Portage
- Battle Creek
- Three Rivers
- Paw Paw
- Wilayah Southwest Michigan lain yang secara eksplisit disetujui.

Hapus referensi Denver.
Pastikan perubahan berlaku pada:
- Logic.
- Copy.
- Form.
- Validation.
- Dokumentasi.
- Test.
```

---

## 47. Membuat Login Admin

Hanya admin yang boleh melihat data prospek.

Jangan menaruh username dan password langsung di source code.

Gunakan environment variables, misalnya:

```text
ADMIN_USERNAME
ADMIN_PASSWORD
```

Nama variabel harus konsisten antara:

- Kode aplikasi.
- Netlify project settings.
- Dokumentasi deployment.
- Contoh `.env.example`.

### `.env.example`

```dotenv
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=replace-with-a-secure-password
```

File `.env.example` tidak boleh berisi password asli.

---

## 48. Menambahkan Environment Variables di Netlify

Langkah umum:

1. Masuk ke dashboard Netlify.
2. Buka project.
3. Buka **Project configuration**.
4. Buka **Environment variables**.
5. Tambahkan `ADMIN_USERNAME`.
6. Tandai sebagai secret apabila tersedia.
7. Tambahkan `ADMIN_PASSWORD`.
8. Terapkan pada deploy context yang diperlukan.
9. Trigger redeploy.

Kredensial yang digunakan di video tidak boleh disalin dari transkrip. Gunakan nilai milik pengguna sendiri.

---

## 49. Redeploy

Setelah environment variables ditambahkan:

- Jalankan deploy baru.
- Tunggu build selesai melalui dashboard atau CLI yang sedang aktif.
- Periksa log build.
- Pastikan aplikasi membaca environment variables.
- Uji login admin.
- Pastikan pesan error aman dan tidak membocorkan konfigurasi.

---

# BAGIAN X — PENGUJIAN END-TO-END

## 50. Uji Website Publik

Periksa:

- Homepage terbuka.
- Gambar termuat.
- Navigation bekerja.
- Dropdown layanan bekerja.
- Halaman layanan terbuka.
- Hover bekerja.
- Form dapat diisi.
- Mobile view baik.
- CTA bekerja.
- Tidak ada console error penting.

---

## 51. Uji Form Prospek

Gunakan data uji, bukan data pribadi nyata.

Contoh:

```text
Nama: Test Customer
Email: test@example.com
Phone: 000-000-0000
Service: Roof Repair
Urgency: As soon as possible
Message: Test submission
```

Periksa:

1. Form berhasil dikirim.
2. Pengguna menerima konfirmasi.
3. Data tersimpan atau diteruskan sesuai arsitektur.
4. Data tampil pada admin.
5. Tidak ada duplikasi yang tidak diinginkan.
6. Validasi field berjalan.
7. Input berbahaya tidak dirender sebagai HTML.

---

## 52. Uji Admin

Periksa:

- Login gagal dengan kredensial salah.
- Login berhasil dengan kredensial benar.
- Halaman admin tidak dapat dibuka tanpa autentikasi.
- Prospek baru tampil.
- Informasi prospek lengkap.
- Logout bekerja.
- Session tidak terbuka selamanya.
- Password tidak muncul di log atau halaman.
- Data prospek tidak dapat diakses melalui endpoint publik tanpa izin.

---

## 53. Uji Tools Internal

### Generator Dokumen

- Input terisi.
- Harga dihitung benar.
- Placeholder tidak tertinggal.
- Branding konsisten.
- Output dapat dibuka.
- Dokumen diberi status draft.

### Generator Deck

- Semua slide tersedia.
- Gambar terpetakan.
- Tidak ada overflow.
- Rasio slide benar.
- Brand konsisten.

### Generator Iklan

- Rasio sesuai platform.
- Copy dapat diganti.
- Video dapat diputar.
- CTA dan logo aman dari area UI.
- Export bekerja apabila tersedia.

### Lead Qualifier

- Service area benar.
- Denver sudah tidak ada.
- Prospek di luar wilayah ditandai dengan benar.
- Urgensi memengaruhi prioritas.
- Hasil memberikan alasan.

---

# BAGIAN XI — MASTER PROMPT UNTUK AI AGENT

## 54. Prompt Utama yang Dapat Digunakan Ulang

Prompt berikut dapat diberikan kepada AI agent untuk mencontoh workflow secara menyeluruh.

```text
Anda bertugas membangun dan memelihara ekosistem desain serta implementasi
digital untuk proyek ini.

Baca seluruh file yang tersedia sebelum melakukan perubahan.

Tujuan utama:
1. Membuat design system yang menjadi sumber kebenaran.
2. Membuat website prototype yang berfokus pada konversi.
3. Mendefinisikan kebutuhan aset visual dan prompt pembuatannya.
4. Mengintegrasikan gambar dan video.
5. Membuat generator iklan.
6. Membuat slide presentasi.
7. Membuat dokumen bisnis.
8. Mengonsolidasikan semuanya ke dalam satu repositori.
9. Membuat skills atau panduan agent.
10. Menyiapkan deployment dan pengujian.

Aturan kerja:
- Jangan langsung menulis kode sebelum memahami konteks.
- Audit file dan aset terlebih dahulu.
- Pertahankan seluruh keputusan design system.
- Jangan mengarang data bisnis nyata.
- Gunakan placeholder untuk informasi yang belum tersedia.
- Jangan menyimpan secret di source code.
- Pisahkan website publik dan tools internal.
- Gunakan nama file yang deskriptif.
- Dokumentasikan keputusan penting.
- Jangan menghapus aset sumber tanpa alasan yang jelas.
- Jalankan build, lint, dan test setelah perubahan.
- Laporkan file yang dibuat atau diubah.
- Laporkan keterbatasan yang belum selesai.
- Jangan menyatakan berhasil apabila belum diverifikasi.

Tahapan pelaksanaan:

FASE 1 — AUDIT
- Inventarisasi file.
- Identifikasi design system.
- Identifikasi prototype website.
- Identifikasi dokumen, deck, iklan, dan aset.
- Identifikasi dependency dan integrasi eksternal.
- Catat data atau kredensial yang masih dibutuhkan.

FASE 2 — RENCANA
- Buat struktur repositori.
- Tentukan source of truth.
- Tentukan pemisahan modul.
- Tentukan format aset.
- Tentukan strategi deployment.
- Tentukan test dan acceptance criteria.

FASE 3 — DESIGN SYSTEM
- Dokumentasikan logo, warna, font, typography, spacing, component, dan motion.
- Buat aturan pemakaian.
- Pastikan seluruh produk mengikuti aturan tersebut.

FASE 4 — WEBSITE
- Buat homepage.
- Buat free quote form.
- Buat navigation.
- Buat halaman layanan.
- Buat location section.
- Buat CTA.
- Pastikan responsive dan accessible.

FASE 5 — ASSETS
- Buat asset manifest.
- Berikan prompt, rasio, posisi, dan nama file.
- Integrasikan aset setelah tersedia.
- Optimalkan ukuran file.

FASE 6 — INTERNAL TOOLS
- Buat document generator.
- Buat slide deck generator.
- Buat video ad generator.
- Buat lead qualifier.
- Buat SKILL.md untuk setiap tool.

FASE 7 — DOKUMENTASI
- Buat README.md.
- Buat CLAUDE.md.
- Buat deployment.md.
- Buat architecture.md.
- Buat workflow.md.
- Buat .env.example tanpa secret.

FASE 8 — DEPLOYMENT
- Jalankan build produksi.
- Periksa Netlify configuration.
- Deploy.
- Tambahkan environment variables melalui konfigurasi platform.
- Redeploy.
- Catat URL dan status.

FASE 9 — QA
- Uji website.
- Uji seluruh link.
- Uji form.
- Uji login admin.
- Uji data prospek.
- Uji tools internal.
- Uji responsive.
- Uji error state.
- Uji keamanan dasar.

Output akhir:
- Ringkasan pekerjaan.
- Struktur repositori.
- Daftar file dibuat/diubah.
- Perintah menjalankan proyek.
- Perintah build.
- Panduan deployment.
- Environment variables yang diperlukan tanpa nilai rahasia.
- Hasil test.
- Keterbatasan atau pekerjaan lanjutan.
```

---

# BAGIAN XII — TEMPLATE PROGRESS AGENT

## 55. Format Laporan Setelah Setiap Fase

```markdown
## Progress Fase [Nomor] — [Nama Fase]

### Selesai
- ...

### File Dibuat
- `path/file`

### File Diubah
- `path/file`

### Keputusan
- ...

### Verifikasi
- Build: lulus/gagal
- Test: lulus/gagal
- Preview: lulus/gagal

### Kendala
- ...

### Langkah Berikutnya
- ...
```

---

## 56. Definition of Done

Pekerjaan dianggap selesai hanya apabila:

- Design system terdokumentasi.
- Website dapat dijalankan.
- Halaman utama dan layanan tersedia.
- Seluruh aset penting telah terintegrasi atau tercatat sebagai placeholder.
- Generator iklan memiliki preview yang dapat digunakan.
- Slide deck tersedia.
- Dokumen bisnis tersedia sebagai draft.
- Repositori terstruktur.
- CLAUDE.md tersedia.
- README tersedia.
- Claude Skills tersedia.
- Deployment berhasil.
- Environment variables terdokumentasi.
- Login admin diuji.
- Form prospek diuji.
- Data prospek dapat dilihat oleh admin.
- Build lulus.
- Tidak ada secret dalam repository.
- Keterbatasan dicatat secara jujur.

---

# BAGIAN XIII — URUTAN EKSEKUSI RINGKAS

## 57. Checklist Operasional

```text
[ ] Buat identitas perusahaan
[ ] Kumpulkan logo dan aset awal
[ ] Tentukan font
[ ] Tentukan palet warna
[ ] Generate design system
[ ] Review dan publish design system
[ ] Buat website prototype
[ ] Jawab pertanyaan klarifikasi
[ ] Aktifkan tweak controls
[ ] Generate daftar kebutuhan aset
[ ] Generate gambar website
[ ] Masukkan gambar ke website
[ ] Review website
[ ] Buat ad studio
[ ] Buat konsep problem-solution
[ ] Generate gambar iklan
[ ] Generate video setiap scene
[ ] Rangkai video iklan
[ ] Review iklan
[ ] Buat slide deck
[ ] Generate dan masukkan gambar slide
[ ] Review slide
[ ] Buat dokumen kontrak/proposal
[ ] Tandai kebutuhan legal review
[ ] Kirim semua prototype ke Claude Code
[ ] Konsolidasikan repositori
[ ] Buat Claude Skills
[ ] Buat dokumentasi
[ ] Sesuaikan service area
[ ] Siapkan Netlify
[ ] Tambahkan environment variables
[ ] Deploy
[ ] Uji website
[ ] Uji form
[ ] Uji login admin
[ ] Uji data prospek
[ ] Catat hasil dan pekerjaan lanjutan
```

---

# BAGIAN XIV — ADAPTASI UNTUK PROYEK LAIN

## 58. Variabel yang Harus Diganti

Untuk memakai workflow ini pada proyek lain, ganti:

```text
[COMPANY_NAME]
[COMPANY_DESCRIPTION]
[INDUSTRY]
[TARGET_AUDIENCE]
[SERVICE_LIST]
[SERVICE_AREA]
[TRUST_SIGNALS]
[FORM_FIELDS]
[BRAND_FONTS]
[BRAND_COLORS]
[LOGO_ASSETS]
[IMAGE_PLATFORM]
[VIDEO_PLATFORM]
[DEPLOYMENT_PLATFORM]
[ADMIN_AUTH_METHOD]
[INTERNAL_TOOLS]
```

---

## 59. Contoh Kerangka Prompt Adaptif

```text
Nama proyek:
[PROJECT_NAME]

Deskripsi:
[PROJECT_DESCRIPTION]

Pengguna utama:
[TARGET_USERS]

Tujuan bisnis:
[BUSINESS_GOALS]

Fitur publik:
[PUBLIC_FEATURES]

Tools internal:
[INTERNAL_TOOLS]

Design system:
[BRAND_REQUIREMENTS]

Aset tersedia:
[AVAILABLE_ASSETS]

Aset belum tersedia:
[MISSING_ASSETS]

Deployment:
[DEPLOYMENT_TARGET]

Batasan:
[CONSTRAINTS]

Acceptance criteria:
[ACCEPTANCE_CRITERIA]
```

---

# PENUTUP

Workflow pada video menunjukkan pola kerja berikut:

1. **Bangun identitas terlebih dahulu.**
2. **Gunakan design system untuk menjaga konsistensi.**
3. **Buat prototype visual.**
4. **Gunakan AI lain untuk menghasilkan aset yang dibutuhkan prototype.**
5. **Masukkan kembali aset ke desain.**
6. **Ubah prototype menjadi codebase.**
7. **Bangun skills dan tools internal.**
8. **Deploy.**
9. **Uji alur pengguna dari awal sampai akhir.**

Nilai utama workflow ini bukan hanya kemampuan menghasilkan website, gambar, video, slide, atau dokumen secara terpisah. Nilai utamanya adalah menghubungkan semua hasil tersebut ke dalam **satu sistem kerja yang konsisten, dapat diedit, dapat diteruskan oleh AI agent lain, dan dapat digunakan dalam operasional nyata**.
