/* @ds-bundle: {"format":4,"namespace":"PancoKuyDesignSystem_c463ea","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Notification","sourcePath":"components/feedback/Notification.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"4976d51fd073","components/display/Badge.jsx":"a978e099a0e7","components/display/Card.jsx":"478ae5ea32aa","components/feedback/Modal.jsx":"cbe6b702a606","components/feedback/Notification.jsx":"b85f2cfe65e3","components/forms/Checkbox.jsx":"69a2bfcb0e65","components/forms/Field.jsx":"32ba1157ed3f","components/forms/Input.jsx":"ba66388d2b24"},"inlinedExternals":[],"unexposedExports":[{"name":"useFieldStyle","sourcePath":"components/forms/Input.jsx"}]} */

(() => {

const __ds_ns = (window.PancoKuyDesignSystem_c463ea = window.PancoKuyDesignSystem_c463ea || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    padding: "0 14px",
    height: 34,
    font: "700 0.8125rem/1 var(--font-heading)"
  },
  md: {
    padding: "0 20px",
    height: 42,
    font: "var(--text-button)"
  },
  lg: {
    padding: "0 28px",
    height: 50,
    font: "700 1.0625rem/1 var(--font-heading)"
  }
};
const variants = {
  primary: {
    base: {
      background: "var(--pk-accent)",
      color: "var(--pk-text-on-accent)",
      border: "1px solid transparent"
    },
    hover: {
      background: "var(--pk-accent-hover)",
      boxShadow: "var(--elevation-accent)"
    },
    active: {
      background: "var(--pk-accent-active)",
      boxShadow: "none"
    }
  },
  secondary: {
    base: {
      background: "var(--pk-primary)",
      color: "var(--pk-text-on-primary)",
      border: "1px solid transparent"
    },
    hover: {
      background: "var(--pk-primary-hover)"
    },
    active: {
      background: "var(--pk-primary-active)"
    }
  },
  outline: {
    base: {
      background: "transparent",
      color: "var(--pk-text)",
      border: "1px solid var(--pk-border-strong)"
    },
    hover: {
      background: "var(--pk-surface-raised)",
      borderColor: "var(--pk-neutral)"
    },
    active: {
      background: "var(--pk-surface)"
    }
  },
  destructive: {
    base: {
      background: "var(--pk-error)",
      color: "#FFFFFF",
      border: "1px solid transparent"
    },
    hover: {
      background: "#F05A5A"
    },
    active: {
      background: "#DC3535"
    }
  },
  ghost: {
    base: {
      background: "transparent",
      color: "var(--pk-text-secondary)",
      border: "1px solid transparent"
    },
    hover: {
      background: "var(--pk-surface-raised)",
      color: "var(--pk-text)"
    },
    active: {
      background: "var(--pk-surface)"
    }
  }
};
function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  icon = null,
  children,
  onClick,
  style,
  ...rest
}) {
  const [state, setState] = React.useState("base");
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const dyn = state === "base" ? {} : state === "hover" ? v.hover : {
    ...v.hover,
    ...v.active
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    onMouseEnter: () => setState("hover"),
    onMouseLeave: () => setState("base"),
    onMouseDown: () => setState("active"),
    onMouseUp: () => setState("hover"),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "background .15s ease-out, box-shadow .15s ease-out, border-color .15s ease-out",
      font: s.font,
      height: s.height,
      padding: s.padding,
      width: fullWidth ? "100%" : undefined,
      opacity: disabled ? 0.45 : 1,
      ...v.base,
      ...(disabled ? {} : dyn),
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
const tones = {
  neutral: {
    background: "var(--pk-surface-raised)",
    color: "var(--pk-text-secondary)",
    border: "1px solid var(--pk-border)"
  },
  primary: {
    background: "var(--pk-primary-bg)",
    color: "var(--pk-primary-fg)",
    border: "1px solid transparent"
  },
  accent: {
    background: "var(--pk-accent-bg)",
    color: "var(--pk-accent-fg)",
    border: "1px solid transparent"
  },
  success: {
    background: "var(--pk-success-bg)",
    color: "var(--pk-success-fg)",
    border: "1px solid transparent"
  },
  warning: {
    background: "var(--pk-warning-bg)",
    color: "var(--pk-warning-fg)",
    border: "1px solid transparent"
  },
  error: {
    background: "var(--pk-error-bg)",
    color: "var(--pk-error-fg)",
    border: "1px solid transparent"
  }
};
function Badge({
  tone = "neutral",
  solid = false,
  dot = false,
  children,
  style
}) {
  const t = tones[tone] || tones.neutral;
  const solidStyle = solid ? {
    background: tone === "accent" ? "var(--pk-accent)" : tone === "success" ? "var(--pk-success)" : tone === "warning" ? "var(--pk-warning)" : tone === "error" ? "var(--pk-error)" : "var(--pk-primary)",
    color: tone === "error" || tone === "primary" || tone === "neutral" ? "#FFFFFF" : "#0F172A",
    border: "1px solid transparent"
  } : {};
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      borderRadius: "var(--radius-pill)",
      padding: "3px 10px",
      font: "var(--text-caption)",
      letterSpacing: "var(--tracking-caps)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      ...t,
      ...solidStyle,
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "currentColor",
      flex: "none"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function Card({
  interactive = false,
  padding = "var(--space-5)",
  children,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: interactive && hover ? "var(--pk-surface-raised)" : "var(--pk-surface)",
      border: "1px solid var(--pk-border)",
      borderRadius: "var(--radius-lg)",
      boxShadow: interactive && hover ? "var(--elevation-2)" : "var(--elevation-1)",
      transform: interactive && hover ? "translateY(-4px)" : "none",
      transition: "background .18s ease-out, box-shadow .18s ease-out, transform .18s ease-out",
      cursor: interactive ? "pointer" : "default",
      padding,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
function Modal({
  open = false,
  title,
  children,
  footer,
  onClose,
  width = 480,
  style
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget && onClose) onClose();
    },
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "var(--surface-overlay)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--pk-surface-raised)",
      border: "1px solid var(--pk-border)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--elevation-3)",
      width,
      maxWidth: "100%",
      maxHeight: "85vh",
      display: "flex",
      flexDirection: "column",
      animation: "pkModalIn .25s ease-out",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes pkModalIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }`), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 24px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-h3)",
      color: "var(--pk-text)"
    }
  }, title), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Tutup",
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 6,
      color: "var(--pk-text-secondary)",
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 24px 20px",
      overflowY: "auto",
      font: "var(--text-body-md)",
      color: "var(--pk-text-secondary)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      padding: "0 24px 20px"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Notification.jsx
try { (() => {
const toneMap = {
  info: {
    color: "var(--pk-accent-fg)",
    bg: "var(--pk-accent-bg)"
  },
  success: {
    color: "var(--pk-success-fg)",
    bg: "var(--pk-success-bg)"
  },
  warning: {
    color: "var(--pk-warning-fg)",
    bg: "var(--pk-warning-bg)"
  },
  error: {
    color: "var(--pk-error-fg)",
    bg: "var(--pk-error-bg)"
  }
};
const icons = {
  info: /*#__PURE__*/React.createElement("path", {
    d: "M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
  }),
  success: /*#__PURE__*/React.createElement("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3"
  }),
  warning: /*#__PURE__*/React.createElement("path", {
    d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01"
  }),
  error: /*#__PURE__*/React.createElement("path", {
    d: "M12 8v4M12 16h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
  })
};
function Notification({
  tone = "info",
  title,
  children,
  onClose,
  toast = false,
  style
}) {
  const t = toneMap[tone] || toneMap.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      flex: "none",
      borderRadius: "var(--radius-sm)",
      background: t.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: t.color.startsWith("var") ? undefined : t.color,
    style: {
      stroke: `${t.color}`
    },
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, icons[tone] || icons.info)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-label)",
      color: "var(--pk-text)",
      marginBottom: children ? 2 : 0
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body-sm)",
      color: "var(--pk-text-secondary)"
    }
  }, children)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Tutup",
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: 4,
      color: "var(--pk-text-secondary)",
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Notification });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Notification.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  style
}) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isOn = checked !== undefined ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (checked === undefined) setInternal(!isOn);
    onChange && onChange(!isOn);
  };
  return /*#__PURE__*/React.createElement("label", {
    onClick: e => {
      e.preventDefault();
      toggle();
    },
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: "var(--radius-sm)",
      flex: "none",
      border: isOn ? "1px solid var(--pk-accent)" : "1px solid var(--pk-border-strong)",
      background: isOn ? "var(--pk-accent)" : "var(--pk-surface)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background .15s ease-out, border-color .15s ease-out"
    }
  }, isOn && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#0F172A",
    strokeWidth: "3.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body-sm)",
      color: "var(--pk-text)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  hint,
  error,
  success,
  required = false,
  children,
  style
}) {
  const msg = error || success || hint;
  const msgColor = error ? "var(--pk-error)" : success ? "var(--pk-success)" : "var(--pk-text-secondary)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-label)",
      color: "var(--pk-text)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--pk-accent)"
    }
  }, " *")), children, msg && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-caption)",
      color: msgColor
    }
  }, msg));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const baseField = {
  width: "100%",
  boxSizing: "border-box",
  background: "var(--pk-surface)",
  color: "var(--pk-text)",
  border: "1px solid var(--pk-border)",
  borderRadius: "var(--radius-md)",
  font: "var(--text-body-md)",
  padding: "10px 14px",
  outline: "none",
  transition: "border-color .15s ease-out, box-shadow .15s ease-out"
};
function useFieldStyle(status, focused) {
  const borderColor = status === "error" ? "var(--pk-error)" : status === "success" ? "var(--pk-success)" : focused ? "var(--pk-accent)" : "var(--pk-border)";
  return {
    ...baseField,
    borderColor,
    boxShadow: focused ? "var(--focus-ring)" : "none"
  };
}
function Input({
  status = "default",
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      ...useFieldStyle(status, focused),
      height: 42,
      ...style
    }
  }));
}
function Textarea({
  status = "default",
  rows = 4,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, rest, {
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      ...useFieldStyle(status, focused),
      resize: "vertical",
      fontFamily: "var(--font-body)",
      ...style
    }
  }));
}
function Select({
  status = "default",
  children,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({}, rest, {
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      ...useFieldStyle(status, focused),
      height: 42,
      appearance: "none",
      WebkitAppearance: "none",
      paddingRight: 38,
      cursor: "pointer",
      ...style
    }
  }), children), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--pk-text-secondary)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })));
}
Object.assign(__ds_scope, { useFieldStyle, Input, Textarea, Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Notification = __ds_scope.Notification;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Select = __ds_scope.Select;

})();
