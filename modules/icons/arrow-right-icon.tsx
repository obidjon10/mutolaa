import type { SvgProps } from "./types";

export const ArrowRightIcon = ({ size = 9, ...props }: SvgProps) => (
  <svg
    {...props}
    fill="none"
    width={size}
    height={size}
    viewBox="0 0 9 9"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.703125 4.5C0.703125 4.26701 0.892005 4.07813 1.125 4.07813L6.8565 4.07813L5.32669 2.54831C5.16194 2.38356 5.16194 2.11644 5.32669 1.95169C5.49144 1.78694 5.75856 1.78694 5.92331 1.95169L8.17331 4.20169C8.33806 4.36644 8.33806 4.63356 8.17331 4.79831L5.92331 7.04831C5.75856 7.21306 5.49144 7.21306 5.32669 7.04831C5.16194 6.88356 5.16194 6.61644 5.32669 6.45169L6.8565 4.92188L1.125 4.92188C0.892005 4.92188 0.703125 4.733 0.703125 4.5Z"
      fill="currentColor"
    />
  </svg>
);
