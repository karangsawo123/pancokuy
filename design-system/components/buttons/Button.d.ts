import * as React from "react";

/**
 * Tombol PancoKuy. Primary = accent oranye (CTA, hemat); secondary = primary steel;
 * outline & ghost untuk aksi tersier; destructive untuk aksi berbahaya.
 * @startingPoint section="Components" subtitle="Tombol primary/secondary/outline/destructive" viewport="700x260"
 */
export interface ButtonProps {
  /** Varian visual */
  variant?: "primary" | "secondary" | "outline" | "destructive" | "ghost";
  /** Ukuran: sm 34px, md 42px, lg 50px */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  /** Elemen icon opsional (mis. SVG Lucide 16–20px) di kiri label */
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
