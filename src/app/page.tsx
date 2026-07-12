import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Notification } from "@/components/ui/Notification";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";

export default function Home() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "48px 24px", display: "flex", flexDirection: "column", gap: 40 }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Image src="/logo/pancokuy-horizontal-light.svg" alt="PancoKuy" width={160} height={36} priority />
        <Badge tone="accent" dot>
          Fondasi Visual
        </Badge>
      </header>

      <section style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h1 style={{ font: "var(--text-display)", color: "var(--pk-text)", margin: 0 }}>PancoKuy</h1>
        <p style={{ font: "var(--text-body-lg)", color: "var(--pk-text-secondary)", margin: 0 }}>
          Platform komunitas arm wrestling — direktori basecamp, jadwal latihan, dan Sparing Matcher.
        </p>
      </section>

      <Notification tone="info" title="Halaman ini adalah showcase komponen">
        Belum mengimplementasikan fitur (Home, Sparing Matcher, dsb). Ini hanya memverifikasi bahwa
        design system (token warna, tipografi, komponen) sudah terpasang dan berfungsi di Next.js.
      </Notification>

      <Card>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2 style={{ font: "var(--text-h3)", color: "var(--pk-text)", margin: 0 }}>Contoh Komponen</h2>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button variant="primary">Cari Lawan</Button>
            <Button variant="secondary">Gabung Basecamp</Button>
            <Button variant="outline">Lihat Jadwal</Button>
            <Button variant="ghost">Batal</Button>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge tone="success">Aktif</Badge>
            <Badge tone="warning">Menunggu</Badge>
            <Badge tone="error">Ditolak</Badge>
            <Badge tone="primary">Pro</Badge>
          </div>

          <Field label="Nama Lengkap" hint="Sesuai identitas resmi">
            <Input placeholder="Contoh: Budi Santoso" />
          </Field>

          <Checkbox label="Saya sudah membaca aturan komunitas" />
        </div>
      </Card>
    </main>
  );
}
