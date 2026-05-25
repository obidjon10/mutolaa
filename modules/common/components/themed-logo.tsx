import Image from "next/image";

interface IThemedLogoProps {
  src: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
}

export const ThemedLogo = ({
  src,
  darkSrc,
  alt,
  width,
  height,
}: IThemedLogoProps) => (
  <>
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="block dark:hidden"
    />
    <Image
      src={darkSrc}
      alt={alt}
      width={width}
      height={height}
      className="hidden dark:block"
    />
  </>
);
