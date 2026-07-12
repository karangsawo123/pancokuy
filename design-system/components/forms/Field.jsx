import React from "react";

export function Field({ label, hint, error, success, required = false, children, style }) {
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
