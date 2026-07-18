-- "Automatically expose new tables" dimatikan di project settings, jadi grant
-- Data API tidak otomatis mencakup service_role juga. service_role sudah punya
-- atribut BYPASSRLS (lewat semua policy), tapi tetap butuh privilege tabel dasar.
grant select, insert, update, delete on all tables in schema public to service_role;

-- Supaya tabel baru di masa depan otomatis dapat privilege yang sama tanpa
-- perlu migration grant manual berulang.
alter default privileges in schema public
  grant select, insert, update, delete on tables to service_role;
