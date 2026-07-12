import * as React from "react";

/**
 * Pembungkus form field: label Nunito 600 + kontrol + pesan hint/error/success.
 * (Intentional addition — brief meminta pola validasi form.)
 */
export interface FieldProps {
  label?: React.ReactNode;
  /** Teks bantuan netral di bawah kontrol */
  hint?: React.ReactNode;
  /** Pesan error (merah) — kirim juga status="error" ke kontrol di dalamnya */
  error?: React.ReactNode;
  /** Pesan sukses (hijau) */
  success?: React.ReactNode;
  required?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Field(props: FieldProps): JSX.Element;
