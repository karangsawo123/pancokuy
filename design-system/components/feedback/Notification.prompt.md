Notifikasi inline atau toast (prop `toast`); tone info memakai oranye accent, bukan biru.

```jsx
const { Notification } = window.PancoKuyDesignSystem_c463ea;
<Notification tone="success" title="Sparing terkonfirmasi" onClose={...}>
  Raka menerima tantanganmu — Sabtu 15.00 di Panco Garage.
</Notification>
<Notification tone="info" toast title="Lawan baru ditemukan" />
```
