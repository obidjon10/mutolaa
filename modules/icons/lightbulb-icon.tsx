import type { SvgProps } from "./types";

export const LightbulbIcon = ({ size = 24, ...props }: SvgProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18H15M10 22H14M12 2V3M4.22 4.22L4.93 4.93M1 12H3M21 12H23M19.07 4.22L18.36 4.93"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 14.25C16.7607 13.0938 18 11.1424 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 11.1424 7.23926 13.0938 9 14.25V16C9 16.5523 9.44772 17 10 17H14C14.5523 17 15 16.5523 15 16V14.25Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
