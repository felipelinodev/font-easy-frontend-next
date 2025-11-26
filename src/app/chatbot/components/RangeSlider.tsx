import React, { useState, useRef, useEffect } from "react";

interface RangeSliderProps {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  showValue?: boolean;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  defaultValue = 50,
  onChange,
  showValue = false,
}) => {
  const [value, setValue] = useState<number>(defaultValue);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (newValue: number) => {
    const clampedValue = Math.min(Math.max(newValue, min), max);
    setValue(clampedValue);
    onChange?.(clampedValue);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateValueFromMouse(e.clientX);
  };

  const updateValueFromMouse = (clientX: number) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = (clientX - rect.left) / rect.width;
    const newValue = Math.round(min + percentage * (max - min));
    handleChange(newValue);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValueFromMouse(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="relative p-5 w-full max-w-[1000px]">
      <div
        ref={sliderRef}
        className="relative h-16 bg-gradient-to-r from-[#2a2a2a] via-[#5a5a5a] to-[#e5e5e5] rounded cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        <div
          className={`absolute top-1/2 w-8 h-8 bg-transparent border-[3px] border-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg transition-transform duration-150 ${
            isDragging
              ? "scale-110 cursor-grabbing"
              : "cursor-grab hover:scale-110"
          }`}
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
