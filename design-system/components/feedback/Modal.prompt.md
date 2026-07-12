Dialog terpusat dengan judul, isi, dan footer tombol; tutup via tombol X atau klik overlay.

```jsx
const { Modal, Button } = window.PancoKuyDesignSystem_c463ea;
<Modal open={open} title="Konfirmasi sparing" onClose={close}
  footer={<><Button variant="outline" onClick={close}>Batal</Button><Button variant="primary">Konfirmasi</Button></>}>
  Tantang Raka Wijaya (78 kg, Top Roll) — Sabtu 15.00 WIB di Panco Garage Bandung?
</Modal>
```
