import type { SvgProps } from "./types";

export const BrainIcon = ({ size = 24, ...props }: SvgProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4.5C12 2.567 10.433 1 8.5 1C6.567 1 5 2.567 5 4.5C3.343 4.5 2 5.843 2 7.5C2 8.53 2.523 9.436 3.315 9.973C2.523 10.676 2 11.695 2 12.843C2 14.55 3.222 15.97 4.842 16.287C4.616 16.738 4.5 17.247 4.5 17.5C4.5 19.433 6.067 21 8 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 4.5C12 2.567 13.567 1 15.5 1C17.433 1 19 2.567 19 4.5C20.657 4.5 22 5.843 22 7.5C22 8.53 21.477 9.436 20.685 9.973C21.477 10.676 22 11.695 22 12.843C22 14.55 20.778 15.97 19.158 16.287C19.384 16.738 19.5 17.247 19.5 17.5C19.5 19.433 17.933 21 16 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 1V23M8 21C8 22.105 9.79 23 12 23C14.21 23 16 22.105 16 21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 10H8M19 10H16M7 15H9M17 15H15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
