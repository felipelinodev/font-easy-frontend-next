import { Circle } from "lucide-react";

type CardInfosProps = {
  title: string;
  subtitle: string;
};

export const CardInfos = ({ title, subtitle }: CardInfosProps) => {
  return (
    <div className="p-3 gap-3 flex justify-start pb-5 max-w-[210px] items-baseline bg-white/30 backdrop-blur-xs relative border border-white/70 top-45 rounded-2xl">
      <Circle size={16} className="align-text-top text-orange-500" />
      <div>
        <h3 className="text-[16px] font-medium">{title}</h3>
        <p className="text-xs py-1 text-[#6B6B6B]">{subtitle}</p>
      </div>
    </div>
  );
};
