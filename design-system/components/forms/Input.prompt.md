Field teks dasar (Input/Textarea/Select) dengan status validasi; bungkus dengan `Field` untuk label + pesan.

```jsx
const { Input, Textarea, Select } = window.PancoKuyDesignSystem_c463ea;
<Input placeholder="Nama atlet" />
<Input status="error" defaultValue="7x kg" />
<Select><option>Kelas 70–78 kg</option></Select>
<Textarea rows={3} placeholder="Catatan sparing..." />
```

`status`: default | error (border merah) | success (border hijau). Fokus selalu ring oranye. Tinggi input/select 42px.
