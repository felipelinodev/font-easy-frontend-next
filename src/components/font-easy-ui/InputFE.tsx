"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  id: string;
  label?: string;
  type?: "text" | "number" | "password" | "email";
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
}

export function InputFE({
  label,
  type = "text",
  placeholder,
  onChange,
  className,
  id,
  value,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm p-5 text-black-default" htmlFor={id}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          value={value}
          onChange={onChange}
          id={id}
          className={`focus:outline-1 focus:outline-black-default focus:outline-offset-1 bg-bg-gray-muted-primary/30 text-[16px] border placeholder:text-[16px] placeholder:text-black-default border-gray-escure min-h-10 w-full pl-4 ${isPasswordType ? "pr-12" : "pr-4"} p-2 m-1 rounded-full focus:placeholder:text-black/44 ${className}`}
          type={isPasswordType && showPassword ? "text" : type}
          placeholder={placeholder}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-gray-escure p-2 rounded-full hover:bg-gray-muted-contrast cursor-pointer transition-colors"
          >
            {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}
