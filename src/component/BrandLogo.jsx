import Image from "next/image";

const BrandLogo = ({
  className = "",
  width = 180,
  height = 64,
  subtitle,
  subtitleClassName = "",
  imageClassName = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`.trim()}>
      <Image
        src="/logo.png"
        alt="Care Connect logo"
        width={width}
        height={height}
        priority
        className={`h-auto w-auto object-contain ${imageClassName}`.trim()}
      />
      {subtitle ? <div className={`mt-1 ${subtitleClassName}`.trim()}>{subtitle}</div> : null}
    </div>
  );
};

export default BrandLogo;