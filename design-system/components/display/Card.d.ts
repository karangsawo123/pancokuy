import * as React from "react";

/**
 * Kartu surface #1E293B, border #334155, radius 14, elevation-1.
 * interactive: hover naik (raised + rise -4px + elevation-2).
 * @startingPoint section="Components" subtitle="Kartu konten dark-surface" viewport="700x240"
 */
export interface CardProps {
  /** Hover rise + raised surface + cursor pointer */
  interactive?: boolean;
  /** Default var(--space-5) = 20px */
  padding?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
