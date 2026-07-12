import React from "react";

const tones = {
  neutral: { background: "var(--pk-surface-raised)", color: "var(--pk-text-secondary)", border: "1px solid var(--pk-border)" },
  primary: { background: "var(--pk-primary-bg)", color: "var(--pk-primary-fg)", border: "1px solid transparent" },
  accent: { background: "var(--pk-accent-bg)", color: "var(--pk-accent-fg)", border: "1px solid transparent" },
  success: { background: "var(--pk-success-bg)", color: "var(--pk-success-fg)", border: "1px solid transparent" },
  warning: { background: "var(--pk-warning-bg)", color: "var(--pk-warning-fg)", border: "1px solid transparent" },
  error: { background: "var(--pk-error-bg)", color: "var(--pk-error-fg)", border: "1px solid transparent" },
};

export function Badge({ tone = "neutral", solid = false, dot = false, children, style }) {
  const t = tones[tone] || tones.neutral;
  const solidStyle = solid ? {
    background: tone === "accent" ? "var(--pk-accent)" : tone === "success" ? "var(--pk-success)" : tone === "warning" ? "var(--pk-warning)" : tone === "error" ? "var(--pk-error)" : "var(--pk-primary)",
    color: tone === "error" || tone === "primary" || tone === "neutral" ? "#FFFFFF" : "#0F172A",
    border: "1px solid transparent",
  } : {};
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      borderRadius: "var(--radius-pill)", padding: "3px 10px",
      font: "var(--text-caption)", letterSpacing: "var(--tracking-caps)", textTransform: "uppercase",
      whiteSpace: "nowrap",
      ...t, ...solidStyle, ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", flex: "none" }}></span>}
      {children}
    </span>
  );
}
