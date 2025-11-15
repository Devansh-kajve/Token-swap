import React from "react";

export const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
