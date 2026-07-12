import * as React from "react";

/**
 * Notifikasi inline / toast — border kiri 3px warna tone, icon dalam tint 12%.
 */
export interface NotificationProps {
  tone?: "info" | "success" | "warning" | "error";
  title?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  toast?: boolean;
  style?: React.CSSProperties;
}

const toneMap: Record<string, { color: string; bg: string }> = {
  info: { color: "var(--pk-accent-fg)", bg: "var(--pk-accent-bg)" },
  success: { color: "var(--pk-success-fg)", bg: "var(--pk-success-bg)" },
  warning: { color: "var(--pk-warning-fg)", bg: "var(--pk-warning-bg)" },
  error: { color: "var(--pk-error-fg)", bg: "var(--pk-error-bg)" },
};

const icons: Record<string, React.ReactNode> = {
  info: <path d="M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"></path>,
  success: <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3"></path>,
  warning: <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01"></path>,
  error: <path d="M12 8v4M12 16h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"></path>,
};

export function Notification({ tone = "info", title, children, onClose, toast = false, style }: NotificationProps) {
  const t = toneMap[tone] || toneMap.info;
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        background: toast ? "var(--pk-surface-raised)" : "var(--pk-surface)",
        border: "1px solid var(--pk-border)",
        borderLeft: `3px solid ${t.color}`,
        borderRadius: "var(--radius-md)",
        boxShadow: toast ? "var(--elevation-3)" : "var(--elevation-1)",
        padding: "12px 14px",
        maxWidth: toast ? 380 : undefined,
        ...style,
      }}
    >
      <span
        style={{
          width: 32,
          height: 32,
          flex: "none",
          borderRadius: "var(--radius-sm)",
          background: t.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ stroke: t.color }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icons[tone] || icons.info}
        </svg>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ font: "var(--text-label)", color: "var(--pk-text)", marginBottom: children ? 2 : 0 }}>{title}</div>}
        {children && <div style={{ font: "var(--text-body-sm)", color: "var(--pk-text-secondary)" }}>{children}</div>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Tutup"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--pk-text-secondary)", lineHeight: 0 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </div>
  );
}
