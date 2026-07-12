import React from "react";

export function Modal({ open = false, title, children, footer, onClose, width = 480, style }) {
  if (!open) return null;
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "var(--surface-overlay)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
    >
      <div style={{
        background: "var(--pk-surface-raised)",
        border: "1px solid var(--pk-border)",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--elevation-3)",
        width, maxWidth: "100%", maxHeight: "85vh",
        display: "flex", flexDirection: "column",
        animation: "pkModalIn .25s ease-out",
        ...style,
      }}>
        <style>{`@keyframes pkModalIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`}</style>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 0" }}>
          <span style={{ font: "var(--text-h3)", color: "var(--pk-text)" }}>{title}</span>
          {onClose && (
            <button onClick={onClose} aria-label="Tutup" style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--pk-text-secondary)", lineHeight: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
            </button>
          )}
        </div>
        <div style={{ padding: "12px 24px 20px", overflowY: "auto", font: "var(--text-body-md)", color: "var(--pk-text-secondary)" }}>
          {children}
        </div>
        {footer && (
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "0 24px 20px" }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
