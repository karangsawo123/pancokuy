Kartu konten dasar; pakai `interactive` untuk kartu yang bisa diklik (basecamp, atlet, jadwal).

```jsx
const { Card, Badge } = window.PancoKuyDesignSystem_c463ea;
<Card interactive onClick={...}>
  <h3 style={{font:"var(--text-h3)", color:"var(--pk-text)", margin:0}}>Panco Garage Bandung</h3>
  <p style={{font:"var(--text-body-sm)", color:"var(--pk-text-secondary)"}}>24 atlet aktif · Latihan Sel & Kam</p>
</Card>
```
