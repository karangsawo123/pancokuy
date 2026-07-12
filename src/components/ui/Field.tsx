import * as React from "react";

/**
 * Pembungkus form field: label Nunito 600 + kontrol + pesan hint/error/success.
 */
export interface FieldProps {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  success?: React.ReactNode;
  required?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Field({ label, hint, error, success, required = false, children, style }: FieldProps) {
  const msg = error || success || hint;
  const msgColor = error ? "var(--pk-error)" : success ? "var(--pk-success)" : "var(--pk-text-secondary)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }}>
      {label && (
        <span style={{ font: "var(--text-label)", color: "var(--pk-text)" }}>
          {label}
          {required && <span style={{ color: "var(--pk-accent)" }}> *</span>}
        </span>
      )}
      {children}
      {msg && <span style={{ font: "var(--text-caption)", color: msgColor }}>{msg}</span>}
    </div>
  );
}
