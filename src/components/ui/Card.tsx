"use client";

import * as React from "react";

/**
 * Kartu surface, border 1px, radius 14, elevation-1.
 * interactive: hover naik (raised + rise -4px + elevation-2).
 */
export interface CardProps {
  interactive?: boolean;
  padding?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Card({ interactive = false, padding = "var(--space-5)", children, onClick, style }: CardProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: interactive && hover ? "var(--pk-surface-raised)" : "var(--pk-surface)",
        border: "1px solid var(--pk-border)",
        borderRadius: "var(--radius-lg)",
        boxShadow: interactive && hover ? "var(--elevation-2)" : "var(--elevation-1)",
        transform: interactive && hover ? "translateY(-4px)" : "none",
        transition: "background .18s ease-out, box-shadow .18s ease-out, transform .18s ease-out",
        cursor: interactive ? "pointer" : "default",
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
