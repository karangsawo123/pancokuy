Tombol aksi PancoKuy — pakai `primary` (oranye) hanya untuk CTA utama per layar; `secondary` steel untuk aksi pendamping.

```jsx
const { Button } = window.PancoKuyDesignSystem_c463ea;
<Button variant="primary" size="md" onClick={...}>Cari Lawan</Button>
<Button variant="secondary">Lihat Jadwal</Button>
<Button variant="outline" size="sm">Batal</Button>
<Button variant="destructive">Hapus Sparing</Button>
```

Varian: primary / secondary / outline / destructive / ghost. Ukuran sm/md/lg (34/42/50px). Props: `disabled`, `fullWidth`, `icon` (node di kiri label). Label pakai kata kerja pendek: "Gabung", "Simpan", "Cari Lawan".
