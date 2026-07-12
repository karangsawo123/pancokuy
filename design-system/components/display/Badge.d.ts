import * as React from "react";

/**
 * Badge pill uppercase 12px. tone accent hanya untuk status aktif/penting.
 */
export interface BadgeProps {
  tone?: "neutral" | "primary" | "accent" | "success" | "warning" | "error";
  /** Latar solid penuh (default: tint 12%) */
  solid?: boolean;
  /** Titik status di kiri label */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
