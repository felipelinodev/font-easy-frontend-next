"use client";

import { forwardRef, useState, InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isError?: boolean;
}

export const InputFE = forwardRef<HTMLInputElement, InputProps>(({
  label,
  type = "text",
  className,
  id,
  isError = false,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label className={`p-5 text-sm ${isError ? 'text-primary-orange-two' : 'text-black-default'}`} htmlFor={id}>
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={isPasswordType && showPassword ? "text" : type}
          className={`focus:outline-1 ${isError ? 'border-primary-orange-two placeholder-primary-orange-two' : ' focus:outline-offset-1 placeholder:text-black-default focus:outline-black-default'}   bg-bg-gray-muted-primary/30 text-[16px] border placeholder:text-[16px]  border-gray-escure min-h-10 w-full pl-4 ${isPasswordType ? "pr-12" : "pr-4"} p-2 m-1 rounded-full  ${className}`}
          {...props}
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
});

InputFE.displayName = "InputFE";