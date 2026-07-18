-- PancoKuy - schema awal (8 tabel BAB 3.3.3)
-- Catatan konversi tipe dari notasi proposal ke Postgres:
--   TINYINT -> smallint, ENUM(...) -> native Postgres enum type.
-- Lihat CLAUDE.md §5 untuk skema sumber dan docs/keputusan.md KP-008 untuk
-- perubahan tabel users (id = auth.users.id, tanpa password_hash).

-- ============================================================
-- Enum types
-- ============================================================
create type public.user_role as enum ('anggota', 'admin');
create type public.style_dominan_enum as enum ('Toproll', 'Hook', 'Press', 'Kingsmove', 'Belum Teridentifikasi');
create type public.tangan_sparing_enum as enum ('Kanan', 'Kiri', 'Keduanya');
create type public.sparing_source_enum as enum ('sparing_matcher', 'challenge_mode');
create type public.sparing_status_enum as enum ('pending', 'accepted', 'rejected', 'completed', 'cancelled');

-- ============================================================
-- Helper: updated_at otomatis
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- Tabel: users
-- id sengaja dibuat sama dengan auth.users.id (lihat KP-008),
-- password_hash dihapus karena password dikelola Supabase Auth.
-- ============================================================
create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  nama text not null,
  email text not null unique,
  role public.user_role not null default 'anggota',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_users_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

alter table public.users enable row level security;

-- Helper: cek apakah user yang sedang login adalah admin.
-- security definer diperlukan agar policy tabel lain bisa memeriksa role
-- tanpa terjebak rekursi RLS; hanya mengembalikan boolean, tidak membocorkan data.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.prevent_role_change_by_non_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Hanya admin yang dapat mengubah role pengguna';
  end if;
  return new;
end;
$$;

create trigger trg_prevent_role_change
before update on public.users
for each row
execute function public.prevent_role_change_by_non_admin();

create policy "users_select_authenticated"
on public.users for select
to authenticated
using (true);

create policy "users_insert_self"
on public.users for insert
to authenticated
with check (id = auth.uid());

create policy "users_update_self_or_admin"
on public.users for update
to authenticated
using (id = auth.uid() or public.is_admin())
with check (id = auth.uid() or public.is_admin());

-- "Automatically expose new tables" dimatikan di project settings, jadi grant
-- Data API ditulis eksplisit di sini (RLS di atas tetap yang membatasi per baris).
grant select, insert, update on public.users to authenticated;

-- ============================================================
-- Tabel: profil_atlet
-- ============================================================
create table public.profil_atlet (
  id bigint generated always as identity primary key,
  user_id uuid not null unique references public.users (id) on delete cascade,
  berat_badan decimal(5, 2),
  bulan_mulai_latihan smallint check (bulan_mulai_latihan between 1 and 12),
  tahun_mulai_latihan smallint,
  frekuensi_latihan smallint check (frekuensi_latihan >= 0),
  style_dominan public.style_dominan_enum not null default 'Belum Teridentifikasi',
  tangan_sparing public.tangan_sparing_enum,
  level_kemampuan smallint check (level_kemampuan between 1 and 3),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_profil_atlet_updated_at
before update on public.profil_atlet
for each row
execute function public.set_updated_at();

alter table public.profil_atlet enable row level security;

create policy "profil_atlet_select_authenticated"
on public.profil_atlet for select
to authenticated
using (true);

create policy "profil_atlet_insert_self_or_admin"
on public.profil_atlet for insert
to authenticated
with check (user_id = auth.uid() or public.is_admin());

create policy "profil_atlet_update_self_or_admin"
on public.profil_atlet for update
to authenticated
using (user_id = auth.uid() or public.is_admin())
with check (user_id = auth.uid() or public.is_admin());

grant select, insert, update on public.profil_atlet to authenticated;

-- ============================================================
-- Tabel: basecamp
-- CRUD hanya admin (KP-004); direktori dibaca publik.
-- ============================================================
create table public.basecamp (
  id bigint generated always as identity primary key,
  nama_basecamp text not null,
  alamat text not null,
  kota text not null,
  provinsi text not null,
  kontak_pengurus text not null,
  created_by uuid references public.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_basecamp_updated_at
before update on public.basecamp
for each row
execute function public.set_updated_at();

alter table public.basecamp enable row level security;

create policy "basecamp_select_public"
on public.basecamp for select
to anon, authenticated
using (true);

create policy "basecamp_write_admin_only"
on public.basecamp for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant select on public.basecamp to anon;
grant select, insert, update, delete on public.basecamp to authenticated;

-- ============================================================
-- Tabel: profil_atlet_basecamp (pivot many-to-many)
-- ============================================================
create table public.profil_atlet_basecamp (
  id bigint generated always as identity primary key,
  profil_atlet_id bigint not null references public.profil_atlet (id) on delete cascade,
  basecamp_id bigint not null references public.basecamp (id) on delete cascade,
  is_aktif boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profil_atlet_id, basecamp_id)
);

create trigger trg_profil_atlet_basecamp_updated_at
before update on public.profil_atlet_basecamp
for each row
execute function public.set_updated_at();

alter table public.profil_atlet_basecamp enable row level security;

create policy "profil_atlet_basecamp_select_authenticated"
on public.profil_atlet_basecamp for select
to authenticated
using (true);

create policy "profil_atlet_basecamp_write_owner_or_admin"
on public.profil_atlet_basecamp for all
to authenticated
using (
  public.is_admin()
  or exists (
    select 1 from public.profil_atlet pa
    where pa.id = profil_atlet_basecamp.profil_atlet_id
      and pa.user_id = auth.uid()
  )
)
with check (
  public.is_admin()
  or exists (
    select 1 from public.profil_atlet pa
    where pa.id = profil_atlet_basecamp.profil_atlet_id
      and pa.user_id = auth.uid()
  )
);

grant select, insert, update, delete on public.profil_atlet_basecamp to authenticated;

-- ============================================================
-- Tabel: wilayah_kota_berbatasan (referensi skor C1)
-- Tidak ada created_at/updated_at sesuai skema BAB 3.3.3.
-- ============================================================
create table public.wilayah_kota_berbatasan (
  id bigint generated always as identity primary key,
  kota_a text not null,
  kota_b text not null,
  provinsi text not null,
  check (kota_a <> kota_b)
);

-- Cegah pasangan kota_a/kota_b terdaftar dua kali dengan urutan terbalik.
create unique index wilayah_kota_berbatasan_pair_unique
on public.wilayah_kota_berbatasan (least(kota_a, kota_b), greatest(kota_a, kota_b));

alter table public.wilayah_kota_berbatasan enable row level security;

create policy "wilayah_kota_berbatasan_select_authenticated"
on public.wilayah_kota_berbatasan for select
to authenticated
using (true);

create policy "wilayah_kota_berbatasan_write_admin_only"
on public.wilayah_kota_berbatasan for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant select, insert, update, delete on public.wilayah_kota_berbatasan to authenticated;

-- ============================================================
-- Tabel: events
-- ============================================================
create table public.events (
  id bigint generated always as identity primary key,
  basecamp_id bigint references public.basecamp (id) on delete set null,
  judul_event text not null,
  jenis_event text not null,
  tanggal_event date not null,
  waktu_mulai time not null,
  waktu_selesai time,
  lokasi text not null,
  deskripsi text,
  created_by uuid references public.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_events_updated_at
before update on public.events
for each row
execute function public.set_updated_at();

alter table public.events enable row level security;

create policy "events_select_public"
on public.events for select
to anon, authenticated
using (true);

create policy "events_write_admin_only"
on public.events for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant select on public.events to anon;
grant select, insert, update, delete on public.events to authenticated;

-- ============================================================
-- Tabel: wp_criteria
-- ============================================================
create table public.wp_criteria (
  id bigint generated always as identity primary key,
  kode_kriteria text not null unique check (kode_kriteria in ('C1', 'C2', 'C3', 'C4', 'C5', 'C6')),
  nama_kriteria text not null,
  nilai_bobot_awal decimal not null check (nilai_bobot_awal > 0),
  bobot_normalisasi decimal not null default 0,
  updated_by uuid references public.users (id) on delete set null,
  updated_at timestamptz not null default now()
);

create trigger trg_wp_criteria_updated_at
before update on public.wp_criteria
for each row
execute function public.set_updated_at();

-- Jaga invarian Sigma(bobot_normalisasi) = 1 setiap kali nilai_bobot_awal berubah.
create or replace function public.recalculate_wp_normalisasi()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  total_bobot numeric;
begin
  select sum(nilai_bobot_awal) into total_bobot from public.wp_criteria;

  if total_bobot is not null and total_bobot > 0 then
    update public.wp_criteria
    set bobot_normalisasi = nilai_bobot_awal / total_bobot;
  end if;

  return null;
end;
$$;

create trigger trg_recalculate_wp_normalisasi
after insert or update of nilai_bobot_awal or delete on public.wp_criteria
for each statement
execute function public.recalculate_wp_normalisasi();

alter table public.wp_criteria enable row level security;

create policy "wp_criteria_select_authenticated"
on public.wp_criteria for select
to authenticated
using (true);

create policy "wp_criteria_update_admin_only"
on public.wp_criteria for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant select, update on public.wp_criteria to authenticated;

-- ============================================================
-- Tabel: sparing_requests
-- ============================================================
create table public.sparing_requests (
  id bigint generated always as identity primary key,
  requester_id uuid not null references public.users (id) on delete cascade,
  opponent_id uuid not null references public.users (id) on delete cascade,
  source public.sparing_source_enum not null,
  wp_score decimal(10, 6),
  status public.sparing_status_enum not null default 'pending',
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (requester_id <> opponent_id),
  check (source = 'sparing_matcher' or wp_score is null)
);

create trigger trg_sparing_requests_updated_at
before update on public.sparing_requests
for each row
execute function public.set_updated_at();

alter table public.sparing_requests enable row level security;

create policy "sparing_requests_select_participant_or_admin"
on public.sparing_requests for select
to authenticated
using (requester_id = auth.uid() or opponent_id = auth.uid() or public.is_admin());

create policy "sparing_requests_insert_requester"
on public.sparing_requests for insert
to authenticated
with check (requester_id = auth.uid());

create policy "sparing_requests_update_participant_or_admin"
on public.sparing_requests for update
to authenticated
using (requester_id = auth.uid() or opponent_id = auth.uid() or public.is_admin())
with check (requester_id = auth.uid() or opponent_id = auth.uid() or public.is_admin());

grant select, insert, update on public.sparing_requests to authenticated;
