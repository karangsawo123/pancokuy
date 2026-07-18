export function getWhatsAppLink(nomor: string): string {
  const digits = nomor.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}
