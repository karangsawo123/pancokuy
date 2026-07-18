-- Seed data awal: wp_criteria & wilayah_kota_berbatasan
-- PENTING: nilai_bobot_awal di sini adalah PLACEHOLDER (bobot sama rata),
-- BUKAN hasil wawancara expert judgement senior komunitas (BAB 3.1.3).
-- Jangan dipakai sebagai angka laporan BAB 4 sebelum diganti data asli.
-- Lihat catatan di docs/progres.md.
insert into public.wp_criteria (kode_kriteria, nama_kriteria, nilai_bobot_awal) values
  ('C1', 'Lokasi Latihan Aktif', 1),
  ('C2', 'Berat Badan', 1),
  ('C3', 'Lama Aktif Latihan', 1),
  ('C4', 'Frekuensi Latihan', 1),
  ('C5', 'Tangan Sparing', 1),
  ('C6', 'Level Kemampuan', 1);

-- Data dummy/simulasi kota berbatasan di Jawa Timur (CLAUDE.md §2: bukan data
-- populasi riil). Cakupan awal kabupaten/kota utama Jatim untuk kebutuhan
-- skor C1 = 3 (kota berbatasan). Tambahkan pasangan lain sesuai basecamp
-- yang benar-benar jadi objek penelitian.
insert into public.wilayah_kota_berbatasan (kota_a, kota_b, provinsi) values
  ('Surabaya', 'Gresik', 'Jawa Timur'),
  ('Surabaya', 'Sidoarjo', 'Jawa Timur'),
  ('Sidoarjo', 'Mojokerto', 'Jawa Timur'),
  ('Sidoarjo', 'Pasuruan', 'Jawa Timur'),
  ('Gresik', 'Lamongan', 'Jawa Timur'),
  ('Gresik', 'Mojokerto', 'Jawa Timur'),
  ('Mojokerto', 'Jombang', 'Jawa Timur'),
  ('Mojokerto', 'Pasuruan', 'Jawa Timur'),
  ('Pasuruan', 'Malang', 'Jawa Timur'),
  ('Pasuruan', 'Probolinggo', 'Jawa Timur'),
  ('Malang', 'Batu', 'Jawa Timur'),
  ('Malang', 'Probolinggo', 'Jawa Timur'),
  ('Malang', 'Lumajang', 'Jawa Timur'),
  ('Malang', 'Blitar', 'Jawa Timur'),
  ('Malang', 'Kediri', 'Jawa Timur'),
  ('Probolinggo', 'Lumajang', 'Jawa Timur'),
  ('Probolinggo', 'Situbondo', 'Jawa Timur'),
  ('Lumajang', 'Jember', 'Jawa Timur'),
  ('Jember', 'Bondowoso', 'Jawa Timur'),
  ('Jember', 'Banyuwangi', 'Jawa Timur'),
  ('Bondowoso', 'Situbondo', 'Jawa Timur'),
  ('Bondowoso', 'Banyuwangi', 'Jawa Timur'),
  ('Situbondo', 'Banyuwangi', 'Jawa Timur'),
  ('Kediri', 'Nganjuk', 'Jawa Timur'),
  ('Kediri', 'Jombang', 'Jawa Timur'),
  ('Kediri', 'Blitar', 'Jawa Timur'),
  ('Kediri', 'Tulungagung', 'Jawa Timur'),
  ('Blitar', 'Tulungagung', 'Jawa Timur'),
  ('Tulungagung', 'Trenggalek', 'Jawa Timur'),
  ('Trenggalek', 'Ponorogo', 'Jawa Timur'),
  ('Ponorogo', 'Madiun', 'Jawa Timur'),
  ('Ponorogo', 'Magetan', 'Jawa Timur'),
  ('Madiun', 'Magetan', 'Jawa Timur'),
  ('Madiun', 'Ngawi', 'Jawa Timur'),
  ('Madiun', 'Nganjuk', 'Jawa Timur'),
  ('Magetan', 'Ngawi', 'Jawa Timur'),
  ('Ngawi', 'Bojonegoro', 'Jawa Timur'),
  ('Nganjuk', 'Jombang', 'Jawa Timur'),
  ('Nganjuk', 'Bojonegoro', 'Jawa Timur'),
  ('Jombang', 'Lamongan', 'Jawa Timur'),
  ('Lamongan', 'Bojonegoro', 'Jawa Timur'),
  ('Lamongan', 'Tuban', 'Jawa Timur'),
  ('Bojonegoro', 'Tuban', 'Jawa Timur'),
  ('Bangkalan', 'Sampang', 'Jawa Timur'),
  ('Sampang', 'Pamekasan', 'Jawa Timur'),
  ('Pamekasan', 'Sumenep', 'Jawa Timur');
