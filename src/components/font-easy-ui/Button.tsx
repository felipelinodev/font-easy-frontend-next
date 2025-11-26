"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "outline" | "tertiary" | "destructive";
  children: React.ReactNode;
}

const ButtonFE: React.FC<ButtonProps> = ({ variant, children, ...rest }) => {
  const variantStyles = {
    primary: "bg-orange-500 text-neutral-200",
    secondary: "bg-opacity-0 text-orange-500",
    outline: " ",
    tertiary: " ",
    destructive: " ",
  };

  return (
    <button
      className={`rounded-full font-medium hover:bg-orange-600 hover:cursor-pointer py-2 px-5 text-xs ${variantStyles[variant]}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonFE;
