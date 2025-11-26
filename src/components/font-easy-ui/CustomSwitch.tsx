import { Sun, Moon } from "lucide-react";

interface SwicthProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const CustomSwitch = ({ checked, onChange }: SwicthProps) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="relative flex h-9 w-16 items-center rounded-full transition-all duration-300 border-2 border-gray-200 shadow-inner bg-white"
    >
      <div
        className={`absolute flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 shadow-md transition-all duration-300 ${
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
