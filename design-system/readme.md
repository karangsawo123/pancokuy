# PancoKuy Design System

**PancoKuy** adalah platform digital komunitas arm wrestling (panco) berbasis web di Indonesia. Ia menyatukan **direktori basecamp**, **jadwal latihan**, dan **profil atlet** dalam satu wadah, plus fitur **Sparing Matcher** yang merekomendasikan lawan latih tanding yang seimbang secara terukur.

Sistem ini **light-mode-first** dengan palet "Deep Steel" (dark-mode didukung sebagai tema alternatif), dibangun dari brand brief + satu file logo SVG yang diberikan user (`uploads/`). Tidak ada codebase, Figma, atau deck sumber.

**Ruang lingkup tahap ini:** design system berhenti sebagai **fondasi visual** — logo, warna, tipografi, komponen dasar, spacing, motion. Implementasi website beserta fiturnya (Home, Sparing Matcher, Direktori Basecamp, dll) dikerjakan pada sesi terpisah setelah design system ini fix; karena itu UI kit website dan komponen navigasi tingkat-halaman **tidak** disertakan di sini.

## Sumber
- Brand brief tertulis (chat): palet "Deep Steel", typography (Plus Jakarta Sans + Nunito), aturan aksen. Default tema diubah ke **light-mode** atas permintaan user (revisi); dark-mode tetap didukung sebagai alternatif.
- `uploads/ChatGPT Image Jul 3, 2026, 03_34_00 PM.svg` — logo lockup (icon panco + wordmark "PancoKuy"). Catatan: brief menyebut logo tanpa wordmark, tetapi file aslinya SUDAH memuat wordmark; variasi icon-only dan horizontal di-derive dari file itu.
- Font: tidak ada file font diberikan → dimuat dari Google Fonts (Plus Jakarta Sans, Nunito). Keduanya memang font Google, jadi bukan substitusi.

## Prinsip visual merek
1. **Kuat tapi rapi** — kesan kekuatan datang dari kontras gelap-terang dan heading tebal, bukan dari dekorasi.
2. **Deep Steel, light-first** — light-mode adalah default (background #EEF2F7, surface putih); dark-mode (background #0F172A) tersedia sebagai tema alternatif via `[data-theme="dark"]`.
3. **Oranye = aksi** — Accent #F97316 hanya untuk CTA, badge status aktif, dan ikon penting. Jangan untuk area luas.
4. **Terukur** — data (skor keseimbangan, jadwal, statistik atlet) tampil jelas dan dapat dibandingkan.
5. **Komunitas dulu** — copy hangat dan mengajak ("Kuy!"), bukan korporat.

## CONTENT FUNDAMENTALS
- Bahasa: **Indonesia kasual-sopan**, sapaan "kamu" (bukan "Anda"). Merek menyebut diri "PancoKuy" atau "kami".
- Nada: energik, suportif, komunitas gym — bukan agresif. "Kuy" dipakai sebagai ajakan khas merek: *"Sparring kuy!"*, *"Gabung basecamp terdekatmu."*
- Casing: Judul pakai Title Case pendek atau Sentence case; tombol pakai kata kerja pendek: **"Cari Lawan"**, **"Gabung"**, **"Lihat Jadwal"**, **"Simpan"**.
- Angka dan ukuran ditulis eksplisit (kelas berat "78 kg", skor kecocokan "92%").
- Emoji: **tidak dipakai** di UI. Energi datang dari warna aksen dan type tebal.
- Istilah produk: *basecamp* (komunitas/tempat latihan), *sparing* (latih tanding), *Sparing Matcher* (fitur), *atlet* (member).

## VISUAL FOUNDATIONS
- **Warna (light default)**: background #EEF2F7; surface #FFFFFF; raised/hover #F1F5F9; border #E2E8F0; text #0F172A / secondary #475569. **Dark (alternatif)**: bg #0F172A, surface #1E293B, raised #24334A, border #334155, text #F1F5F9 / secondary #94A3B8. Konstanta merek sama di kedua tema: primary steel #1E3A5F, accent #F97316 (hemat). Semantic: success #22C55E, warning #EAB308, error #EF4444 — tiap status punya `-bg` (tint) dan `-fg` (teks-di-atas-tint yang disetel per tema). Pemetaan lengkap: kartu "Light ↔ Dark Mapping" + `tokens/colors.css`.
- **Type**: Plus Jakarta Sans 700/800 untuk heading & button; Nunito 400/600 untuk body/label/caption. Maks 2 bobot per komponen. Skala di `tokens/typography.css` (display 48 → caption 12). Body min 16px di atas Background/Surface.
- **Spacing**: skala 4px (`--space-1..20`); grid 12 kolom, max 1200px, gutter 24px, margin mobile 16px.
- **Radii**: 6 (badge) / 10 (button, input) / 14 (card) / 20 (modal) / pill.
- **Background**: warna solid saja — tanpa gradien besar, tanpa tekstur, tanpa ilustrasi background. Foto (atlet/basecamp) tampil di dalam card dengan radius, tone dingin.
- **Elevation**: light default = shadow lembut abu-slate (`--elevation-1..3`); dark = surface lebih terang + shadow lebih dalam. Modal overlay disetel per tema (`--surface-overlay`). CTA boleh `--elevation-accent` (glow oranye) — hemat.
- **Border**: 1px `--pk-border` di semua card/input; fokus = ring oranye 3px 35% (`--focus-ring`).
- **Hover**: surface bergeser satu langkah (`--pk-surface`→`--pk-surface-raised`); button menerang (`*-hover`); teks link → oranye lebih terang + underline. **Press**: warna `*-active`.
- **Motion**: cepat & fungsional. Durasi micro 120ms / komponen 240ms / halaman-modal 360ms; easing `--ease-out` (masuk), `--ease-in` (keluar), `--ease-spring` (press pop). Token di `tokens/motion.css`; spesifikasi lengkap (hover/press, stagger ranking, skeleton WP, badge status, toast) di `guidelines/motion.md` + grup kartu "Motion".
- **Transparansi/blur**: hanya overlay modal; tidak ada glassmorphism.
- **Imagery**: foto dokumentasi latihan/pertandingan, tone dingin sedikit kontras; hindari stock cerah. Placeholder abu bila belum ada foto.

## Logo
`assets/logo/`:
- `pancokuy-original.svg` — file asli (kotak hitam 1254×1254, lockup stacked).
- `pancokuy-lockup-dark.svg` / `-light.svg` — lockup stacked transparan; dark = putih #FCFCFC (untuk bg gelap), light = navy #1E3A5F (untuk bg terang). Aksen oranye dinormalisasi ke #F97316.
- `pancokuy-icon-dark.svg` / `-light.svg` — icon-only (favicon, app icon, avatar).
- `pancokuy-horizontal-dark.svg` / `-light.svg` — horizontal lockup icon + wordmark.
Aturan: clear space minimal = tinggi kepalan (≈25% tinggi icon) di semua sisi; ukuran minimum icon 24px, horizontal lockup 120px lebar; jangan re-color di luar dua varian ini; jangan menaruh varian putih di bg terang atau navy di bg gelap. Detail: `guidelines/logo.md` + kartu di tab Design System.

## ICONOGRAPHY
- Tidak ada icon set bawaan dari sumber. **Substitusi yang dipakai: [Lucide](https://lucide.dev) via CDN** — stroke 2px, geometris, cocok dengan kesan tegas merek. FLAG: ganti bila brand punya set resmi.
- Ukuran icon: 16/20/24px; warna default `--pk-text-secondary`, icon penting `--pk-accent`.
- Emoji & unicode-as-icon: tidak dipakai.

## Theming
- **Default = Light.** Token tema hidup di `:root` (light). Dark diaktifkan dengan menaruh `data-theme="dark"` pada `<html>` (atau ancestor mana pun) — semua token warna & elevation otomatis mengikuti karena komponen hanya membaca variabel semantik (`--pk-bg`, `--pk-surface`, `--pk-text`, dst), bukan hex mentah.
- **Tombol theme-switch TIDAK dibangun di tahap ini** — cukup didokumentasikan. Saat implementasi: toggle atribut `data-theme` dan (opsional) simpan preferensi + hormati `prefers-color-scheme`.
- Pemetaan token Light vs Dark: lihat kartu "Light ↔ Dark Mapping" (tab Colors) dan `tokens/colors.css`.

## Index
- `styles.css` — entry global (import semua token).
- `tokens/` — `colors.css` (light default + dark override), `typography.css`, `spacing.css`, `elevation.css`, `motion.css`, `fonts.css`, `base.css`.
- `assets/logo/` — semua varian logo.
- `guidelines/` — kartu specimen foundations + `logo.md`, `motion.md`.
- `components/` — `buttons/` (Button), `forms/` (Input, Textarea, Select, Checkbox, Field), `display/` (Card, Badge), `feedback/` (Notification, Modal).
- `SKILL.md` — instruksi pemakaian sebagai Agent Skill.

_Catatan revisi: UI kit website (`ui_kits/web/`) dan komponen `Navbar` dihapus pada sesi revisi ini — design system difokuskan sebagai fondasi visual saja. Keduanya akan dibangun kembali pada sesi implementasi website._

## Intentional additions
- `Field` (label + input + pesan validasi) — diminta brief ("form ... dan validasi").
- Icon set Lucide — brief tidak menyediakan set icon; substitusi terdekat.
- Token `-fg` per status (`--pk-success-fg`, dll) — ditambah agar teks badge/tint tetap kontras baik di light maupun dark.

## Catatan aturan yang disengaja
- **Notification** memakai border kiri 3px berwarna tone. Ini pengecualian yang disengaja untuk sinyal status yang cepat terbaca — bukan pola "card rounded + border kiri warna" yang dihindari; komponen umum (Card) tetap memakai border penuh 1px.
- **Accent oranye** hanya muncul pada CTA primary, badge status aktif, garis nav aktif, dan ikon penting — tidak pernah pada area luas/background.
