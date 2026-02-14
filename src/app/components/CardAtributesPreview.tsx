import Image from "next/image";

type CardAtributesPreviewProps = {
  title1: string;
  title2: string;
  ImageSrc: string;
  BottomDescription: string;
};

export const CardAtributesPreview = ({
  title1,
  title2,
  ImageSrc,
  BottomDescription,
}: CardAtributesPreviewProps) => {
  return (
    <div>
      <div className="max-w-[447px] rounded-2xl shadow-xl font-medium border-white border-2 bg-gray-surface py-6 pl-6">
        <h3 className="text-2xl text-primary-orange">
          {title1} <span className="text-black-default">{title2}</span>
        </h3>
        <Image
          className="py-5"
          src={ImageSrc}
          alt="Range Change font"
          width={434.84}
          height={157.61}
        />
        <p className="text-xs font-normal pb-3 text-black-default">
          {BottomDescription}
        </p>
      </div>
    </div>
  );
};