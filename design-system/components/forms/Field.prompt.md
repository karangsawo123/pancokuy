Label + kontrol + pesan validasi dalam satu kolom; pasangkan `error`/`success` dengan prop `status` kontrol di dalamnya.

```jsx
const { Field, Input } = window.PancoKuyDesignSystem_c463ea;
<Field label="Berat badan" required error="Masukkan angka dalam kg, mis. 78">
  <Input status="error" defaultValue="7x kg" />
</Field>
```
