import * as React from "react";

/**
 * Modal terpusat — raised surface, radius 20, elevation-3, overlay gelap 68%.
 * Klik overlay = tutup. Fade + rise 8px saat masuk.
 */
export interface ModalProps {
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Baris tombol kanan-bawah (mis. Batal + Konfirmasi) */
  footer?: React.ReactNode;
  onClose?: () => void;
  /** Lebar px, default 480 */
  width?: number;
  style?: React.CSSProperties;
}
export declare function Modal(props: ModalProps): JSX.Element;
