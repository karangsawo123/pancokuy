"use client";

import * as React from "react";

/**
 * Checkbox PancoKuy — 20px, terisi accent oranye saat checked.
 */
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Checkbox({ checked, defaultChecked = false, onChange, label, disabled = false, style }: CheckboxProps) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };
  return (
    <label
      onClick={(e) => {
        e.preventDefault();
        toggle();
      }}
      style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, ...style }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "var(--radius-sm)",
          flex: "none",
          border: isOn ? "1px solid var(--pk-accent)" : "1px solid var(--pk-border-strong)",
          background: isOn ? "var(--pk-accent)" : "var(--pk-surface)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background .15s ease-out, border-color .15s ease-out",
        }}
      >
        {isOn && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        )}
      </span>
      {label && <span style={{ font: "var(--text-body-sm)", color: "var(--pk-text)" }}>{label}</span>}
    </label>
  );
}
