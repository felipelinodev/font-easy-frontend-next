interface InputProps {
  id: string;
  label?: string;
  type?: "text" | "number" | "password";
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
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm p-5 text-black-default" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        value={value}
        onChange={onChange}
        id={id}
        className={`focus:outline-1  focus:outline-black-default focus:outline-offset-1 bg-[#ECECEC] text-[16px] border placeholder:text-[16px]  placeholder:text-black-default border-[#D1D1D1] min-h-10 w-full  pl-4 p-2 m-1 rounded-full focus:placeholder:text-black/44 ${className}`}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
