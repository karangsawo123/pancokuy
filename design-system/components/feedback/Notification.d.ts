import * as React from "react";

/**
 * Notifikasi inline / toast — border kiri 3px warna tone, icon dalam tint 12%.
 */
export interface NotificationProps {
  tone?: "info" | "success" | "warning" | "error";
  title?: React.ReactNode;
  /** Isi pesan */
  children?: React.ReactNode;
  /** Tampilkan tombol tutup */
  onClose?: () => void;
  /** Mode toast: raised surface, elevation-3, max-width 380 */
  toast?: boolean;
  style?: React.CSSProperties;
}
export declare function Notification(props: NotificationProps): JSX.Element;
