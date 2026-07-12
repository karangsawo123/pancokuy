import React from "react";

const baseField = {
  width: "100%", boxSizing: "border-box",
  background: "var(--pk-surface)", color: "var(--pk-text)",
  border: "1px solid var(--pk-border)", borderRadius: "var(--radius-md)",
  font: "var(--text-body-md)", padding: "10px 14px", outline: "none",
  transition: "border-color .15s ease-out, box-shadow .15s ease-out",
};

export function useFieldStyle(status, focused) {
  const borderColor = status === "error" ? "var(--pk-error)" : status === "success" ? "var(--pk-success)" : focused ? "var(--pk-accent)" : "var(--pk-border)";
  return { ...baseField, borderColor, boxShadow: focused ? "var(--focus-ring)" : "none" };
}

export function Input({ status = "default", style, ...rest }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <input
      {...rest}
      onFocus={(e) => { setFocused(true); rest.onFocus && rest.onFocus(e); }}
      onBlur={(e) => { setFocused(false); rest.onBlur && rest.onBlur(e); }}
      style={{ ...useFieldStyle(status, focused), height: 42, ...style }}
    />
  );
}

export function Textarea({ status = "default", rows = 4, style, ...rest }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <textarea
      rows={rows}
      {...rest}
      onFocus={(e) => { setFocused(true); rest.onFocus && rest.onFocus(e); }}
      onBlur={(e) => { setFocused(false); rest.onBlur && rest.onBlur(e); }}
      style={{ ...useFieldStyle(status, focused), resize: "vertical", fontFamily: "var(--font-body)", ...style }}
    />
  );
}

export function Select({ status = "default", children, style, ...rest }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        {...rest}
        onFocus={(e) => { setFocused(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocused(false); rest.onBlur && rest.onBlur(e); }}
        style={{ ...useFieldStyle(status, focused), height: 42, appearance: "none", WebkitAppearance: "none", paddingRight: 38, cursor: "pointer", ...style }}
      >
        {children}
      </select>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pk-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <path d="m6 9 6 6 6-6"></path>
      </svg>
    </div>
  );
}
