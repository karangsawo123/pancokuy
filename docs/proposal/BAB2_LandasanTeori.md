# BAB II. LANDASAN TEORI

---

## 2.1 Tinjauan Pustaka

Berikut adalah beberapa penelitian terdahulu yang relevan dengan topik penelitian ini, yaitu mengenai penerapan metode *Weighted Product* (WP) dalam Sistem Pendukung Keputusan (SPK) serta pengembangan platform digital untuk komunitas olahraga.

**Tabel 2.1 Ringkasan Penelitian Terdahulu**

| No | Penulis & Tahun | Judul Penelitian | Objek/Studi Kasus | Metode yang Digunakan | Hasil Penelitian | Kelebihan/Keterbatasan | Relevansi dan kesenjangan dengan penelitian PancoKuy |
| -- | --------------- | ---------------- | ----------------- | --------------------- | ---------------- | ---------------------- | ---------------------------------- |
| 1  | Yahya dan Rozi (2019) | Sistem Pendukung Keputusan Pemilihan Pemain Terbaik pada Tim Basket Menggunakan Metode Weighted Product (WP) | Pemilihan pemain terbaik pada klub basket Koreri Basketball Club | Sistem Pendukung Keputusan, Weighted Product (WP) | Penelitian ini menghasilkan sistem pendukung keputusan untuk membantu pelatih atau panitia memilih pemain basket terbaik secara lebih objektif berdasarkan beberapa kriteria, seperti *assist*, *shooting*, *rebounds*, dan *turn over*. Hasil validasi pengujian sistem mencapai 73% [8]. | Kelebihan: sangat relevan karena menerapkan WP pada bidang olahraga.<br>Keterbatasan: fokus penelitian masih pada pemilihan pemain terbaik, bukan pencocokan lawan atau partner latihan. | Penelitian ini menjadi rujukan bahwa metode WP dapat diterapkan dalam konteks olahraga. Gap PancoKuy terletak pada penerapan WP untuk merekomendasikan lawan sparing panco yang seimbang berdasarkan karakteristik atlet, bukan untuk memilih pemain terbaik. |
| 2  | Astuti, Pinandito, dan Dewi (2017) | Sistem Rekomendasi Lowongan Pekerjaan untuk Fresh Graduate Menggunakan Metode Weighted Product Berbasis Android | Rekomendasi lowongan pekerjaan untuk lulusan baru | Sistem rekomendasi, Weighted Product (WP), Android | Penelitian ini mengembangkan sistem rekomendasi lowongan kerja menggunakan metode Weighted Product untuk menyesuaikan profil *fresh graduate* dengan alternatif lowongan pekerjaan. Artikel ini diterbitkan pada Jurnal Pengembangan Teknologi Informasi dan Ilmu Komputer, Vol. 1 No. 12, halaman 1518–1525 [9]. | Kelebihan: relevan sebagai contoh penggunaan WP untuk proses *matching* antara profil individu dan alternatif yang tersedia.<br>Keterbatasan: platform yang digunakan berbasis Android dan domain penelitian berada pada bidang pekerjaan, bukan olahraga. | Penelitian ini paling kuat sebagai analogi konsep *matching*. PancoKuy mengadaptasi pendekatan serupa, tetapi objek yang dicocokkan adalah profil atlet dengan calon lawan sparing berdasarkan kriteria fisik, pengalaman, lokasi latihan, tangan dominan, *style*, dan level kemampuan. |
| 3  | Nurjannah, Arifin, dan Marisa (2015) | Sistem Pendukung Keputusan Pembelian Sepeda Motor dengan Metode Weighted Product | Rekomendasi pembelian sepeda motor | Sistem Pendukung Keputusan, Weighted Product (WP) | Penelitian ini membangun SPK pembelian sepeda motor dengan kriteria harga, teknologi, kapasitas mesin, dan model/desain. Sistem menghasilkan delapan alternatif rekomendasi produk serta satu alternatif terbaik sebagai bahan pertimbangan calon konsumen [10]. | Kelebihan: menjelaskan penerapan WP klasik untuk perangkingan alternatif berdasarkan banyak kriteria.<br>Keterbatasan: objek penelitian berupa produk sepeda motor yang kriterianya cenderung statis, berbeda dengan karakteristik atlet yang lebih dinamis. | Penelitian ini relevan untuk memperkuat dasar perhitungan WP sebagai metode perangkingan alternatif. Gap PancoKuy adalah penggunaan WP pada data profil atlet dan konteks rekomendasi lawan sparing, bukan pemilihan produk. |
| 4  | Tigor dan Manikam (2021) | Analisa dan Perancangan Aplikasi Pembentukan Komunitas Olahraga Berdasarkan Hobby Berbasis Web | Pembentukan komunitas olahraga berdasarkan hobi | Analisis PIECES, perancangan aplikasi berbasis web | Penelitian ini merancang aplikasi untuk mengumpulkan orang-orang yang memiliki hobi yang sama agar dapat membentuk komunitas, berkumpul, dan melakukan aktivitas bersama. Penelitian ini menggunakan analisis PIECES sebagai dasar perancangan sistem [11]. | Kelebihan: sangat relevan dengan konsep platform komunitas olahraga berbasis web.<br>Keterbatasan: belum menerapkan metode SPK atau algoritma rekomendasi untuk pencocokan anggota. | Penelitian ini mendukung konsep PancoKuy sebagai platform komunitas olahraga. Gap PancoKuy adalah fokus yang lebih spesifik pada komunitas arm wrestling serta penambahan fitur *Sparing Matcher* berbasis Weighted Product. |
| 5  | Saputra, Setiawan, Sudiatmika, Pramartha, dan Artana (2024) | Sistem Informasi Manajemen Komunitas Berbasis Web (Studi Kasus: ITB STIKOM Bali Kampus Jimbaran) | Manajemen komunitas kampus berbasis web | Waterfall, CodeIgniter, Blackbox Testing | Penelitian ini menghasilkan sistem informasi manajemen komunitas berbasis web untuk mengelola data anggota, kegiatan, dan event komunitas. Hasil *blackbox testing* menunjukkan fungsi sistem berjalan baik, sedangkan hasil kuesioner pengguna memperoleh nilai 86% dengan kategori sangat baik dan sisi admin memperoleh 79% dengan kategori baik [12]. | Kelebihan: relevan untuk pengelolaan data anggota, kegiatan, dan event komunitas berbasis web.<br>Keterbatasan: belum membahas fitur rekomendasi atau pencocokan berbasis algoritma SPK. | Penelitian ini memperkuat sisi manajemen komunitas pada PancoKuy, seperti direktori komunitas, data anggota, jadwal latihan, dan event. Gap PancoKuy adalah integrasi manajemen komunitas dengan fitur rekomendasi lawan sparing menggunakan WP. |



Penelitian pertama dilakukan oleh Yahya dan Rozi yang membangun sebuah sistem pendukung keputusan untuk membantu pelatih atau panitia dalam memilih pemain basket terbaik pada Koreri Basketball Club secara lebih objektif. Kriteria yang digunakan meliputi *assist*, *shooting*, *rebounds*, dan *turn over*, dengan hasil validasi pengujian sistem mencapai 73% [8]. Penelitian ini menjadi rujukan bahwa metode *Weighted Product* dapat diterapkan pada bidang olahraga, namun fokusnya masih pada pemilihan pemain terbaik, bukan pada pencocokan lawan atau *partner* latihan sebagaimana yang menjadi fokus PancoKuy.

Penelitian kedua oleh Astuti, Pinandito, dan Dewi mengembangkan sistem rekomendasi lowongan pekerjaan berbasis Android bagi lulusan baru (*fresh graduate*) menggunakan metode *Weighted Product* untuk menyesuaikan profil individu dengan alternatif lowongan yang tersedia [9]. Penelitian ini menjadi analogi konsep *matching* yang paling relevan, karena PancoKuy mengadaptasi pendekatan serupa untuk mencocokkan profil atlet dengan calon lawan sparing berdasarkan kriteria fisik, pengalaman, lokasi latihan, tangan dominan, *style*, dan level kemampuan, meskipun domain dan platform yang digunakan berbeda.

Penelitian ketiga oleh Nurjannah, Arifin, dan Marisa membangun sistem pendukung keputusan pembelian sepeda motor dengan kriteria harga, teknologi, kapasitas mesin, dan model/desain, yang menghasilkan delapan alternatif rekomendasi produk beserta satu alternatif terbaik [10]. Penelitian ini memperkuat dasar perhitungan *Weighted Product* sebagai metode perangkingan alternatif, namun objek penelitiannya berupa produk dengan kriteria yang cenderung statis, berbeda dengan karakteristik atlet pada PancoKuy yang lebih dinamis.

Penelitian keempat oleh Tigor dan Manikam merancang aplikasi berbasis web untuk mengumpulkan orang-orang dengan hobi yang sama agar dapat membentuk komunitas, berkumpul, dan melakukan aktivitas bersama, dengan menggunakan analisis PIECES sebagai dasar perancangan sistem [11]. Penelitian ini mendukung konsep PancoKuy sebagai platform komunitas olahraga berbasis web, tetapi belum menerapkan metode SPK atau algoritma rekomendasi untuk pencocokan anggota, sehingga PancoKuy hadir dengan fokus yang lebih spesifik pada komunitas *arm wrestling* serta penambahan fitur *Sparing Matcher* berbasis *Weighted Product*.

Penelitian kelima oleh Saputra, Setiawan, Sudiatmika, Pramartha, dan Artana menghasilkan sistem informasi manajemen komunitas berbasis web dengan metode *Waterfall* dan CodeIgniter pada studi kasus ITB STIKOM Bali Kampus Jimbaran, dengan hasil *blackbox testing* yang berjalan baik serta nilai kuesioner pengguna sebesar 86% dan sisi admin 79% [12]. Penelitian ini memperkuat sisi manajemen komunitas pada PancoKuy, seperti direktori komunitas, data anggota, jadwal latihan, dan *event*, namun belum membahas fitur rekomendasi atau pencocokan berbasis algoritma SPK.

### 2.1.1 Analisis Kesenjangan Penelitian (*Gap Analysis*)

Berdasarkan kelima penelitian terdahulu di atas, dapat disimpulkan bahwa penerapan metode *Weighted Product* telah banyak digunakan pada berbagai domain, mulai dari olahraga [8], rekrutmen kerja [9], hingga pembelian produk [10], sedangkan pengembangan platform komunitas olahraga berbasis web juga telah dilakukan namun umumnya belum melibatkan metode SPK sebagai mesin rekomendasi [11], [12]. Kebaruan penelitian ini terletak pada integrasi metode *Weighted Product* ke dalam sebuah platform digital khusus komunitas *arm wrestling* (PancoKuy) untuk merekomendasikan lawan sparing yang seimbang, dengan kriteria yang bersifat dinamis dan spesifik pada karakteristik atlet panco, seperti kondisi fisik, pengalaman, lokasi latihan, tangan dominan, *style* bertanding, dan level kemampuan (Pemula, Semi Pro, Pro), sekaligus tetap menyediakan fitur manajemen komunitas seperti direktori anggota, jadwal latihan, dan *event* yang belum ditemukan secara terintegrasi pada penelitian-penelitian sebelumnya.

---

## 2.2 Landasan Teori

Subbab ini memaparkan teori-teori dasar yang menjadi landasan dalam pelaksanaan penelitian serta pengembangan sistem. Pembahasan pada landasan teori mencakup konsep olahraga *arm wrestling* (panco), Sistem Pendukung Keputusan (SPK) beserta metode *Weighted Product* (WP), konsep pengembangan aplikasi berbasis web, serta pengujian perangkat lunak.

### 2.2.1 *Arm Wrestling* (Panco)

*Arm wrestling* atau yang di Indonesia dikenal dengan istilah panco adalah cabang olahraga yang mempertemukan dua orang dalam posisi berhadapan, dengan siku diletakkan pada permukaan meja dan tangan saling bertaut, di mana pemenang ditentukan melalui upaya menjatuhkan punggung tangan lawan hingga menyentuh bantalan meja [1]. *World Armwrestling Federation* (WAF) sebagai badan pengatur internasional cabang olahraga ini menetapkan sejumlah ketentuan baku dalam penyelenggaraan pertandingan, meliputi posisi bahu yang harus sejajar dengan meja, larangan melewati garis tengah bahu selama pertandingan, prosedur penguncian genggaman tangan sebelum pertandingan dimulai, serta batas waktu yang diberikan kepada atlet untuk membentuk genggaman (*grip*) sebelum wasit mengambil alih [1]. Selain aturan teknis pertandingan, WAF juga menetapkan klasifikasi peserta berdasarkan kelompok usia (*Sub-Junior*, *Junior*, *Youth*, *Senior*, *Masters*, *Grand Masters*, hingga *Senior Grand Masters*) serta kelas berat badan yang berbeda-beda untuk setiap kelompok usia dan jenis kelamin, dengan ketentuan bahwa atlet dapat mengikuti kelas beratnya sendiri atau naik satu kelas di atasnya [1].

Dalam praktik komunitas panco, beberapa gaya bertanding yang umum dikenal antara lain *toproll*, *hook*, *press*, dan *kingsmove*. Gaya-gaya tersebut berkaitan dengan variasi posisi pergelangan, arah tarikan, dan sudut tekanan yang digunakan atlet saat bertanding. Penguasaan teknik-teknik tersebut, ditambah dengan faktor postur tubuh khususnya panjang lengan bawah, turut memengaruhi keunggulan mekanis (*moment-torque advantage*) seorang atlet saat siku dalam posisi fleksi [2].

Di sisi lain, olahraga panco memiliki risiko cedera tertentu karena melibatkan tekanan besar pada struktur lengan, khususnya ketika posisi tubuh, teknik, atau keseimbangan kemampuan lawan tidak terkontrol. Sahin [3] dalam tinjauan literaturnya menjelaskan bahwa cedera akibat panco dapat terjadi pada otot, ligamen, pembuluh darah, dan saraf radial, dengan cedera pada tulang humerus sebagai salah satu jenis cedera yang paling sering dilaporkan. Faktor risiko yang teridentifikasi meliputi posisi tubuh dan lengan selama pertandingan, kualitas dan kepadatan tulang, serta perbedaan tingkat pengalaman antara atlet terlatih dan atlet yang belum terlatih [3]. Secara biomekanik, Kruczyński dkk. [4] melakukan analisis menggunakan metode elemen hingga (*finite element method*) terhadap sembilan kasus fraktur humerus akibat panco, dan menemukan bahwa tegangan maksimum akibat beban torsional saat panco berlangsung mencapai 60 MPa, terkonsentrasi pada area 115 mm di atas siku pada sisi medial-posterior tulang humerus. Temuan ini menjelaskan secara mekanis mengapa ketidakseimbangan kekuatan yang ekstrem antara dua atlet yang bertanding — misalnya akibat perbedaan pengalaman, penguasaan teknik, atau kekuatan otot yang signifikan — dapat meningkatkan risiko terjadinya cedera serius pada salah satu pihak [3], [4].

Berdasarkan pemaparan tersebut, latih tanding atau sparing dalam olahraga panco idealnya dilakukan antara atlet dengan tingkat kemampuan yang relatif seimbang, tidak hanya dari sisi berat badan sebagaimana diatur dalam sistem klasifikasi resmi [1], tetapi juga mempertimbangkan faktor pengalaman, penguasaan teknik, dan frekuensi latihan, guna meminimalkan risiko cedera sekaligus menjaga efektivitas proses belajar teknik antar-atlet.

Dalam praktik di lapangan, komunitas arm wrestling memiliki sejumlah elemen organisasi yang menunjang kegiatan latihan dan pembinaan atlet. Elemen-elemen tersebut meliputi lokasi latihan tetap (*basecamp*) yang menjadi pusat kegiatan komunitas, jadwal latihan rutin sebagai sarana pembinaan teknik dan fisik, peran senior atau pelatih sebagai pembimbing teknik bagi anggota, kegiatan latih tanding atau sparing sebagai metode latihan utama, serta penyelenggaraan *event* atau turnamen sebagai ajang kompetisi dan pengukuran kemampuan atlet. Koordinasi seluruh kegiatan tersebut saat ini umumnya masih dilakukan secara informal melalui grup pesan instan, sehingga menimbulkan kebutuhan akan platform digital yang mampu mengintegrasikan dan menyajikan informasi komunitas secara lebih terstruktur dan terpusat.

Dalam konteks penelitian ini, klasifikasi level kemampuan atlet panco dirumuskan menggunakan definisi operasional yang disesuaikan dengan karakteristik komunitas arm wrestling. Klasifikasi tersebut terdiri dari tiga tingkatan, yaitu: **Pemula**, yang merujuk pada atlet yang masih mempelajari teknik dasar panco dan belum memiliki pengalaman podium yang signifikan; **Semi Pro**, yang merujuk pada atlet yang sudah rutin latihan, pernah mengikuti sparing atau kompetisi, dan/atau memiliki pengalaman podium terbatas; serta **Pro**, yang merujuk pada atlet yang sudah berpengalaman, sering mengikuti kompetisi, dan/atau memiliki riwayat podium yang lebih kuat. Klasifikasi ini digunakan sebagai salah satu dari enam kriteria pada fitur *Sparing Matcher* dalam perhitungan metode *Weighted Product*, dan pada tahap perancangan sistem (BAB III) akan dikonversi menjadi nilai numerik untuk keperluan perhitungan algoritma.

### 2.2.2 Sistem Pendukung Keputusan (SPK)

Sistem Pendukung Keputusan (SPK) pertama kali diperkenalkan pada awal tahun 1970-an oleh Scott Morton, yang mendefinisikannya sebagai sistem berbasis komputer interaktif yang membantu para pengambil keputusan menggunakan data dan berbagai model untuk memecahkan masalah-masalah yang bersifat tidak terstruktur [6]. SPK dirancang untuk menunjang seluruh tahapan pembuatan keputusan, mulai dari mengidentifikasi masalah, memilih data yang relevan, menentukan pendekatan yang digunakan dalam proses pembuatan keputusan, sampai pada kegiatan mengevaluasi pemilihan alternatif [6].

Pengambilan keputusan dalam SPK melalui empat tahap yang saling berhubungan dan berurutan menurut Simon (1960), yaitu *intelligence*, *design*, *choice*, dan *implementation* [6]. Tahap *intelligence* merupakan proses penelusuran dan pendeteksian lingkup permasalahan serta pengenalan masalah. Tahap *design* merupakan proses menemukan dan mengembangkan alternatif, meliputi upaya memahami masalah, menurunkan solusi, dan menguji kelayakan solusi tersebut. Tahap *choice* adalah proses pemilihan di antara berbagai alternatif tindakan yang mungkin dijalankan, meliputi pencarian, evaluasi, dan rekomendasi solusi yang sesuai. Tahap *implementation* merupakan pelaksanaan dari keputusan yang telah diambil, di mana perlu disusun serangkaian tindakan terencana agar hasil keputusan dapat dipantau dan disesuaikan bila diperlukan perbaikan [6].

Selain tahapan pengambilan keputusan, SPK menurut Turban (2005) terdiri atas empat subsistem, yaitu manajemen data (basis data yang relevan dan dikelola oleh *Database Management System*/DBMS), manajemen model (model finansial, statistik, atau kuantitatif lain yang menyediakan kemampuan analitis), subsistem dialog atau komunikasi (antarmuka yang digunakan pengguna untuk berkomunikasi dan memberi perintah pada sistem), serta manajemen *knowledge* yang mendukung subsistem lain [6]. Berdasarkan pemaparan tersebut, tujuan pengembangan SPK adalah memberikan pertimbangan kepada pengambil keputusan sebelum menentukan keputusan akhir, khususnya pada situasi keputusan yang bersifat semi terstruktur maupun tidak terstruktur [6].

Dalam konteks penelitian ini, permasalahan pencarian lawan latih tanding yang seimbang merupakan permasalahan multi-kriteria yang bersifat tidak terstruktur — melibatkan beberapa faktor seperti domisili, berat badan, lama aktif latihan, frekuensi latihan, gaya bertanding, tangan dominan, serta level kemampuan atlet — sehingga sesuai untuk diselesaikan menggunakan pendekatan SPK pada fitur *Sparing Matcher*.

### 2.2.3 Metode *Weighted Product* (WP)

*Weighted Product* (WP) banyak digunakan dalam menyelesaikan permasalahan yang bersifat *Multiple Attribute Decision Making* (MADM), dengan cara menghubungkan *rating* atribut dan bobot atribut yang bersangkutan melalui perhitungan matematis yang bersifat perkalian untuk menghasilkan nilai ternormalisasi [7]. Proses perangkingan untuk menyeleksi alternatif terbaik serta waktu perhitungan yang lebih singkat menjadi kelebihan metode WP dibandingkan metode SPK lainnya [7].

Algoritma penyelesaian metode WP terdiri atas tujuh langkah, yaitu: (1) menentukan kriteria penilaian yang dijadikan patokan dalam penyelesaian masalah; (2) menentukan alternatif; (3) menentukan bobot preferensi setiap kriteria; (4) melakukan perbaikan bobot atau normalisasi bobot; (5) menormalisasi nilai setiap alternatif atau menentukan nilai vektor S; (6) menentukan nilai preferensi atau nilai vektor V; dan (7) memperoleh hasil berdasarkan nilai alternatif tertinggi [7].

**1. Normalisasi bobot kriteria**

Perbaikan bobot atau normalisasi bobot dilakukan agar total keseluruhan bobot bernilai 1, menggunakan persamaan:

$$w_j = \frac{W_j}{\sum W_j}$$ *(2.1)*

*Keterangan:*
- $w_j$ = bobot kriteria hasil normalisasi
- $W_j$ = bobot kriteria awal

**2. Perhitungan Vektor S**

Menormalisasi nilai setiap alternatif dilakukan dengan mengalikan seluruh nilai kriteria yang telah dipangkatkan dengan bobot masing-masing kriteria yang telah dinormalisasi. Dalam menentukan nilai vektor S perlu diperhatikan kategori kriteria yang digunakan, yaitu kategori keuntungan (*benefit*) yang menggunakan pangkat bernilai positif, atau kategori biaya (*cost*) yang menggunakan pangkat bernilai negatif [7]:

$$S_i = \prod_{j=1}^{n} x_{ij}^{w_j}$$ *(2.2)*

*Keterangan:*
- $S_i$ = nilai vektor S pada alternatif ke-i
- $x_{ij}$ = nilai alternatif ke-i pada kriteria ke-j
- $w_j$ = bobot kriteria ke-j yang telah dinormalisasi
- $n$ = jumlah kriteria

**3. Perhitungan Vektor V**

Nilai preferensi atau vektor V diperoleh dengan membagi hasil vektor S untuk setiap alternatif dengan jumlah keseluruhan nilai vektor S dari semua alternatif [7]:

$$V_i = \frac{S_i}{\sum S_i}$$ *(2.3)*

*Keterangan:*
- $V_i$ = nilai preferensi relatif alternatif ke-i
- $S_i$ = nilai vektor S pada alternatif ke-i
- $\sum S_i$ = jumlah seluruh nilai vektor S dari semua alternatif

**4. Perangkingan**

Hasil akhir diperoleh berdasarkan nilai alternatif tertinggi, yaitu alternatif dengan nilai vektor V terbesar dianggap sebagai alternatif yang paling direkomendasikan [7].

Metode WP dipilih dalam penelitian ini karena proses perhitungannya bersifat kuantitatif dan relatif singkat untuk diimplementasikan, namun tetap mampu mengakomodasi banyak kriteria dengan bobot kepentingan yang berbeda-beda — sesuai dengan kebutuhan fitur *Sparing Matcher* yang mempertimbangkan enam kriteria utama pencocokan lawan latih tanding. Perlu ditegaskan bahwa perhitungan WP pada penelitian ini hanya diterapkan pada fitur *Sparing Matcher*, sedangkan fitur *Challenge Mode* berada di luar cakupan perhitungan algoritma WP karena bersifat pencarian lawan secara manual melalui direktori anggota.

Berdasarkan batasan masalah pada penelitian ini, kriteria yang digunakan dalam proses pencocokan (*matchmaking*) meliputi enam aspek utama, yaitu lokasi latihan aktif, berat badan, lama aktif latihan, frekuensi latihan, tangan sparing, serta level kemampuan atlet. *Style* dominan tetap menjadi bagian dari informasi profil atlet sebagai konteks teknis latihan, namun tidak dijadikan kriteria WP karena kesamaan *style* tidak selalu merepresentasikan kecocokan lawan sparing. Masing-masing dari keenam kriteria tersebut akan diberikan bobot awal berdasarkan hasil wawancara terstruktur (*expert judgement*), yang kemudian dinormalisasi untuk digunakan sebagai nilai pangkat dalam perhitungan vektor S. Seluruh kriteria diposisikan sebagai kriteria keuntungan (*benefit*) karena *input* yang digunakan telah melalui proses konversi menjadi skor kecocokan.

### 2.2.4 Pengembangan Aplikasi Berbasis Web

Website adalah halaman informasi yang disediakan melalui jalur internet, sehingga dapat diakses di mana pun selama perangkat terkoneksi dengan jaringan internet [5]. Pengembangan sistem informasi didefinisikan sebagai aktivitas untuk menghasilkan sistem informasi berbasis komputer guna menyelesaikan persoalan organisasi atau memanfaatkan peluang (*opportunities*) yang timbul [5]. Sistem informasi berbasis website memiliki banyak manfaat dan dapat mempermudah pekerjaan manusia, sehingga pengembangan sistem informasi jenis ini terus banyak dilakukan pada berbagai bidang, seperti bisnis, pendidikan, pemerintahan, kesehatan, dan keuangan [5].

Pengembangan sistem informasi berbasis website umumnya menggunakan *System Development Life Cycle* (SDLC), yaitu rangkaian proses untuk menggambarkan bagaimana merancang, mengembangkan, memelihara, dan meningkatkan efisiensi produk perangkat lunak [5].

Pemilihan platform berbasis web pada penelitian ini didasarkan pada kebutuhan untuk membangun sistem yang dapat diakses secara luas oleh anggota komunitas panco melalui perangkat apa pun tanpa memerlukan instalasi tambahan, sekaligus mampu menyimpan data profil atlet, jadwal latihan, dan hasil perhitungan algoritma WP secara terpusat. Tahapan pengembangan dalam penelitian ini disusun secara sistematis mulai dari identifikasi masalah, analisis dan perancangan sistem, implementasi, hingga pengujian. Tahapan tersebut memiliki kesesuaian dengan prinsip umum SDLC yang digunakan dalam pengembangan sistem informasi berbasis website [5].

### 2.2.5 Pengujian Perangkat Lunak

Sistem informasi yang dibuat harus melewati pengujian terhadap perangkat lunaknya terlebih dahulu sebelum digunakan secara resmi [13]. Terdapat dua pendekatan utama dalam pengujian perangkat lunak, yaitu *white box testing* dan *black box testing* [13]. *Black box testing* dipilih dalam penelitian ini karena tidak mengharuskan penguji menguasai bahasa pemrograman tertentu, sehingga cocok digunakan oleh penguji pemula yang berfokus pada sisi fungsional sistem [13].

Teknik pengujian pada *black box testing* meliputi beberapa cara, di antaranya *Equivalence Partitioning*, *Boundary Value Analysis*, *Comparison Testing*, *Sample Testing*, dan *Robustness Testing* [13]. Pengujian dengan pendekatan ini digunakan untuk menguji apakah terdapat kesalahan pada beberapa aspek, yaitu fungsi sistem, antarmuka (*interface*), struktur data atau akses data, performansi, serta proses inisialisasi [13].

Pada penelitian ini, pengujian perangkat lunak dilakukan menggunakan pendekatan *black box testing* untuk memastikan bahwa seluruh fitur pada platform PancoKuy — termasuk fitur *Sparing Matcher* dan *Challenge Mode* — berfungsi sesuai dengan rancangan. Selain itu, dilakukan pengujian kesesuaian hasil perhitungan algoritma *Weighted Product* dengan membandingkan output sistem terhadap hasil perhitungan manual menggunakan sekumpulan data simulasi (*dummy*), bukan sebagai pembuktian terhadap data atlet riil secara masif.

---

[1]: https://www.waf-armwrestling.com/wp-content/uploads/2025/05/2025-WAF-Rules.pdf "WAF Rules & Regulations 2025"
[2]: https://doi.org/10.5763/kjsm.2017.35.3.149 "Yi S, et al. Humeral shaft fracture sustained during arm wrestling. Korean J Sports Med. 2017;35(3):149-54."
[3]: https://doi.org/10.23937/2643-4016/1710022 "Sahin T. Arm wrestling related injuries: a literature review. 2020."
[4]: https://doi.org/10.12659/MSM.882736 "Kruczyński J, et al. Radiological and biomechanical analysis of humeral fractures. 2012."
[5]: https://doi.org/10.33395/remik.v7i1.12177 "Rahmi ER, Yumami E, Hidayasari N. Analisis metode pengembangan sistem informasi berbasis website: systematic literature review. Remik: Riset dan E-Jurnal Manajemen Informatika Komputer. 2023;7(1):821-834."
[6]: https://doi.org/10.47709/jpsk.v3i02.3347 "Efendi R, Sazaki Y, Jambak MI. Analisis komparatif metode Weighted Product (WP) dan metode Simple Additive Weighting (SAW). Jurnal Pendidikan Sains dan Komputer. 2023;3(2):205-215."
[7]: https://doi.org/10.33633/tc.v20i3.4921 "Khasanah FN, Herlawati, Atika PD, Sari R, Murdowo S, Retnoningsih E. Rekomendasi hasil metode Weighted Product terhadap pemilihan tempat kuliner di sekitar Universitas Bhayangkara Bekasi. Techno.Com. 2021;20(3):382-391."
[8]: https://eprints.mercubuana-yogya.ac.id/6324/ "Sistem Pendukung Keputusan Pemilihan Pemain Terbaik Pada Tim Basket Menggunakan Metode Weighted Product (WP) Repository UMBY"
[9]: https://j-ptiik.ub.ac.id/index.php/j-ptiik/issue/view/12?utm_source=chatgpt.com "Vol 1 No 12 (2017): Desember 2017 - j-ptiik"
[10]: https://e-journals.unmul.ac.id/index.php/JIM/article/view/186 "Sistem Pendukung Keputusan Pembelian Sepeda Motor Dengan Metode Weighted Product"
[11]: https://jurnal.ikhafi.or.id/index.php/jusibi/article/view/101 "Analisa dan Perancangan Aplikasi Pembentukan Komunitas Olahraga Berdasarkan Hobby Berbasis Web"
[12]: https://ejournal.universitastabanan.ac.id/index.php/jurnalsutasoma/article/view/288 "Sistem Informasi Manajemen Komunitas Berbasis Web (Studi Kasus: Itb Stikom Bali Kampus Jimbaran)"
[13]: https://doi.org/10.55123/storage.v1i2.270 "Uminingsih, Ichsanudin MN, Yusuf M, Suraya S. Pengujian fungsional perangkat lunak sistem informasi perpustakaan dengan metode Black Box Testing bagi pemula. STORAGE: Jurnal Ilmiah Teknik dan Ilmu Komputer. 2022;1(2):1-8."
