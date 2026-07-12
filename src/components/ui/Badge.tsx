import * as React from "react";

/**
 * Badge pill uppercase 12px. tone accent hanya untuk status aktif/penting.
 */
export interface BadgeProps {
  tone?: "neutral" | "primary" | "accent" | "success" | "warning" | "error";
  solid?: boolean;
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const tones: Record<string, React.CSSProperties> = {
  neutral: { background: "var(--pk-surface-raised)", color: "var(--pk-text-secondary)", border: "1px solid var(--pk-border)" },
  primary: { background: "var(--pk-primary-bg)", color: "var(--pk-primary-fg)", border: "1px solid transparent" },
  accent: { background: "var(--pk-accent-bg)", color: "var(--pk-accent-fg)", border: "1px solid transparent" },
  success: { background: "var(--pk-success-bg)", color: "var(--pk-success-fg)", border: "1px solid transparent" },
  warning: { background: "var(--pk-warning-bg)", color: "var(--pk-warning-fg)", border: "1px solid transparent" },
  error: { background: "var(--pk-error-bg)", color: "var(--pk-error-fg)", border: "1px solid transparent" },
};

export function Badge({ tone = "neutral", solid = false, dot = false, children, style }: BadgeProps) {
  const t = tones[tone] || tones.neutral;
  const solidStyle: React.CSSProperties = solid
    ? {
        background:
          tone === "accent"
            ? "var(--pk-accent)"
            : tone === "success"
              ? "var(--pk-success)"
              : tone === "warning"
                ? "var(--pk-warning)"
                : tone === "error"
                  ? "var(--pk-error)"
                  : "var(--pk-primary)",
        color: tone === "error" || tone === "primary" || tone === "neutral" ? "#FFFFFF" : "#0F172A",
        border: "1px solid transparent",
      }
    : {};
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: "var(--radius-pill)",
        padding: "3px 10px",
        font: "var(--text-caption)",
        letterSpacing: "var(--tracking-caps)",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...t,
        ...solidStyle,
        ...style,
      }}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", flex: "none" }}></span>}
      {children}
    </span>
  );
}
