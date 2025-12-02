import { Sun, Moon } from "lucide-react";

interface SwicthProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const CustomSwitch = ({ checked, onChange }: SwicthProps) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative flex cursor-pointer h-7 w-15 items-center rounded-full transition-all duration-300 border border-[#D1D1D1] bg-transparent"
    >
      <div
        className={`absolute flex h-5  w-5 items-center justify-center rounded-full bg-transparent transition-all duration-300 ${
          checked ? "translate-x-[34px]" : "translate-x-1"
        }`}
      >
        {checked ? (
          <Sun className="h-4 w-4 text-neutral-800" />
        ) : (
          <Moon className="h-4 w-4 text-neutral-800" />
        )}
      </div>
    </button>
  );
};

export default CustomSwitch;
