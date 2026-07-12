"use client";

import * as React from "react";

/**
 * Field teks PancoKuy — surface, border, fokus ring oranye.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: "default" | "error" | "success";
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  status?: "default" | "error" | "success";
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  status?: "default" | "error" | "success";
}

const baseField: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "var(--pk-surface)",
  color: "var(--pk-text)",
  border: "1px solid var(--pk-border)",
  borderRadius: "var(--radius-md)",
  font: "var(--text-body-md)",
  padding: "10px 14px",
  outline: "none",
  transition: "border-color .15s ease-out, box-shadow .15s ease-out",
};

function useFieldStyle(status: InputProps["status"], focused: boolean): React.CSSProperties {
  const borderColor =
    status === "error" ? "var(--pk-error)" : status === "success" ? "var(--pk-success)" : focused ? "var(--pk-accent)" : "var(--pk-border)";
  return { ...baseField, borderColor, boxShadow: focused ? "var(--focus-ring)" : "none" };
}

export function Input({ status = "default", style, onFocus, onBlur, ...rest }: InputProps) {
  const [focused, setFocused] = React.useState(false);
  return (
    <input
      {...rest}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      style={{ ...useFieldStyle(status, focused), height: 42, ...style }}
    />
  );
}

export function Textarea({ status = "default", rows = 4, style, onFocus, onBlur, ...rest }: TextareaProps) {
  const [focused, setFocused] = React.useState(false);
  return (
    <textarea
      rows={rows}
      {...rest}
      onFocus={(e) => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onBlur?.(e);
      }}
      style={{ ...useFieldStyle(status, focused), resize: "vertical", fontFamily: "var(--font-body)", ...style }}
    />
  );
}

export function Select({ status = "default", children, style, onFocus, onBlur, ...rest }: SelectProps) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        {...rest}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        style={{ ...useFieldStyle(status, focused), height: 42, appearance: "none", WebkitAppearance: "none", paddingRight: 38, cursor: "pointer", ...style }}
      >
        {children}
      </select>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--pk-text-secondary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      >
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    </div>
  );
}
