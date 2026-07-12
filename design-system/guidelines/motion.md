# Motion — PancoKuy

Prinsip: **ringan & fungsional**. Animasi memberi *feedback* (apa yang berubah, ke mana perhatian pergi), bukan dekorasi. Terinspirasi gerak panco: eksplosif saat masuk, terkontrol saat berhenti. Tidak ada loop dekoratif, tidak ada bounce berlebihan, hormati `prefers-reduced-motion`.

> Bagian ini adalah **dokumentasi aturan** (referensi untuk implementasi / Claude Code nanti), bukan animasi yang berjalan di produk pada tahap ini. Token tersedia di `tokens/motion.css`.

## 1. Durasi standar
| Kelas | Durasi | Token | Contoh |
|---|---|---|---|
| Micro-interaction | 100–150ms | `--dur-micro` (120ms) | hover, press, checkbox, toggle, ripple |
| Transisi komponen | 200–300ms | `--dur-component` (240ms) | card rise, dropdown, badge color, accordion, tab |
| Transisi halaman/modal | 300–400ms | `--dur-page` (360ms) | modal, drawer, route/page change |

Aturan: makin besar area yang bergerak, makin panjang durasinya. Elemen kecil harus terasa instan.

## 2. Easing curve
| Token | Kurva | Dipakai untuk | Alasan |
|---|---|---|---|
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | elemen **masuk** (muncul, membesar, turun) | cepat di awal lalu melembut → terasa responsif & "menyambut" |
| `--ease-in` | cubic-bezier(0.4, 0, 1, 1) | elemen **keluar** (hilang, mengecil) | mempercepat menuju keluar → tidak menahan perhatian |
| `--ease-in-out` | cubic-bezier(0.4, 0, 0.2, 1) | perpindahan posisi di dalam layar, perubahan warna | simetris, mulus untuk gerak A→B |
| `--ease-spring` | cubic-bezier(0.34, 1.4, 0.64, 1) | press-release / pop kecil | overshoot halus memberi kesan "hidup" — hemat, hanya untuk aksi penting |

Default aman: gunakan `--ease-out` untuk hampir semua kemunculan.

## 3. Hover & Press — Button
- **Hover**: `transform: scale(1.03)` + `box-shadow: var(--elevation-accent)` (glow oranye) + warna naik ke `*-hover`. Durasi `--dur-micro`, easing `--ease-out`.
- **Press**: `transform: scale(0.97)` + warna `*-active` + hilangkan shadow. Easing `--ease-spring` saat dilepas.
- Outline/ghost: hover ubah `background` ke `--pk-surface-raised` dan `border-color` ke `--pk-neutral`/`--pk-accent`.

## 4. Hover & Press — Card
- **Hover** (card interaktif): `transform: translateY(-4px)` + naik ke `--elevation-2` + `border-color: var(--pk-accent)` (opsional, untuk item yang bisa dipilih). Durasi `--dur-component`.
- **Press**: turunkan kembali translateY ke 0 dengan `--dur-micro`.
- Card statis (bukan tautan) tidak beranimasi saat hover.

## 5. Transisi komponen dinamis platform
- **Hasil ranking Sparing Matcher** — tiap baris muncul *fade + rise 10px* berurutan (**stagger** `--motion-stagger` = 60ms per baris, `--ease-out`). Memberi kesan hasil "dihitung lalu disusun".
- **Badge status** (pending → accepted → rejected) — transisi **warna halus** pada `background` & `color` selama `--dur-component`, easing `--ease-in-out`. Jangan ganti teks mendadak tanpa transisi warna.
- **Loading / skeleton** saat perhitungan WP (win probability) berjalan — blok skeleton dengan **shimmer** (gradient bergerak, loop ~1.4s `ease-in-out`) menggantikan angka; ganti ke konten dengan cross-fade `--dur-component` setelah data siap.
- **Toast notification** (pengajuan sparing terkirim/diterima) — masuk dari kanan: `translateX(16px) → 0` + fade, `--dur-page` `--ease-out`; auto-dismiss 4–5s; keluar dengan `--ease-in`.
- **Modal** — overlay fade; panel fade + rise `--motion-rise` (8px), `--dur-page`.
- **Leaderboard update** — baris yang berubah posisi bergeser dengan `--ease-in-out`, stagger 40ms.

## 6. Prinsip umum
- Feedback dulu, estetika kemudian. Setiap animasi harus menjawab "apa yang barusan terjadi?".
- Hindari menganimasikan banyak properti mahal (gunakan `transform` & `opacity`, bukan `top/left/width`).
- Satu elemen = satu maksud gerak. Jangan menumpuk scale + rotate + slide sekaligus.
- Hormati `@media (prefers-reduced-motion: reduce)` → matikan transform/stagger, sisakan fade instan.

## 7. Ide motion graphic (masa depan, opsional)
1. **Match reveal** — dua kartu atlet meluncur dari kiri/kanan, bertemu di tengah, skor kecocokan count-up 600ms, garis oranye menyala di antaranya.
2. **Logo sting** — dua lengan mark masuk dari sisi berlawanan, "mengunci" di tengah dengan micro-shake 1 frame, aksen oranye menyapu wordmark.
