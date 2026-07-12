import * as React from "react";

/**
 * Checkbox PancoKuy — 20px, terisi accent oranye saat checked.
 */
export interface CheckboxProps {
  /** Controlled state; pakai defaultChecked untuk uncontrolled */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
