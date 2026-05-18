import type { SvgProps } from "./types";

export const ChevronDownIcon = ({ size = 24, ...props }: SvgProps) => (
  <svg
    {...props}
    fill="none"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.8">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.4545 8.2045C4.89384 7.76517 5.60615 7.76517 6.04549 8.2045L12 14.159L17.9545 8.2045C18.3938 7.76517 19.1062 7.76517 19.5455 8.2045C19.9848 8.64384 19.9848 9.35615 19.5455 9.79549L12.7955 16.5455C12.3562 16.9848 11.6438 16.9848 11.2045 16.5455L4.4545 9.79549C4.01517 9.35615 4.01517 8.64384 4.4545 8.2045Z"
        fill="currentColor"
      />
    </g>
  </svg>
);
