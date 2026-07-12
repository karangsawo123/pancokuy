import React from "react";

const sizes = {
  sm: { padding: "0 14px", height: 34, font: "700 0.8125rem/1 var(--font-heading)" },
  md: { padding: "0 20px", height: 42, font: "var(--text-button)" },
  lg: { padding: "0 28px", height: 50, font: "700 1.0625rem/1 var(--font-heading)" },
};

const variants = {
  primary: {
    base: { background: "var(--pk-accent)", color: "var(--pk-text-on-accent)", border: "1px solid transparent" },
    hover: { background: "var(--pk-accent-hover)", boxShadow: "var(--elevation-accent)" },
    active: { background: "var(--pk-accent-active)", boxShadow: "none" },
  },
  secondary: {
    base: { background: "var(--pk-primary)", color: "var(--pk-text-on-primary)", border: "1px solid transparent" },
    hover: { background: "var(--pk-primary-hover)" },
    active: { background: "var(--pk-primary-active)" },
  },
  outline: {
    base: { background: "transparent", color: "var(--pk-text)", border: "1px solid var(--pk-border-strong)" },
    hover: { background: "var(--pk-surface-raised)", borderColor: "var(--pk-neutral)" },
    active: { background: "var(--pk-surface)" },
  },
  destructive: {
    base: { background: "var(--pk-error)", color: "#FFFFFF", border: "1px solid transparent" },
    hover: { background: "#F05A5A" },
    active: { background: "#DC3535" },
  },
  ghost: {
    base: { background: "transparent", color: "var(--pk-text-secondary)", border: "1px solid transparent" },
    hover: { background: "var(--pk-surface-raised)", color: "var(--pk-text)" },
    active: { background: "var(--pk-surface)" },
  },
};

export function Button({ variant = "primary", size = "md", disabled = false, fullWidth = false, icon = null, children, onClick, style, ...rest }) {
  const [state, setState] = React.useState("base");
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const dyn = state === "base" ? {} : state === "hover" ? v.hover : { ...v.hover, ...v.active };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("base")}
      onMouseDown={() => setState("active")}
      onMouseUp={() => setState("hover")}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        borderRadius: "var(--radius-md)", cursor: disabled ? "not-allowed" : "pointer",
        transition: "background .15s ease-out, box-shadow .15s ease-out, border-color .15s ease-out",
        font: s.font, height: s.height, padding: s.padding,
        width: fullWidth ? "100%" : undefined,
        opacity: disabled ? 0.45 : 1,
        ...v.base, ...(disabled ? {} : dyn), ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
