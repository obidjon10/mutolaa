import type { SvgProps } from "./types";

export const ListenIcon = ({ size = 24, ...props }: SvgProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 18V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 19C21 20.6569 19.2091 22 17 22H16C15.4477 22 15 21.5523 15 21V17C15 16.4477 15.4477 16 16 16H21V19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 19C3 20.6569 4.79086 22 7 22H8C8.55228 22 9 21.5523 9 21V17C9 16.4477 8.55228 16 8 16H3V19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
