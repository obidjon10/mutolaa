export const POPOVER_CONTENT_CLS =
  "rounded-2xl border border-white/10 bg-[#000000A3] p-4 text-white shadow-2xl backdrop-blur-md min-w-[220px]";

export const POPOVER_TITLE_CLS = "px-2 pb-2 text-xs font-medium text-white/60";

export const MinusIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CheckIcon = () => (
  <svg
    width="11"
    height="10"
    viewBox="0 0 11 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.94118 0.143524C10.2762 0.387174 10.3502 0.856239 10.1066 1.19121L4.37863 9.0662C4.25878 9.231 4.07703 9.3399 3.87522 9.36795C3.6734 9.39595 3.46887 9.34065 3.30866 9.21475L0.286602 6.83975C-0.0390728 6.5838 -0.0956027 6.1123 0.160342 5.7866C0.416287 5.46095 0.887787 5.4044 1.21346 5.66035L3.62346 7.55435L8.89348 0.308889C9.13713 -0.0260859 9.60623 -0.100121 9.94118 0.143524Z"
      fill="white"
    />
  </svg>
);
