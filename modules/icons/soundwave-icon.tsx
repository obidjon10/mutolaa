import type { SvgProps } from "./types";

export const SoundwaveIcon = ({ size = 24, ...props }: SvgProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 10V14M6 6V18M10 8V16M14 4V20M18 7V17M22 10V14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
