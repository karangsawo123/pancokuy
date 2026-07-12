import * as React from "react";

/**
 * Field teks PancoKuy — surface #1E293B, border #334155, fokus ring oranye.
 * @startingPoint section="Components" subtitle="Input, textarea, select dengan status validasi" viewport="700x420"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Status validasi — mengubah warna border */
  status?: "default" | "error" | "success";
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  status?: "default" | "error" | "success";
  rows?: number;
  style?: React.CSSProperties;
}
export declare function Textarea(props: TextareaProps): JSX.Element;

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  status?: "default" | "error" | "success";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
