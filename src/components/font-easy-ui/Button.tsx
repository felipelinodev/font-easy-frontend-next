"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "outline" | "tertiary" | "destructive";
  textSize: "sm" | undefined;
  children: React.ReactNode;
}

const ButtonFE: React.FC<ButtonProps> = ({
  textSize,
  variant,
  children,
  ...rest
}) => {
  const variantStyles = {
    primary: "bg-primary-orange text-neutral-200",
    secondary: "bg-opacity-0 text-primary-orange",
    outline: " ",
    tertiary: " ",
    destructive: " ",
  };

  return (
    <button
      className={`rounded-full font-medium hover:bg-primary-orange-two hover:cursor-pointer py-2 ${
        textSize ? "text-sm" : "text-xs"
      } px-5  ${variantStyles[variant]}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonFE;
