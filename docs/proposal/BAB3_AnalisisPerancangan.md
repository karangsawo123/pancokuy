# BAB III. ANALISIS DAN PERANCANGAN SISTEM

---

## 3.1 Analisis Sistem

Analisis sistem merupakan tahapan awal dalam pengembangan perangkat lunak yang bertujuan untuk memahami secara komprehensif permasalahan yang terjadi serta mengidentifikasi kebutuhan sistem yang akan dibangun. Tahap ini menjembatani kondisi riil di lapangan dengan rancangan teknis yang akan diimplementasikan pada platform PancoKuy.

### 3.1.1 Analisis Kebutuhan Sistem

Berdasarkan hasil observasi awal dan studi pustaka terhadap pengelolaan komunitas *arm wrestling* di lapangan, ditemukan beberapa permasalahan utama. Pertama, informasi terkait lokasi latihan (*basecamp*), profil anggota, dan jadwal kegiatan tidak terpusat, sehingga calon anggota baru kesulitan untuk mencari dan bergabung dengan komunitas. Kedua, koordinasi yang saat ini sangat bergantung pada grup pesan instan (WhatsApp) rentan terhadap penumpukan pesan (*information overload*), di mana informasi penting sering kali tertimbun oleh percakapan lain. Ketiga, proses pencarian lawan latih tanding (sparing) masih dilakukan secara informal dan cenderung subjektif karena hanya berdasarkan pengamatan visual atas postur atau berat badan, padahal keseimbangan lawan sparing dalam olahraga panco dipengaruhi oleh banyak faktor seperti pengalaman, gaya bertanding, dan frekuensi latihan.

Untuk mengatasi permasalahan tersebut, dibutuhkan sebuah sistem informasi berbasis web berupa platform komunitas yang mengintegrasikan direktori anggota, jadwal, serta fitur pencocokan lawan sparing yang lebih terukur. Oleh karena itu, platform PancoKuy dirancang dengan dua pendekatan pencarian lawan:
1. **Sparing Matcher**: Fitur otomatis yang mengimplementasikan algoritma *Weighted Product* (WP) untuk merekomendasikan lawan latih tanding yang seimbang berdasarkan kecocokan berbagai kriteria profil atlet. Fitur ini dirancang khusus agar latihan berjalan efektif dan risiko cedera akibat ketidakseimbangan lawan dapat diminimalkan.
2. **Challenge Mode**: Fitur sekunder berupa pencarian manual melalui direktori anggota. Fitur ini memungkinkan pengguna untuk mencari dan menantang atlet lain secara langsung di luar perhitungan algoritma WP, guna memfasilitasi interaksi bebas antaranggota tanpa campur tangan mesin rekomendasi.

### 3.1.2 Kriteria Algoritma *Weighted Product*

Pada fitur *Sparing Matcher*, proses pencocokan lawan latih tanding menggunakan metode *Weighted Product* (WP). Karena tujuan utama dari fitur ini adalah mencari lawan sparing yang paling seimbang atau mirip dengan profil pengguna, sistem menggunakan **Pendekatan Konversi Skor Kecocokan**. 

Pada pendekatan ini, sistem terlebih dahulu menghitung nilai selisih (*delta*) atau tingkat kesamaan antara profil pengguna dan calon lawan. Hasil perhitungan selisih tersebut kemudian dikonversi menjadi Skor Kecocokan pada rentang skala 1 hingga 5. Semakin tinggi skor yang diperoleh, semakin tinggi pula tingkat kecocokan antara kedua atlet. Dengan demikian, seluruh kriteria yang digunakan dalam metode WP pada penelitian ini diperlakukan sebagai kriteria **Keuntungan (*Benefit*)**. Pendekatan ini digunakan untuk menghindari kemungkinan nilai nol pada input perhitungan WP serta menyamakan skala penilaian antar kriteria yang memiliki satuan berbeda. Nilai selisih (*delta*) tetap dihitung di balik sistem, namun hanya difungsikan sebagai dasar konversi ke dalam bentuk skor, bukan sebagai nilai *input* langsung pada perhitungan WP.

Berdasarkan analisis kebutuhan, ditetapkan 6 (enam) kriteria utama dalam perhitungan WP, yaitu:

**1. Lokasi Latihan Aktif (C1)**
Kriteria ini menilai kesesuaian lokasi latihan atau *basecamp* utama antara pengguna dengan calon lawan, bukan sekadar domisili tempat tinggal, karena latih tanding umumnya dilakukan di *basecamp*.
*   Sifat: Benefit
*   Skor Kecocokan:
    *   Sangat Cocok (5) = Satu lokasi latihan / *basecamp*
    *   Cocok (4) = Berbeda *basecamp* tetapi masih satu kota
    *   Cukup Cocok (3) = Kota yang berbatasan langsung
    *   Kurang Cocok (2) = Berbeda kota dalam satu provinsi
    *   Tidak Cocok (1) = Berbeda provinsi

**2. Berat Badan (C2)**
Kriteria ini menilai selisih berat badan (dalam kilogram) antara pengguna dan calon lawan.
*   Sifat: Benefit
*   Skor Kecocokan:
    *   Sangat Cocok (5) = Selisih 0 – 2 kg
    *   Cocok (4) = Selisih >2 – 4 kg
    *   Cukup Cocok (3) = Selisih >4 – 7 kg
    *   Kurang Cocok (2) = Selisih >7 – 10 kg
    *   Tidak Cocok (1) = Selisih >10 kg

**3. Lama Aktif Latihan (C3)**
Kriteria ini menilai selisih pengalaman atau lama aktif berlatih panco (dalam bulan). Pengguna cukup mengisi bulan dan tahun mulai latihan atau memilih kategori pengalaman yang tersedia agar pengisian data lebih realistis.
*   Sifat: Benefit
*   Skor Kecocokan:
    *   Sangat Cocok (5) = Selisih 0 – 6 bulan
    *   Cocok (4) = Selisih >6 – 12 bulan
    *   Cukup Cocok (3) = Selisih >12 – 24 bulan
    *   Kurang Cocok (2) = Selisih >24 – 36 bulan
    *   Tidak Cocok (1) = Selisih >36 bulan

**4. Frekuensi Latihan (C4)**
Kriteria ini menilai selisih rutinitas jumlah latihan dalam satu minggu.
*   Sifat: Benefit
*   Skor Kecocokan:
    *   Sangat Cocok (5) = Selisih 0 sesi latihan per minggu
    *   Cocok (4) = Selisih 1 sesi latihan per minggu
    *   Cukup Cocok (3) = Selisih 2 sesi latihan per minggu
    *   Kurang Cocok (2) = Selisih 3 sesi latihan per minggu
    *   Tidak Cocok (1) = Selisih >3 sesi latihan per minggu

**5. Tangan Sparing (C5)**
Kriteria ini menilai kesesuaian tangan yang dipilih oleh atlet untuk digunakan pada saat sesi latih tanding. Pilihan pengguna meliputi: Kanan, Kiri, atau Keduanya.
*   Sifat: Benefit
*   Skor Kecocokan:
    *   Sangat Cocok (5) = Terdapat kecocokan tangan yang dapat digunakan untuk sparing (misalnya Kanan-Kanan, Kiri-Kiri, Keduanya-Keduanya, Kanan-Keduanya, atau Kiri-Keduanya).
    *   Tidak Cocok (1) = Tidak terdapat kecocokan tangan sparing (misalnya Kanan-Kiri).

**6. Level Kemampuan (C6)**
Kriteria ini menilai selisih tingkat kemampuan atlet. Secara sistem, level akan dikonversi menjadi nilai numerik: Pemula (1), Semi Pro (2), dan Pro (3).
*   Sifat: Benefit
*   Skor Kecocokan:
    *   Sangat Cocok (5) = Level sama (selisih 0)
    *   Cukup Cocok (3) = Beda satu tingkat (selisih 1)
    *   Tidak Cocok (1) = Beda dua tingkat (selisih 2)

*Style* dominan tetap disimpan sebagai informasi profil atlet, tetapi tidak digunakan sebagai kriteria perhitungan WP. Hal ini disebabkan karena dalam latihan panco, perbedaan *style* tidak selalu menunjukkan ketidakcocokan. Atlet justru dapat membutuhkan variasi lawan dengan *style* berbeda untuk melatih teknik *counter* dan adaptasi strategi. Oleh karena itu, *style* dominan lebih tepat digunakan sebagai informasi tambahan pada profil anggota atau sebagai acuan pencarian manual melalui *Challenge Mode*.

### 3.1.3 Analisis Pembobotan Kriteria (W)

Dalam metode *Weighted Product*, masing-masing kriteria (C1 hingga C6) harus memiliki bobot kepentingan (*weight*) yang mencerminkan seberapa besar pengaruh kriteria tersebut terhadap keseimbangan lawan sparing. 

Pada penelitian ini, penentuan bobot awal kriteria tidak dilakukan secara sepihak oleh penulis, melainkan didasarkan pada wawancara terstruktur dengan senior atau pengurus komunitas *arm wrestling* sebagai penilai ahli (*expert judgement*). Wawancara tersebut bertujuan untuk memastikan bahwa nilai preferensi bobot memiliki pijakan yang valid pada kondisi nyata latihan atlet panco di lapangan. Hasil dari *expert judgement* tersebut akan dinormalisasi sehingga total bobot ternormalisasi sama dengan 1 ($\sum w_j = 1$), yang selanjutnya akan digunakan sebagai nilai eksponen (pangkat) dalam perhitungan algoritma WP.

### 3.1.4 Analisis Kebutuhan Perangkat Lunak (Non-Fungsional)

Kebutuhan non-fungsional menjelaskan spesifikasi teknis dan batasan operasional sistem yang akan dikembangkan. Spesifikasi perangkat lunak yang dibutuhkan untuk merancang dan menjalankan platform PancoKuy adalah sebagai berikut:
1.  **Platform Aplikasi**: Berbasis Web, sehingga dapat diakses lintas perangkat tanpa memerlukan instalasi khusus.
2.  **Antarmuka Pengguna**: Responsif (*Responsive Web Design*) agar tampilan dapat menyesuaikan berbagai ukuran layar (desktop, tablet, maupun *smartphone*).
3.  **Pengelolaan Basis Data**: Sistem manajemen basis data (DBMS) relasional untuk menyimpan data pengguna, profil/kriteria atlet, dan jadwal latihan.
4.  **Hak Akses Pengguna**: Terdapat batasan akses, di mana pengguna yang belum mendaftar hanya dapat melihat informasi dasar komunitas, sedangkan fitur *Sparing Matcher* dan *Challenge Mode* hanya dapat diakses oleh anggota yang telah terautentikasi dan melengkapi 6 (enam) data kriteria WP, memiliki minimal satu *basecamp* aktif, serta mengisi informasi profil pendukungnya.

---

## 3.2 Perancangan Sistem

Perancangan sistem merupakan tahapan untuk memodelkan spesifikasi sistem ke dalam bentuk cetak biru (*blueprint*) sebelum diimplementasikan ke dalam kode program. Tahap ini menjelaskan rancangan alur kerja platform PancoKuy secara komprehensif, baik dari sisi interaksi pengguna dan admin, maupun proses spesifik pada mesin rekomendasi lawan latih tanding (sparing) menggunakan algoritma *Weighted Product*. 

### 3.2.1 Perancangan Alur Sistem Secara Umum

Secara umum, alur penggunaan platform PancoKuy dirancang untuk mengakomodasi dua jenis interaksi, yaitu pencarian informasi dasar dan penggunaan fitur tingkat lanjut komunitas. Alur sistem secara umum berjalan sebagai berikut:
1.  Pengunjung membuka platform PancoKuy melalui web *browser*.
2.  Pengunjung dapat melihat informasi dasar komunitas, seperti direktori *basecamp*, jadwal atau *event* umum, serta kontak pengurus.
3.  Untuk mengakses fitur tingkat lanjut, pengguna diharuskan melakukan registrasi dan *login* ke dalam sistem.
4.  Setelah *login*, pengguna diwajibkan untuk melengkapi profil atlet, yang mencakup 6 (enam) kriteria WP yang dibutuhkan untuk fitur pencocokan lawan (Lokasi Latihan Aktif, Berat Badan, Lama Aktif Latihan, Frekuensi Latihan, Tangan Sparing, dan Level Kemampuan), beserta informasi profil pendukung seperti *style* dominan.
5.  Pengguna terautentikasi dapat mengakses fitur utama anggota, meliputi direktori komunitas (*basecamp*), kontak pengurus atau senior, jadwal latihan atau *event*, profil anggota, fitur *Challenge Mode*, dan fitur *Sparing Matcher*.
6.  Apabila pengguna memilih fitur *Challenge Mode*, pengguna melakukan pencarian secara manual melalui direktori anggota tanpa menggunakan perhitungan algoritma WP. Fitur ini memungkinkan anggota mencari calon lawan secara mandiri melalui direktori anggota, tanpa memengaruhi hasil rekomendasi pada fitur *Sparing Matcher*.
7.  Apabila pengguna memilih fitur *Sparing Matcher*, sistem akan mengumpulkan data profil calon lawan dan menjalankan proses rekomendasi secara otomatis menggunakan algoritma *Weighted Product*.
8.  Sistem menampilkan daftar *ranking* rekomendasi lawan sparing berdasarkan nilai preferensi tertinggi yang paling seimbang dengan profil pengguna.
9.  Dari kedua jalur tersebut (fitur *Sparing Matcher* maupun *Challenge Mode*), pengguna dapat menekan tombol **"Ajukan Sparing"** untuk mengirimkan permintaan latih tanding kepada calon lawan. Pengajuan interaksi ini akan dicatat oleh sistem secara universal.

### 3.2.2 *Flowchart* Sistem Keseluruhan

*Flowchart* sistem keseluruhan menggambarkan urutan proses operasional pada platform PancoKuy dari awal hingga akhir. Alur *flowchart* dirancang sebagai berikut:
1.  **Mulai**: Pengguna membuka platform PancoKuy.
2.  Sistem menampilkan Halaman Utama (*Home*).
3.  Sistem mengecek status sesi pengguna (Apakah pengguna sudah *login*?).
    *   Jika **Belum**, pengguna hanya dapat melihat informasi dasar atau diarahkan ke proses Registrasi/*Login*.
    *   Jika **Sudah**, sistem akan mengecek kelengkapan profil atlet pengguna.
4.  Sistem mengecek kelengkapan profil atlet pengguna, yaitu kelengkapan 6 (enam) kriteria WP dan minimal satu *basecamp* aktif.
    *   Jika profil **Belum Lengkap** (kriteria WP belum terisi lengkap atau belum memiliki minimal satu *basecamp* aktif), pengguna diarahkan ke halaman pengelolaan profil untuk melengkapi data.
    *   Jika profil **Sudah Lengkap** (seluruh kriteria WP terisi dan memiliki minimal satu *basecamp* aktif), pengguna diberikan akses penuh menuju fitur-fitur anggota.
5.  Pengguna memilih fitur yang ingin diakses, yang terdiri dari menu Direktori Komunitas, Jadwal Latihan, Profil Anggota, *Challenge Mode*, atau *Sparing Matcher*.
6.  Jika pengguna memilih menu **Challenge Mode**, sistem akan menampilkan daftar direktori anggota untuk keperluan pencarian manual oleh pengguna.
7.  Jika pengguna memilih menu **Sparing Matcher**, sistem akan memproses algoritma *Weighted Product* terhadap data profil anggota lainnya.
8.  Sistem menampilkan hasil rekomendasi lawan latih tanding secara terurut.
9.  **Selesai**.

### 3.2.3 *Flowchart* Algoritma *Weighted Product* pada *Sparing Matcher*

Alur spesifik dari algoritma *Weighted Product* pada fitur *Sparing Matcher* dirancang untuk memproses profil pengguna terhadap profil atlet lainnya agar menghasilkan rekomendasi yang seimbang. Alur algoritma tersebut adalah sebagai berikut:
1.  **Mulai**.
2.  Sistem mengambil data profil dari pengguna aktif (yang sedang mencari lawan latih tanding).
3.  Sistem mengambil data profil calon lawan dari *database*, yaitu anggota lain yang telah terautentikasi dan memiliki data kriteria *Sparing Matcher* yang lengkap.
4.  Sistem mengecualikan profil pengguna aktif itu sendiri dari daftar alternatif calon lawan.
5.  Apabila tidak terdapat calon lawan yang memenuhi kelengkapan data profil, sistem menampilkan pesan bahwa rekomendasi belum tersedia. Jika terdapat calon lawan, sistem melanjutkan ke tahap perhitungan.
6.  Sistem menghitung nilai selisih (*delta*) atau tingkat kesamaan antara pengguna dan masing-masing calon lawan berdasarkan 6 (enam) kriteria: lokasi latihan aktif, berat badan, lama aktif latihan, frekuensi latihan, tangan sparing, dan level kemampuan.
7.  Sistem mengonversi hasil perhitungan selisih/kesamaan tersebut menjadi skor kecocokan dalam rentang skala 1 hingga 5.
8.  Sistem mengambil nilai bobot awal kriteria yang telah ditetapkan sebelumnya berdasarkan hasil wawancara terstruktur (*expert judgement*).
9.  Sistem melakukan proses normalisasi bobot, sehingga total bobot ternormalisasi sama dengan 1.
    $$w_j = \frac{W_j}{\sum W_j}$$
10. Sistem menghitung nilai vektor S untuk setiap calon lawan. Pada perhitungan ini, karena nilai *input* telah dikonversi menjadi Skor Kecocokan, maka seluruh kriteria bersifat **Benefit** (semakin besar semakin baik).
    $$S_i = \prod_{j=1}^{n} x_{ij}^{w_j}$$
    Di mana $x_{ij}$ adalah skor kecocokan calon lawan ke-$i$ pada kriteria ke-$j$.
11. Sistem menghitung nilai vektor V (nilai preferensi) dengan membagi nilai vektor S milik suatu alternatif terhadap jumlah keseluruhan nilai vektor S.
    $$V_i = \frac{S_i}{\sum S_i}$$
12. Sistem mengurutkan nilai vektor V dari yang terbesar ke terkecil. Nilai $V_i$ tertinggi menunjukkan calon lawan yang paling seimbang dan paling direkomendasikan.
13. Sistem menampilkan daftar rekomendasi lawan latih tanding (*sparing*) kepada pengguna.
14. **Selesai**.

### 3.2.4 *Use Case Diagram*

*Use Case Diagram* digunakan untuk menggambarkan fungsionalitas yang diharapkan dari sebuah sistem dengan merepresentasikan interaksi antara aktor dan sistem. Pada platform PancoKuy, terdapat 3 (tiga) aktor utama yang berinteraksi, yaitu Pengunjung, Anggota (*User*), dan Admin.

**1. Aktor: Pengunjung**
Pengunjung adalah *user* publik yang belum terautentikasi. Interaksi yang dapat dilakukan meliputi:
*   Melihat informasi dasar komunitas.
*   Melihat jadwal latihan atau *event* secara umum.
*   Melakukan registrasi dan *login* ke dalam sistem.

**2. Aktor: Anggota (*User*)**
Anggota adalah pengguna yang telah terautentikasi dan memiliki kelengkapan profil. Interaksi yang dapat dilakukan meliputi:
*   Mengelola profil atlet (melengkapi kriteria profil).
*   Melihat direktori komunitas atau *basecamp*.
*   Melihat kontak pengurus atau senior.
*   Melihat jadwal latihan atau *event* komunitas.
*   Melihat profil anggota lain.
*   Menggunakan fitur *Challenge Mode* (pencarian lawan manual).
*   Menggunakan fitur *Sparing Matcher*.
*   Melihat hasil rekomendasi lawan latih tanding.
*   Mengajukan permintaan latih tanding (*Sparing Request*).

**3. Aktor: Admin**
Admin adalah pengguna dengan hak akses penuh untuk mengelola konten dan data master platform. Interaksi yang dapat dilakukan meliputi:
*   Mengelola data komunitas atau *basecamp*.
*   Mengelola jadwal latihan dan pengumuman *event*.
*   Mengelola data anggota dan profil atlet.
*   Mengelola data bobot kriteria WP berdasarkan hasil *expert judgement*.

### 3.2.5 Diagram Konteks atau *Data Flow Diagram* (DFD) Level 0

Dalam perancangan sistem PancoKuy, Use Case Diagram dan Diagram Konteks (DFD Level 0) digunakan untuk menjelaskan dua sudut pandang yang berbeda. Use Case Diagram digunakan untuk menggambarkan fungsi sistem berdasarkan aktor dan hak akses pengguna, sedangkan Diagram Konteks (DFD Level 0) digunakan untuk menggambarkan aliran data secara umum antara entitas eksternal dengan sistem. Dengan demikian, kedua diagram tidak diposisikan sebagai model yang saling menggantikan, melainkan sebagai representasi pelengkap dalam menjelaskan kebutuhan fungsional dan aliran data utama pada platform PancoKuy.

Diagram Konteks (DFD Level 0) memodelkan aliran data secara garis besar antara entitas eksternal dengan proses utama sistem. 

**Entitas Eksternal:**
Entitas eksternal yang terlibat dalam sistem adalah Pengunjung, Anggota (*User*), dan Admin.

**Proses Utama:**
Seluruh aliran data bermuara pada satu proses utama, yaitu **Sistem PancoKuy**.

**Aliran Data (*Data Flow*):**
*   **Pengunjung** memberikan aliran data berupa pengajuan data registrasi/login ke sistem. Sistem memberikan informasi kembali berupa data dasar komunitas dan jadwal umum.
*   **Anggota (*User*)** memberikan aliran data berupa kredensial *login*, pembaruan data profil atlet (kriteria *Sparing Matcher*), serta interaksi pencarian dan pengajuan lawan latih tanding. Sebagai timbal balik, sistem mengalirkan data direktori komunitas, jadwal latihan atau *event*, data profil anggota lain, dan *output* berupa hasil rekomendasi lawan latih tanding (dari algoritma WP).
*   **Admin** memberikan aliran data berupa penambahan atau pengubahan data komunitas/basecamp, data jadwal/*event*, pengelolaan data anggota dan profil atlet, serta penyetelan data bobot WP (berdasarkan ketetapan *expert judgement*). Sistem merespons dengan menampilkan informasi laporan rekapitulasi data master platform kepada admin.

---

## 3.3 Perancangan Basis Data

Perancangan basis data digunakan untuk merancang struktur penyimpanan informasi pada platform PancoKuy. Basis data ini akan menyimpan data krusial seperti akun pengguna, profil atlet, direktori lokasi latihan (*basecamp*), jadwal atau *event*, bobot kriteria algoritma *Weighted Product*, serta data pengajuan latih tanding (*sparing*). Struktur tabel dirancang agar berfokus pada kebutuhan utama sistem dalam mendukung fitur direktori dan *Sparing Matcher*, tanpa melebar ke fitur pengembangan lanjutan.

### 3.3.1 *Entity Relationship Diagram* (ERD)

Representasi relasi antar entitas utama pada platform PancoKuy dimodelkan dalam bentuk *Entity Relationship Diagram* (ERD) berikut:

```text
users ||──o| profil_atlet : satu user memiliki nol atau satu profil atlet
profil_atlet ||──o{ profil_atlet_basecamp : satu profil atlet dapat terhubung ke banyak basecamp
basecamp ||──o{ profil_atlet_basecamp : satu basecamp dapat digunakan oleh banyak profil atlet
basecamp ||──o{ events : satu basecamp dapat memiliki banyak event
users ||──o{ sparing_requests : satu user dapat mengajukan banyak request
users ||──o{ sparing_requests : satu user dapat menerima banyak request
users ||──o{ wp_criteria : satu admin dapat memperbarui banyak data bobot kriteria
```

Tabel `wilayah_kota_berbatasan` merupakan tabel referensi (*lookup table*) mandiri yang digunakan untuk membantu penentuan skor pada kriteria Lokasi Latihan Aktif (C1) dan tidak bertindak sebagai tabel transaksi utama.

### 3.3.2 Relasi Antar Tabel

Berdasarkan rancangan ERD di atas, relasi antar tabel didefinisikan secara akademis sebagai berikut:
*   Tabel `users` ke `profil_atlet` adalah relasi *one-to-one*, karena satu akun anggota hanya berhak memiliki maksimal satu profil atlet.
*   Tabel `profil_atlet` ke `basecamp` adalah relasi *many-to-many* melalui tabel *pivot* `profil_atlet_basecamp`. Hal ini dikarenakan satu atlet dapat aktif berlatih di lebih dari satu *basecamp*, dan sebaliknya, satu *basecamp* dapat memiliki banyak atlet.
*   Tabel `basecamp` ke `events` memiliki relasi *one-to-many*, karena satu *basecamp* dapat menyelenggarakan berbagai jadwal latihan atau acara.
*   Tabel `users` memiliki dua relasi terhadap tabel `sparing_requests`, yakni bertindak sebagai pihak pengaju tantangan (`requester_id`) maupun sebagai pihak lawan yang diajukan (`opponent_id`).
*   Tabel `users` (dengan *role* admin) terhubung ke tabel `wp_criteria` melalui kolom `updated_by` yang menunjukkan admin terakhir yang memperbarui nilai bobot kriteria.
*   Tabel `wilayah_kota_berbatasan` digunakan murni sebagai data referensi bagi sistem untuk mengecek ketersinggungan antar wilayah kota/kabupaten.

**Catatan Penting Kelengkapan Profil:**
*   Profil seorang atlet dianggap lengkap dan memenuhi syarat untuk dihitung dalam proses rekomendasi *Sparing Matcher* apabila data utama di tabel `profil_atlet` telah terisi **dan** terdapat minimal satu rekaman data berstatus aktif pada tabel `profil_atlet_basecamp`.
*   Karena Kriteria C1 didasarkan pada lokasi latihan aktif, pengecekan kelengkapan profil tidak cukup hanya memvalidasi tabel `profil_atlet`, melainkan harus memvalidasi data pada tabel *pivot* `profil_atlet_basecamp`.
*   Untuk proses penilaian C1, sistem akan membandingkan seluruh *basecamp* aktif milik pengguna terhadap seluruh *basecamp* aktif milik calon lawan, kemudian mengambil skor lokasi terbaik sebagai *input* perhitungan.

### 3.3.3 Spesifikasi Tabel

Berikut adalah spesifikasi detail dari struktur kolom, tipe data, dan konstrain pada masing-masing tabel yang dirancang.

#### Tabel `users`
Tabel ini menyimpan data akun dan hak akses pengguna.

| Kolom | Tipe Data | Kunci / Constraint |
| :--- | :--- | :--- |
| `id` | BIGINT/INT | Primary Key |
| `nama` | VARCHAR | - |
| `email` | VARCHAR | Unique |
| `password_hash` | VARCHAR | - |
| `role` | ENUM('anggota', 'admin') | - |
| `created_at` | TIMESTAMP | - |
| `updated_at` | TIMESTAMP | - |

#### Tabel `profil_atlet`
Tabel ini menyimpan data teknis atlet, yang digunakan sebagai *input* algoritma WP maupun informasi profil secara umum.

| Kolom | Tipe Data | Kunci / Constraint |
| :--- | :--- | :--- |
| `id` | BIGINT/INT | Primary Key |
| `user_id` | BIGINT/INT | Foreign Key -> `users.id`, Unique |
| `berat_badan` | DECIMAL(5,2) | - |
| `bulan_mulai_latihan` | TINYINT | - |
| `tahun_mulai_latihan` | SMALLINT | - |
| `frekuensi_latihan` | TINYINT | - |
| `style_dominan` | ENUM('Toproll', 'Hook', 'Press', 'Kingsmove', 'Belum Teridentifikasi') | - |
| `tangan_sparing` | ENUM('Kanan', 'Kiri', 'Keduanya') | - |
| `level_kemampuan` | TINYINT | - |
| `created_at` | TIMESTAMP | - |
| `updated_at` | TIMESTAMP | - |

*Keterangan:*
*   `level_kemampuan`: 1 = Pemula, 2 = Semi Pro, 3 = Pro.
*   `style_dominan` murni sebagai informasi profil tambahan (*non-WP*) dan tidak digunakan sebagai kriteria perhitungan algoritma WP.
*   `bulan_mulai_latihan` dan `tahun_mulai_latihan` digunakan untuk menghitung total lama aktif berlatih (dalam bentuk bulan) secara dinamis setiap kali proses *Sparing Matcher* dijalankan. Penyimpanan dalam format ini menghindarkan penggunaan *date* spesifik yang sulit diingat pengguna, sekaligus meminimalisasi penyimpanan kategori pengalaman yang statis di basis data.

#### Tabel `basecamp`
Tabel ini menyimpan data komunitas atau lokasi latihan fisik panco.

| Kolom | Tipe Data | Kunci / Constraint |
| :--- | :--- | :--- |
| `id` | BIGINT/INT | Primary Key |
| `nama_basecamp` | VARCHAR | - |
| `alamat` | TEXT/VARCHAR | - |
| `kota` | VARCHAR | - |
| `provinsi` | VARCHAR | - |
| `kontak_pengurus` | VARCHAR | - |
| `created_by` | BIGINT/INT | Foreign Key -> `users.id` |
| `created_at` | TIMESTAMP | - |
| `updated_at` | TIMESTAMP | - |

#### Tabel `profil_atlet_basecamp`
Tabel ini bertindak sebagai tabel *pivot* (*many-to-many*) antara profil atlet dan *basecamp*. 

| Kolom | Tipe Data | Kunci / Constraint |
| :--- | :--- | :--- |
| `id` | BIGINT/INT | Primary Key |
| `profil_atlet_id` | BIGINT/INT | Foreign Key -> `profil_atlet.id` |
| `basecamp_id` | BIGINT/INT | Foreign Key -> `basecamp.id` |
| `is_aktif` | BOOLEAN | - |
| `created_at` | TIMESTAMP | - |
| `updated_at` | TIMESTAMP | - |

*Keterangan:* 
Tabel ini diperlukan karena sangat realistis bagi seorang atlet panco untuk berlatih di lebih dari satu *basecamp* aktif. Terdapat konstrain `UNIQUE (profil_atlet_id, basecamp_id)` untuk menghindari duplikasi rekaman lokasi yang sama untuk satu atlet.

#### Tabel `wilayah_kota_berbatasan`
Tabel ini merupakan tabel referensi untuk membantu penentuan skor C1 Lokasi Latihan Aktif pada kondisi kota/kabupaten yang berbatasan langsung.

| Kolom | Tipe Data | Kunci / Constraint |
| :--- | :--- | :--- |
| `id` | BIGINT/INT | Primary Key |
| `kota_a` | VARCHAR | - |
| `kota_b` | VARCHAR | - |
| `provinsi` | VARCHAR | - |

*Keterangan:* 
Pengecekan hubungan batas kota oleh sistem akan dilakukan secara dua arah, yaitu: (`kota_a` = X dan `kota_b` = Y), atau (`kota_a` = Y dan `kota_b` = X).

#### Tabel `events`
Tabel ini menyimpan jadwal latihan rutin, *event*, atau lomba.

| Kolom | Tipe Data | Kunci / Constraint |
| :--- | :--- | :--- |
| `id` | BIGINT/INT | Primary Key |
| `basecamp_id` | BIGINT/INT | Foreign Key -> `basecamp.id`, Nullable |
| `judul_event` | VARCHAR | - |
| `jenis_event` | VARCHAR | - |
| `tanggal_event` | DATE | - |
| `waktu_mulai` | TIME | - |
| `waktu_selesai` | TIME | Nullable |
| `lokasi` | VARCHAR/TEXT | - |
| `deskripsi` | TEXT | - |
| `created_by` | BIGINT/INT | Foreign Key -> `users.id` |
| `created_at` | TIMESTAMP | - |
| `updated_at` | TIMESTAMP | - |

*Keterangan:* 
Kolom `waktu_selesai` dapat bernilai kosong (nullable) apabila jadwal selesainya kegiatan belum dapat dipastikan. Kolom `basecamp_id` juga dapat bernilai kosong apabila event atau lomba tidak terikat pada *basecamp* tertentu.

#### Tabel `wp_criteria`
Tabel ini menyimpan data kriteria beserta nilai bobot algoritma WP. Isi dari tabel ini difokuskan hanya pada 6 kriteria WP: C1 (Lokasi Latihan Aktif), C2 (Berat Badan), C3 (Lama Aktif Latihan), C4 (Frekuensi Latihan), C5 (Tangan Sparing), dan C6 (Level Kemampuan).

| Kolom | Tipe Data | Kunci / Constraint |
| :--- | :--- | :--- |
| `id` | BIGINT/INT | Primary Key |
| `kode_kriteria` | VARCHAR | Unique |
| `nama_kriteria` | VARCHAR | - |
| `nilai_bobot_awal` | DECIMAL | - |
| `bobot_normalisasi` | DECIMAL | - |
| `updated_by` | BIGINT/INT | Foreign Key -> `users.id`, Nullable |
| `updated_at` | TIMESTAMP | - |

*Keterangan:*
*   *Style* dominan tidak dimasukkan ke dalam tabel ini.
*   `nilai_bobot_awal` bersumber dari wawancara terstruktur bersama pihak *expert judgement*.
*   `bobot_normalisasi` digunakan dalam perhitungan eksponen rumus WP. Total seluruh bobot normalisasi harus berjumlah 1 ($\sum w_j = 1$).
*   Logika perhitungan ulang: Setiap kali admin melakukan pembaruan pada salah satu `nilai_bobot_awal`, secara logis aplikasi akan menghitung ulang seluruh nilai `bobot_normalisasi` agar syarat perhitungan WP tetap terpenuhi.

#### Tabel `sparing_requests`
Tabel ini mencatat seluruh interaksi pengajuan tantangan latih tanding, baik yang berasal dari fitur otomatis maupun manual.

| Kolom | Tipe Data | Kunci / Constraint |
| :--- | :--- | :--- |
| `id` | BIGINT/INT | Primary Key |
| `requester_id` | BIGINT/INT | Foreign Key -> `users.id` |
| `opponent_id` | BIGINT/INT | Foreign Key -> `users.id` |
| `source` | ENUM('sparing_matcher', 'challenge_mode') | - |
| `wp_score` | DECIMAL(10,6) | Nullable |
| `status` | ENUM('pending', 'accepted', 'rejected', 'completed', 'cancelled') | Default: 'pending' |
| `message` | TEXT | Nullable |
| `created_at` | TIMESTAMP | - |
| `updated_at` | TIMESTAMP | - |

*Keterangan:*
*   Tabel ini mencatat pengajuan sparing dari dua jalur. Jika `source` = 'sparing_matcher', maka nilai preferensi WP saat pengguna menekan tombol "Ajukan Sparing" dapat disimpan di kolom `wp_score`. Jika `source` = 'challenge_mode', maka nilai `wp_score` dibiarkan *Null* (kosong) karena fitur tersebut tidak menggunakan perhitungan WP.
*   Tabel ini berfungsi sebagai tabel pencatatan transaksi interaksi (*request*), **bukan** sebagai tabel riwayat *ranking* WP secara permanen. Hasil perangkingan WP tetap murni dihitung secara *real-time*.
*   Terdapat aturan validasi di tingkat aplikasi yang memastikan bahwa `requester_id` tidak boleh sama nilainya dengan `opponent_id`.

### 3.3.4 Keterkaitan Basis Data dengan Algoritma WP

Rancangan tabel pada basis data PancoKuy telah diselaraskan untuk mendukung penuh proses *Sparing Matcher* tanpa memerlukan tabel *history* yang berlebihan. Keterkaitan proses perhitungan WP dengan basis data dapat dijelaskan sebagai berikut:
1.  **Sumber Data Kriteria**: Untuk mendapatkan data C1 (Lokasi Latihan Aktif), sistem menarik data dari relasi antara `profil_atlet_basecamp`, `basecamp`, dan `wilayah_kota_berbatasan`. Sedangkan untuk data kriteria C2 hingga C6, sistem menarik data secara langsung dari tabel `profil_atlet`.
2.  **Sumber Bobot Algoritma**: Bobot algoritma ditarik dari kolom `bobot_normalisasi` yang tersimpan pada tabel `wp_criteria`.
3.  **Data Diabaikan**: Meskipun atribut *style* dominan melekat pada entitas `profil_atlet`, sistem akan mengecualikan data tersebut saat melakukan kalkulasi matematis karena statusnya adalah *non-WP*.
4.  **Siklus Rekomendasi**: Algoritma WP bekerja menghasilkan daftar rekomendasi (*ranking*) yang ditampilkan *real-time* kepada pengguna. Sistem tidak menyimpan deretan *ranking* ke tabel mana pun. Aksi penyimpanan (pencatatan data) baru akan terjadi saat pengguna menekan tombol "Ajukan Sparing", yang mana data tersebut kemudian dicatat secara tunggal ke dalam tabel `sparing_requests`.

---

## 3.4 Perancangan Antarmuka

Perancangan antarmuka (*user interface*) merupakan tahapan untuk merancang tampilan visual yang akan menjadi titik interaksi antara pengguna dengan sistem. Perancangan ini disusun dengan mengacu pada analisis kebutuhan (Subbab 3.1), alur sistem dan *use case* (Subbab 3.2), serta struktur basis data (Subbab 3.3). Berikut adalah rancangan antarmuka untuk halaman-halaman utama pada platform PancoKuy.

### 3.4.1 Rancangan Halaman Utama (*Home*)

Halaman utama merupakan halaman pertama yang ditampilkan saat pengguna membuka platform PancoKuy melalui *web browser*. Halaman ini berfungsi sebagai pintu masuk utama yang memberikan gambaran umum mengenai platform kepada pengunjung maupun anggota yang sudah terautentikasi. Elemen-elemen yang dirancang pada halaman utama meliputi:
1.  **Navigasi Utama (*Header*)**: Menampilkan logo dan identitas PancoKuy serta menu navigasi menuju halaman-halaman utama platform, yaitu Home, Basecamp, Event, Direktori Anggota, Sparing Matcher, Challenge Mode, dan Profil. Bagi pengunjung yang belum *login*, menu-menu yang memerlukan autentikasi (Profil, Direktori Anggota, Sparing Matcher, dan Challenge Mode) disembunyikan, dinonaktifkan, atau diarahkan ke halaman Login/Registrasi apabila diakses, sehingga navigasi hanya menampilkan akses ke informasi dasar komunitas (Home, Basecamp, Event) serta tombol Registrasi atau *Login*. Bagi anggota yang telah terautentikasi, navigasi menampilkan seluruh menu fitur anggota sesuai rancangan *Use Case* pada Subbab 3.2.4 dan batasan hak akses pada Subbab 3.1.4.
2.  **Bagian Utama (*Hero Section*)**: Menampilkan judul atau *tagline* platform, deskripsi singkat mengenai tujuan dan manfaat PancoKuy, serta tombol aksi utama (*call-to-action*) yang mengarahkan pengunjung baru untuk mendaftar atau mengarahkan anggota ke fitur Sparing Matcher.
3.  **Ringkasan Informasi Komunitas**: Menampilkan ikhtisar data komunitas secara sekilas, seperti jumlah *basecamp* terdaftar, jumlah anggota aktif, dan jumlah *event* yang akan datang, guna memberikan gambaran aktivitas komunitas kepada pengunjung.
4.  ***Footer***: Menampilkan informasi hak cipta serta tautan pendukung.

### 3.4.2 Rancangan Halaman Registrasi dan *Login*

Halaman registrasi dan *login* berfungsi sebagai gerbang autentikasi pengguna ke dalam sistem PancoKuy. Rancangan antarmuka halaman ini meliputi:
1.  **Formulir Registrasi**: Menyediakan kolom *input* untuk data akun dasar yang dibutuhkan sesuai struktur tabel `users` (Subbab 3.3.3), meliputi nama lengkap, alamat *email*, dan kata sandi. Terdapat tombol "Daftar" untuk mengirimkan data registrasi ke sistem.
2.  **Formulir *Login***: Menyediakan kolom *input* berupa *email* dan kata sandi, beserta tombol "Masuk" untuk proses autentikasi. Terdapat tautan untuk beralih ke formulir registrasi bagi pengguna yang belum memiliki akun.

Setelah proses *login* berhasil, sistem akan mengecek kelengkapan profil atlet pengguna sesuai alur *Flowchart* pada Subbab 3.2.2. Apabila 6 (enam) kriteria WP dan minimal satu *basecamp* aktif belum lengkap, pengguna akan diarahkan ke halaman pengelolaan profil atlet.

### 3.4.3 Rancangan Halaman Profil Atlet

Halaman profil atlet berfungsi sebagai antarmuka bagi pengguna untuk mengelola data profil yang akan digunakan sebagai *input* kriteria *Sparing Matcher* maupun sebagai informasi yang ditampilkan pada direktori anggota. Elemen-elemen yang dirancang meliputi:
1.  **Informasi Identitas**: Menampilkan nama pengguna dan informasi dasar profil atlet.
2.  **Formulir Data Kriteria WP**: Menyediakan kolom *input* atau pilihan untuk mengisi 6 (enam) kriteria yang dibutuhkan algoritma WP, yaitu:
    *   Lokasi latihan aktif atau *basecamp* (pemilihan satu atau lebih *basecamp* aktif dari daftar *basecamp* yang tersedia pada sistem, sesuai rancangan tabel *pivot* `profil_atlet_basecamp`).
    *   Berat badan (dalam kilogram).
    *   Bulan dan tahun mulai latihan (untuk menghitung lama aktif latihan secara dinamis oleh sistem sesuai rancangan kolom `bulan_mulai_latihan` dan `tahun_mulai_latihan` pada tabel `profil_atlet`).
    *   Frekuensi latihan (jumlah sesi per minggu).
    *   Tangan sparing (pilihan: Kanan, Kiri, atau Keduanya).
    *   Level kemampuan (pilihan: Pemula, Semi Pro, atau Pro).
3.  **Informasi Profil Pendukung**: Menyediakan pilihan untuk mengisi *style* dominan (Toproll, Hook, Press, Kingsmove, atau Belum Teridentifikasi). Data ini ditampilkan sebagai informasi profil tambahan dan **tidak** digunakan dalam perhitungan algoritma WP.
4.  **Indikator Kelengkapan Profil**: Menampilkan status kelengkapan data profil. Profil dianggap lengkap dan memenuhi syarat untuk fitur *Sparing Matcher* apabila seluruh 6 (enam) kriteria WP telah terisi **dan** terdapat minimal satu *basecamp* aktif yang terdaftar (sesuai catatan kelengkapan profil pada Subbab 3.3.2).
5.  **Tombol Simpan atau Perbarui**: Untuk menyimpan atau memperbarui data profil ke dalam basis data.

### 3.4.4 Rancangan Halaman Direktori *Basecamp*

Halaman direktori *basecamp* berfungsi untuk menampilkan daftar seluruh lokasi latihan atau komunitas panco yang terdaftar pada platform PancoKuy. Halaman ini membedakan informasi yang ditampilkan berdasarkan status autentikasi pengguna:

*   **Pengunjung umum (belum *login*)** dapat melihat informasi dasar *basecamp*, meliputi nama *basecamp*, alamat, kota, provinsi, jadwal atau *event* umum yang terkait, serta kontak pengurus.
*   **Anggota yang sudah *login*** dapat melihat informasi yang lebih lengkap, seperti daftar anggota aktif pada *basecamp* tersebut jika diperlukan (berdasarkan data tabel *pivot* `profil_atlet_basecamp`).

Elemen-elemen yang dirancang meliputi:
1.  **Daftar *Basecamp***: Menampilkan daftar *basecamp* dalam format kartu atau daftar terstruktur yang memuat informasi nama *basecamp*, alamat, kota, provinsi, serta kontak pengurus, sesuai struktur tabel `basecamp` pada Subbab 3.3.3.
2.  **Fitur Pencarian dan Filter**: Menyediakan kolom pencarian berdasarkan nama *basecamp* atau kota untuk mempermudah pengguna dalam menemukan lokasi latihan yang relevan.
3.  **Detail *Basecamp***: Apabila pengguna memilih salah satu *basecamp*, sistem menampilkan informasi lebih rinci, termasuk jadwal latihan atau *event* yang terkait dengan *basecamp* tersebut (berdasarkan relasi tabel `basecamp` ke `events`).
4.  **Tombol "Hubungi via WhatsApp"**: Menampilkan tombol aksi (*call-to-action*) yang mengarahkan pengguna ke tautan WhatsApp pengurus *basecamp* yang bersangkutan. Elemen ini dirancang untuk menjawab salah satu permasalahan utama yang diidentifikasi pada BAB I, yaitu sulitnya calon anggota baru menghubungi pengurus atau senior komunitas.

Halaman ini dapat diakses oleh pengunjung untuk melihat informasi dasar maupun oleh anggota yang sudah terautentikasi untuk melihat informasi lengkap, sesuai dengan rancangan *Use Case* pada Subbab 3.2.4.

### 3.4.5 Rancangan Halaman Jadwal dan *Event*

Halaman jadwal dan *event* berfungsi sebagai antarmuka untuk menampilkan daftar jadwal latihan rutin, *event*, atau lomba yang terdaftar pada platform PancoKuy. Elemen-elemen yang dirancang meliputi:
1.  **Daftar Jadwal dan *Event***: Menampilkan daftar *event* dalam format kartu atau daftar terstruktur yang memuat informasi sesuai dengan struktur tabel `events` pada Subbab 3.3.3, yaitu judul *event*, jenis *event*, tanggal, waktu mulai, waktu selesai (jika tersedia), lokasi, deskripsi, serta *basecamp* terkait apabila *event* terikat pada *basecamp* tertentu.
2.  **Event Umum dan Event Basecamp**: Apabila kolom `basecamp_id` pada tabel `events` bernilai *Null*, *event* tersebut tetap ditampilkan sebagai *event* umum atau lomba yang tidak terikat pada *basecamp* tertentu.
3.  **Fitur Pencarian dan Filter**: Menyediakan fitur pencarian serta opsi filter berdasarkan tanggal, jenis *event*, atau lokasi untuk mempermudah pengguna dalam menemukan jadwal kegiatan yang relevan.
4.  **Akses Informasi**: Halaman ini dapat diakses oleh pengunjung umum untuk melihat informasi jadwal dan *event* secara umum, serta oleh anggota yang telah terautentikasi untuk melihat informasi yang lebih lengkap bila diperlukan.

### 3.4.6 Rancangan Halaman *Sparing Matcher*

Halaman *Sparing Matcher* merupakan antarmuka utama dari fitur rekomendasi lawan latih tanding menggunakan algoritma *Weighted Product*. Fitur ini hanya dapat digunakan oleh anggota yang sudah *login* dan memiliki profil lengkap (6 kriteria WP terisi dan minimal satu *basecamp* aktif terdaftar). Rancangan halaman ini disusun berdasarkan referensi *wireframe* yang telah dibangun sebelumnya. Elemen-elemen yang dirancang meliputi:
1.  **Judul dan Deskripsi Modul**: Menampilkan judul "Sparing Matcher" beserta keterangan bahwa sistem akan merekomendasikan lawan sparing berdasarkan tingkat kecocokan menggunakan metode *Weighted Product*.
2.  **Indikator Status Profil**: Menampilkan status kelengkapan profil pengguna saat ini. Apabila profil belum lengkap, pengguna akan diarahkan untuk melengkapi data terlebih dahulu sebelum dapat menggunakan fitur ini, sesuai alur pada Subbab 3.2.2.
3.  **Ringkasan Profil Pengguna Aktif**: Menampilkan data profil pengguna yang sedang mengakses fitur dalam format ringkasan, meliputi 6 (enam) kriteria WP (*basecamp* aktif, berat badan, tangan sparing, level kemampuan, lama aktif latihan, dan frekuensi latihan) serta informasi pendukung berupa *style* dominan. Terdapat tombol "Edit Profil" yang mengarahkan pengguna ke halaman pengelolaan profil apabila terdapat data yang ingin diperbarui.
4.  **Tombol Aksi "Cari Lawan Sparing"**: Tombol utama yang memicu proses perhitungan algoritma WP secara *real-time*. Saat tombol ini ditekan, sistem akan menjalankan seluruh tahapan perhitungan WP sesuai alur *Flowchart* algoritma pada Subbab 3.2.3, kemudian menampilkan hasil perangkingan pada area hasil rekomendasi.
5.  **Area Hasil Rekomendasi**: Menampilkan daftar kandidat lawan sparing yang telah diurutkan berdasarkan nilai preferensi (vektor V) tertinggi. Setiap baris kandidat menampilkan informasi sebagai berikut:
    *   Peringkat atau *ranking*.
    *   Nama atlet.
    *   Informasi ringkas profil (*basecamp*, berat badan, level kemampuan, dan *style* dominan).
    *   Nilai WP (*WP Score*) yang merupakan nilai vektor V hasil perhitungan algoritma.
    *   Ringkasan kecocokan berbasis penjelasan per-kriteria. Alih-alih menggunakan label kategori tunggal, sistem menampilkan ringkasan deskriptif yang menjelaskan kecocokan pada aspek-aspek utama, misalnya: *"Basecamp sama, selisih berat badan dekat, level kemampuan sama"* atau *"Berbeda basecamp tetapi masih satu kota, tangan sparing cocok, frekuensi latihan berdekatan."* Pendekatan ini digunakan untuk menghindari kerancuan dengan label skor per-kriteria (skala 1–5) pada Subbab 3.1.2, mengingat nilai vektor V bersifat relatif dan tidak dapat dipetakan secara konsisten ke dalam label kategori mutlak.
    *   Tombol **"Profil"** untuk melihat profil lengkap kandidat.
    *   Tombol **"Ajukan Sparing"** untuk mengirimkan permintaan latih tanding kepada kandidat. Aksi ini akan mencatat data pengajuan ke dalam tabel `sparing_requests` dengan kolom `source` bernilai 'sparing_matcher' dan kolom `wp_score` terisi nilai preferensi WP pada saat pengajuan dilakukan.
6.  **Panel Ringkasan Algoritma**: Terletak pada sisi kanan halaman (*sidebar*), menampilkan informasi ringkas mengenai metode yang digunakan (*Weighted Product*), daftar 6 (enam) kriteria pencocokan, serta keterangan bahwa *output* berupa *ranking* berdasarkan nilai preferensi tertinggi.
7.  **Panel Statistik Proses**: Menampilkan data statistik dari proses perhitungan, meliputi jumlah kandidat yang tersedia, jumlah rekomendasi yang ditampilkan, serta estimasi waktu proses algoritma.
8.  **Catatan Informasi**: Menampilkan keterangan bahwa fitur *Challenge Mode* merupakan fitur terpisah yang menggunakan mekanisme pencarian manual tanpa perhitungan WP.

### 3.4.7 Rancangan Halaman Direktori Anggota dan *Challenge Mode*

Halaman direktori anggota berfungsi sebagai antarmuka untuk menampilkan daftar seluruh anggota yang terdaftar pada platform, sekaligus menjadi antarmuka fitur *Challenge Mode*, yaitu pencarian lawan sparing secara manual tanpa menggunakan algoritma WP. Fitur *Challenge Mode* hanya dapat digunakan oleh anggota yang sudah *login*. Apabila profil anggota belum lengkap, sistem dapat mengarahkan pengguna untuk melengkapi profil terlebih dahulu sebelum mengajukan sparing. Elemen-elemen yang dirancang meliputi:
1.  **Daftar Anggota**: Menampilkan seluruh anggota terdaftar dalam format daftar atau kartu, dengan informasi ringkas meliputi nama, *basecamp* aktif, berat badan, level kemampuan, *style* dominan, dan tangan sparing.
2.  **Fitur Pencarian dan Filter**: Menyediakan kolom pencarian serta opsi filter berdasarkan kriteria tertentu (misalnya berdasarkan kota, level kemampuan, atau *style* dominan) untuk mempermudah pengguna menemukan lawan sparing secara manual sesuai preferensi personal.
3.  **Detail Profil Anggota**: Menampilkan halaman profil lengkap dari anggota yang dipilih.
4.  **Tombol "Ajukan Sparing"**: Memungkinkan pengguna untuk mengirimkan tantangan latih tanding secara langsung kepada anggota yang dipilih. Pengajuan melalui jalur ini akan dicatat ke dalam tabel `sparing_requests` dengan kolom `source` bernilai 'challenge_mode' dan kolom `wp_score` bernilai *Null* karena fitur ini tidak menggunakan perhitungan algoritma WP. Sistem mencegah pengguna mengajukan sparing kepada dirinya sendiri sesuai aturan validasi pada Subbab 3.3.3.

Fitur *Challenge Mode* ini dirancang untuk mengakomodasi kebutuhan anggota yang ingin menantang atlet tertentu secara langsung di luar hasil rekomendasi otomatis, misalnya seorang pemula yang ingin menantang atlet senior untuk keperluan pembelajaran teknik tertentu, sesuai dengan analisis kebutuhan pada Subbab 3.1.1.

---

## 3.5 Perancangan Pengujian

Perancangan pengujian merupakan tahapan untuk menyusun rencana dan skenario pengujian yang akan digunakan untuk memverifikasi bahwa platform PancoKuy berfungsi sesuai dengan rancangan, serta memastikan bahwa perhitungan algoritma *Weighted Product* pada fitur *Sparing Matcher* menghasilkan *output* yang sesuai dengan rumus. Pada penelitian ini, pengujian dilakukan melalui dua pendekatan, yaitu pengujian fungsionalitas sistem menggunakan metode *Black-Box Testing* dan pengujian kesesuaian hasil perhitungan algoritma WP menggunakan data simulasi (*dummy*).

### 3.5.1 Pengujian Fungsionalitas Sistem (*Black-Box Testing*)

Pengujian fungsionalitas sistem dilakukan menggunakan pendekatan *Black-Box Testing*, yaitu metode pengujian yang berfokus pada sisi fungsional sistem tanpa memperhatikan struktur internal kode program (Subbab 2.2.5). Tujuan dari pengujian ini adalah untuk memastikan bahwa setiap fitur pada platform PancoKuy berjalan sesuai dengan rancangan yang telah ditetapkan pada Subbab 3.1 hingga 3.4.

Skenario pengujian fungsionalitas sistem disusun berdasarkan fitur-fitur utama yang telah dirancang. Berikut adalah rencana skenario pengujian yang akan dilaksanakan:

**Tabel 3.1 Rencana Skenario Pengujian Fungsionalitas Sistem**

| No | Fitur yang Diuji | Skenario Pengujian | Hasil yang Diharapkan |
| :--- | :--- | :--- | :--- |
| 1 | Registrasi | Pengguna mengisi formulir registrasi dengan data yang valid (nama, *email*, *password*) dan menekan tombol "Daftar". | Akun berhasil dibuat, pengguna diarahkan ke halaman *login* atau halaman profil. |
| 2 | Registrasi | Pengguna mengisi formulir registrasi dengan *email* yang sudah terdaftar. | Sistem menampilkan pesan kesalahan bahwa *email* sudah digunakan. |
| 3 | *Login* | Pengguna memasukkan *email* dan *password* yang valid, lalu menekan tombol "Masuk". | Pengguna berhasil *login* dan diarahkan ke halaman utama atau halaman profil (jika profil belum lengkap). |
| 4 | *Login* | Pengguna memasukkan *email* atau *password* yang salah. | Sistem menampilkan pesan kesalahan bahwa kredensial tidak valid. |
| 5 | Profil Atlet | Pengguna mengisi seluruh 6 kriteria WP dan memilih minimal satu *basecamp* aktif, lalu menekan tombol simpan. | Data profil berhasil disimpan, status profil berubah menjadi "Lengkap". |
| 6 | Profil Atlet | Pengguna menyimpan profil tanpa melengkapi salah satu kriteria WP. | Sistem menampilkan peringatan bahwa data profil belum lengkap. |
| 7 | Profil Atlet | Pengguna mengisi seluruh data teknis profil tetapi belum memilih minimal satu *basecamp* aktif. | Sistem menampilkan peringatan bahwa profil belum lengkap karena belum memiliki *basecamp* aktif. |
| 8 | Direktori *Basecamp* | Pengguna membuka halaman direktori *basecamp*. | Sistem menampilkan daftar seluruh *basecamp* yang terdaftar beserta informasi nama, alamat, kota, dan kontak pengurus. |
| 9 | Direktori *Basecamp* | Pengguna melakukan pencarian *basecamp* berdasarkan nama kota. | Sistem menampilkan hasil pencarian yang sesuai dengan kata kunci yang dimasukkan. |
| 10 | Direktori *Basecamp* | Pengguna menekan tombol "Hubungi via WhatsApp" pada detail *basecamp*. | Sistem mengarahkan pengguna ke tautan WhatsApp pengurus yang sesuai. |
| 11 | Jadwal / *Event* | Pengguna membuka halaman jadwal atau *event*. | Sistem menampilkan daftar jadwal latihan dan *event* yang tersedia sesuai rancangan Subbab 3.4.5. |
| 12 | Hak Akses | Pengunjung belum *login* mencoba mengakses halaman Profil, Direktori Anggota, *Sparing Matcher*, atau *Challenge Mode*. | Sistem menolak akses dan mengarahkan pengguna ke halaman Login/Registrasi. |
| 13 | *Sparing Matcher* | Pengguna dengan profil lengkap menekan tombol "Cari Lawan Sparing". | Sistem menampilkan daftar rekomendasi lawan sparing yang terurut berdasarkan nilai preferensi WP tertinggi. |
| 14 | *Sparing Matcher* | Pengguna dengan profil belum lengkap mencoba mengakses fitur *Sparing Matcher*. | Sistem menampilkan peringatan atau mengarahkan pengguna ke halaman profil untuk melengkapi data. |
| 15 | *Sparing Matcher* | Pengguna dengan profil lengkap menjalankan *Sparing Matcher*, tetapi tidak ada kandidat lain yang memiliki profil lengkap. | Sistem menampilkan pesan bahwa rekomendasi belum tersedia. |
| 16 | *Sparing Matcher* | Pengguna menekan tombol "Ajukan Sparing" pada salah satu kandidat hasil rekomendasi. | Sistem mencatat pengajuan sparing ke basis data dengan `source` = 'sparing_matcher' dan `wp_score` terisi. |
| 17 | *Challenge Mode* | Pengguna membuka halaman direktori anggota dan melakukan pencarian manual berdasarkan filter tertentu (misal: kota, level). | Sistem menampilkan daftar anggota yang sesuai dengan filter yang dipilih. |
| 18 | *Challenge Mode* | Pengguna menekan tombol "Ajukan Sparing" pada profil anggota melalui *Challenge Mode*. | Sistem mencatat pengajuan sparing ke basis data dengan `source` = 'challenge_mode' dan `wp_score` bernilai *Null*. |
| 19 | *Challenge Mode* | Pengguna yang sudah *login* tetapi profilnya belum lengkap mencoba mengakses *Challenge Mode* untuk mengajukan sparing. | Sistem menampilkan peringatan atau mengarahkan pengguna ke halaman profil untuk melengkapi data terlebih dahulu. |
| 20 | *Challenge Mode* / *Sparing Matcher* | Pengguna mencoba mengajukan sparing kepada profil miliknya sendiri. | Sistem menolak pengajuan dan menampilkan pesan kesalahan. |
| 21 | Admin – Data Anggota | Admin memperbarui data anggota/profil atlet melalui panel admin. | Data anggota/profil berhasil diperbarui dan tampil sesuai perubahan. |
| 22 | Admin – Data *Basecamp* | Admin menambahkan data *basecamp* baru melalui panel admin. | Data *basecamp* berhasil ditambahkan dan muncul di halaman direktori *basecamp*. |
| 23 | Admin – Jadwal / *Event* | Admin menambahkan data jadwal/*event* baru. | Data jadwal/*event* berhasil disimpan dan tampil pada halaman Jadwal/*Event* sesuai rancangan Subbab 3.4.5. |
| 24 | Admin – Bobot WP | Admin memperbarui nilai bobot awal salah satu kriteria WP. | Nilai bobot berhasil diperbarui dan seluruh bobot normalisasi dihitung ulang secara otomatis oleh sistem sehingga $\sum w_j = 1$. |

Pengujian fungsionalitas dilakukan dengan memeriksa kesesuaian antara hasil aktual (*actual result*) dengan hasil yang diharapkan (*expected result*) pada setiap skenario. Apabila hasil aktual sesuai dengan hasil yang diharapkan, maka skenario pengujian dinyatakan **valid**. Apabila tidak sesuai, maka skenario dinyatakan **tidak valid** dan perlu dilakukan perbaikan pada komponen sistem yang terkait.

### 3.5.2 Pengujian Kesesuaian Hasil Perhitungan Algoritma *Weighted Product*

Selain pengujian fungsionalitas, dilakukan pula pengujian terhadap kesesuaian hasil perhitungan algoritma *Weighted Product* pada fitur *Sparing Matcher*. Tujuan pengujian ini adalah untuk memverifikasi bahwa proses perhitungan yang dijalankan oleh sistem menghasilkan *output* yang sesuai dengan rumus WP yang telah ditetapkan pada Subbab 2.2.3 dan Subbab 3.2.3.

Pengujian ini dilakukan dengan langkah-langkah sebagai berikut:

1.  **Menyiapkan Data Simulasi (*Dummy*)**: Membuat sekumpulan data profil atlet simulasi (5 hingga 10 profil) dengan variasi nilai pada keenam kriteria WP (Lokasi Latihan Aktif, Berat Badan, Lama Aktif Latihan, Frekuensi Latihan, Tangan Sparing, dan Level Kemampuan). Data simulasi ini bukan merupakan data profil pengguna riil secara masif, melainkan data yang dirancang khusus untuk keperluan pengujian. Dalam data *dummy*, disertakan minimal satu skenario atlet yang memiliki lebih dari satu *basecamp* aktif, agar logika C1 yang mengambil skor lokasi terbaik dari seluruh *basecamp* aktif (sesuai catatan pada Subbab 3.3.2) ikut teruji.
2.  **Menentukan Pengguna Aktif (*User* Referensi)**: Menetapkan salah satu profil atlet simulasi sebagai pengguna aktif yang akan mencari lawan sparing melalui fitur *Sparing Matcher*.
3.  **Menghitung Skor Kecocokan Secara Manual**: Untuk setiap calon lawan, menghitung nilai selisih atau kesamaan terhadap profil pengguna aktif pada masing-masing kriteria, kemudian mengonversi hasilnya menjadi skor kecocokan (skala 1–5) berdasarkan tabel konversi skor yang telah ditetapkan pada Subbab 3.1.2.
4.  **Menghitung Vektor S Secara Manual**: Menormalisasi bobot kriteria ($w_j = W_j / \sum W_j$), kemudian menghitung nilai vektor S untuk setiap calon lawan menggunakan rumus:
    $$S_i = \prod_{j=1}^{n} x_{ij}^{w_j}$$
    Di mana seluruh kriteria bersifat *benefit* (pangkat positif) karena nilai *input* telah dikonversi menjadi skor kecocokan.
5.  **Menghitung Vektor V Secara Manual**: Menghitung nilai preferensi relatif untuk setiap calon lawan menggunakan rumus:
    $$V_i = \frac{S_i}{\sum S_i}$$
6.  **Mengurutkan Hasil Manual**: Mengurutkan nilai vektor V dari yang terbesar ke terkecil untuk memperoleh peringkat rekomendasi berdasarkan perhitungan manual.
7.  **Membandingkan dengan *Output* Sistem**: Menjalankan fitur *Sparing Matcher* pada sistem dengan data simulasi yang sama, kemudian membandingkan hasil perangkingan yang dihasilkan oleh sistem terhadap hasil perhitungan manual. Perhitungan manual dapat dilakukan menggunakan bantuan *spreadsheet* atau tabel perhitungan manual, kemudian hasilnya dibandingkan dengan *output* sistem.

Hasil pengujian dianggap **sesuai** apabila:
*   Urutan peringkat (*ranking*) rekomendasi lawan yang dihasilkan oleh sistem sama dengan urutan peringkat hasil perhitungan manual.
*   Nilai vektor V yang ditampilkan oleh sistem memiliki nilai yang sama atau mendekati (dengan toleransi pembulatan desimal) dibandingkan dengan hasil perhitungan manual. Perbedaan nilai desimal akibat pembulatan ditoleransi selama tidak mengubah urutan *ranking* rekomendasi.

Apabila terdapat perbedaan pada urutan peringkat atau nilai vektor V yang signifikan, maka akan dilakukan penelusuran terhadap proses perhitungan pada sistem untuk mengidentifikasi dan memperbaiki sumber kesalahan.

Perlu ditegaskan bahwa pengujian ini bersifat verifikasi internal terhadap kesesuaian implementasi algoritma, bukan pembuktian efektivitas metode WP secara statistik terhadap populasi atlet riil secara masif, sesuai dengan Batasan Masalah pada Subbab 1.3.


