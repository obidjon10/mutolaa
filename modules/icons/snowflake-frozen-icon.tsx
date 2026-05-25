import { useId } from "react";

import type { SvgProps } from "./types";

export const SnowflakeFrozenIcon = ({
  width = 36,
  height = 40,
  ...props
}: SvgProps) => {
  const rawId = useId();
  const id = rawId.replace(/:/g, "_");
  const g = (n: number) => `${id}_paint${n}`;

  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 36 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.4595 30.5957L10.0495 32.9239L9.55626 35.7244C9.50896 35.9917 9.12681 35.9969 9.07275 35.7304L8.02539 30.5957H10.4595Z" fill={`url(#${g(0)})`} />
      <path d="M10.4595 30.5957L10.0495 32.9239L9.55626 35.7244C9.50896 35.9917 9.12681 35.9969 9.07275 35.7304L8.02539 30.5957H10.4595Z" fill={`url(#${g(1)})`} />
      <path d="M10.4586 30.5957L10.4249 30.7902L9.55544 35.7236C9.53592 35.837 9.45483 35.9023 9.36549 35.9211L9.00586 30.595H10.4586V30.5957Z" fill={`url(#${g(2)})`} />
      <path d="M28.9592 30.5957L28.089 35.5367C28.0417 35.804 27.6596 35.8085 27.6048 35.5427L26.5957 30.5957H28.9592Z" fill={`url(#${g(3)})`} />
      <path d="M28.9592 30.5957L28.089 35.5367C28.0417 35.804 27.6596 35.8085 27.6048 35.5427L26.5957 30.5957H28.9592Z" fill={`url(#${g(4)})`} />
      <path d="M28.9597 30.5957L28.0896 35.5367C28.0693 35.6501 27.9889 35.7154 27.8996 35.7334L27.5527 30.5957H28.9597Z" fill={`url(#${g(5)})`} />
      <path d="M25.7224 30.5957L24.931 35.0885C24.8837 35.3558 24.5016 35.361 24.4468 35.0945L23.5293 30.595H25.7216L25.7224 30.5957Z" fill={`url(#${g(6)})`} />
      <path d="M25.7224 30.5957L24.931 35.0885C24.8837 35.3558 24.5016 35.361 24.4468 35.0945L23.5293 30.595H25.7216L25.7224 30.5957Z" fill={`url(#${g(7)})`} />
      <path d="M25.7232 30.5957L24.9318 35.0885C24.9115 35.2018 24.8312 35.2672 24.7419 35.2852L24.4258 30.595H25.7232V30.5957Z" fill={`url(#${g(8)})`} />
      <path d="M11.6089 30.5957L10.8904 34.6718C10.8431 34.9391 10.4609 34.9436 10.4068 34.6778L10.0495 32.9232L9.57422 30.595H11.6089V30.5957Z" fill={`url(#${g(9)})`} />
      <path d="M11.6089 30.5957L10.8904 34.6718C10.8431 34.9391 10.4609 34.9436 10.4068 34.6778L10.0495 32.9232L9.57422 30.595H11.6089V30.5957Z" fill={`url(#${g(10)})`} />
      <path d="M11.6077 30.5957L10.8892 34.6718C10.8696 34.7851 10.7893 34.8505 10.6992 34.8685L10.4237 30.7902L10.4102 30.5957H11.6069H11.6077Z" fill={`url(#${g(11)})`} />
      <circle cx="18" cy="18" r="18" fill={`url(#${g(12)})`} />
      <path d="M3.05118 26.7356C5.93328 31.0771 10.7922 33.9913 16.345 34.1954C16.3886 34.197 16.4313 34.1978 16.4749 34.1995L2.74609 21.0808L3.05118 26.7348V26.7356Z" fill={`url(#${g(13)})`} />
      <path d="M19.9524 32.0439C20.2159 32.0439 20.4156 32.2819 20.3698 32.5417L19.4651 37.6779C19.411 37.9827 18.9756 37.988 18.9133 37.6854L17.9387 32.9111C17.8471 32.4636 18.1895 32.0447 18.646 32.0447H19.9516L19.9524 32.0439Z" fill={`url(#${g(14)})`} />
      <path d="M19.9524 32.0439C20.2159 32.0439 20.4156 32.2819 20.3698 32.5417L19.4651 37.6779C19.411 37.9827 18.9756 37.988 18.9133 37.6854L17.9387 32.9111C17.8471 32.4636 18.1895 32.0447 18.646 32.0447H19.9516L19.9524 32.0439Z" fill={`url(#${g(15)})`} />
      <path d="M19.9527 32.0439C20.2162 32.0439 20.4159 32.2819 20.3701 32.5417L19.4654 37.6779C19.4421 37.807 19.3505 37.8821 19.2492 37.9024L18.8535 32.0439H19.9534H19.9527Z" fill={`url(#${g(16)})`} />
      <path d="M12.9363 31.4333C13.5903 31.4333 14.0865 32.0242 13.9724 32.6684L12.9679 38.3707C12.901 38.7461 12.365 38.7528 12.2884 38.3797L11.0886 32.5002C10.976 31.9491 11.3972 31.4333 11.9595 31.4333H12.9356H12.9363Z" fill={`url(#${g(17)})`} />
      <path d="M12.9363 31.4333C13.5903 31.4333 14.0865 32.0242 13.9724 32.6684L12.9679 38.3707C12.901 38.7461 12.365 38.7528 12.2884 38.3797L11.0886 32.5002C10.976 31.9491 11.3972 31.4333 11.9595 31.4333H12.9356H12.9363Z" fill={`url(#${g(18)})`} />
      <path d="M12.9371 31.4333C13.591 31.4333 14.0873 32.0242 13.9732 32.6684L12.9686 38.3707C12.9401 38.5299 12.8275 38.6215 12.7021 38.647L12.2148 31.4333H12.9371Z" fill={`url(#${g(19)})`} />
      <path d="M14.6573 31.4333C15.0154 31.4333 15.2865 31.7562 15.2241 32.1091L14.6746 35.2286C14.6378 35.4343 14.345 35.4373 14.3029 35.2331L13.6467 32.0167C13.5852 31.7149 13.8156 31.4333 14.1235 31.4333H14.6573Z" fill={`url(#${g(20)})`} />
      <path d="M14.6573 31.4333C15.0154 31.4333 15.2865 31.7562 15.2241 32.1091L14.6746 35.2286C14.6378 35.4343 14.345 35.4373 14.3029 35.2331L13.6467 32.0167C13.5852 31.7149 13.8156 31.4333 14.1235 31.4333H14.6573Z" fill={`url(#${g(21)})`} />
      <path d="M14.6566 31.4333C15.0148 31.4333 15.2858 31.7562 15.2235 32.1091L14.6739 35.2286C14.6581 35.3157 14.5966 35.366 14.5282 35.3795L14.2617 31.4333H14.6566Z" fill={`url(#${g(22)})`} />
      <path d="M23.3301 31C23.7441 31 24.0576 31.365 23.9858 31.7635L22.566 39.6445C22.4811 40.1124 21.7973 40.1207 21.699 39.6559L20.0056 31.5425C19.9471 31.2629 20.1662 31.0008 20.4586 31.0008H23.3309L23.3301 31Z" fill={`url(#${g(23)})`} />
      <path d="M23.3301 31C23.7441 31 24.0576 31.365 23.9858 31.7635L22.566 39.6445C22.4811 40.1124 21.7973 40.1207 21.699 39.6559L20.0056 31.5425C19.9471 31.2629 20.1662 31.0008 20.4586 31.0008H23.3309L23.3301 31Z" fill={`url(#${g(24)})`} />
      <path d="M23.3309 31C23.7449 31 24.0583 31.365 23.9866 31.7635L22.5668 39.6445C22.5302 39.8426 22.3867 39.9569 22.2269 39.9889L21.6055 31H23.3317H23.3309Z" fill={`url(#${g(25)})`} />
      <path d="M0.893645 19.2593L3.91708 21.505C4.23949 21.7445 4.48648 22.0713 4.6288 22.4469C4.77112 22.8224 4.80279 23.2309 4.72007 23.6239C4.65788 23.9202 4.66041 24.2264 4.72748 24.5217C4.79455 24.8169 4.92459 25.0942 5.1087 25.3346L6.25919 26.8356C6.5514 27.2166 6.70423 27.6862 6.69222 28.1662L6.47477 36.869C6.46829 37.1409 6.09114 37.2028 5.99757 36.9472L3.43878 29.9507C3.16908 29.213 2.71533 28.5564 2.12058 28.0434C1.57621 27.574 1.14918 26.9838 0.873611 26.32C0.598045 25.6562 0.481585 24.9371 0.533539 24.2202L0.893776 19.26L0.893645 19.2593Z" fill={`url(#${g(26)})`} />
      <path d="M2.11885 28.0434C2.71372 28.5563 3.1675 29.2129 3.43706 29.9507L5.99584 36.9472C6.03568 37.0552 6.12549 37.1056 6.21748 37.1083L5.44561 30.0482C5.35423 29.2097 4.99368 28.4234 4.41796 27.8069C3.74398 27.0842 3.36858 26.1332 3.36723 25.145L3.36655 24.1865C3.36571 23.424 3.14213 22.6784 2.72288 22.0415L0.89192 19.2593L0.531683 24.2194C0.479502 24.9363 0.595859 25.6555 0.87144 26.3194C1.14702 26.9833 1.57418 27.5734 2.11872 28.0426L2.11885 28.0434Z" fill={`url(#${g(27)})`} />
      <path d="M0.533203 24.8676C0.616156 26.0868 1.18045 27.2339 2.11933 28.0436C2.71419 28.5565 3.16797 29.2131 3.43753 29.9509L5.99632 36.9474C6.08976 37.2022 6.46691 37.1404 6.47352 36.8692L6.69097 28.1664C6.70302 27.6861 6.55004 27.2169 6.25794 26.8358L5.10745 25.3348C4.83914 24.9845 4.69076 24.5625 4.67632 24.1304L0.533335 24.8684L0.533203 24.8676Z" fill={`url(#${g(28)})`} />
      <path d="M35.3665 16.4622L32.4341 18.8256C32.1214 19.0776 31.8875 19.4139 31.7601 19.7948C31.6328 20.1757 31.6173 20.5851 31.7155 20.9745C31.7893 21.2681 31.7989 21.5742 31.7435 21.8719C31.6882 22.1696 31.5692 22.4518 31.3947 22.6992L30.3044 24.2445C30.0275 24.6368 29.8933 25.1121 29.9243 25.5913L30.4854 34.2787C30.5026 34.5501 30.8819 34.597 30.9653 34.3379L33.2457 27.2458C33.486 26.498 33.9135 25.824 34.4875 25.2879C35.0129 24.7974 35.4163 24.1908 35.6654 23.5166C35.9145 22.8424 36.0025 22.1192 35.9223 21.4049L35.3664 16.4629L35.3665 16.4622Z" fill={`url(#${g(29)})`} />
      <path d="M35.3665 16.4622L32.4341 18.8256C32.1214 19.0776 31.8875 19.4139 31.7601 19.7948C31.6328 20.1757 31.6173 20.5851 31.7155 20.9745C31.7893 21.2681 31.7989 21.5742 31.7435 21.8719C31.6882 22.1696 31.5692 22.4518 31.3947 22.6992L30.3044 24.2445C30.0275 24.6368 29.8933 25.1121 29.9243 25.5913L30.4854 34.2787C30.5026 34.5501 30.8819 34.597 30.9653 34.3379L33.2457 27.2458C33.486 26.498 33.9135 25.824 34.4875 25.2879C35.0129 24.7974 35.4163 24.1908 35.6654 23.5166C35.9145 22.8424 36.0025 22.1192 35.9223 21.4049L35.3664 16.4629L35.3665 16.4622Z" fill={`url(#${g(30)})`} />
      <path d="M34.4873 25.2879C33.9132 25.8239 33.4857 26.4979 33.2455 27.2458L30.9651 34.3379C30.9296 34.4474 30.8418 34.5013 30.75 34.5076L31.2424 27.4226C31.3005 26.5811 31.6297 25.7811 32.1807 25.1424C32.8256 24.3937 33.1631 23.4285 33.1254 22.4411L33.0882 21.4833C33.0589 20.7214 33.2529 19.9675 33.6466 19.3146L35.3663 16.4622L35.9222 21.4042C36.0026 22.1185 35.9148 22.8417 35.6656 23.516C35.4165 24.1902 35.013 24.7968 34.4874 25.2871L34.4873 25.2879Z" fill={`url(#${g(31)})`} />
      <defs>
        <linearGradient id={g(0)} x1="8.68677" y1="33.0483" x2="9.39777" y2="33.176" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#91DCFA" />
        </linearGradient>
        <linearGradient id={g(1)} x1="9.46241" y1="33.2118" x2="9.93241" y2="33.2681" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(2)} x1="9.60364" y1="33.1681" x2="9.08634" y2="33.0172" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(3)} x1="27.2406" y1="32.9613" x2="27.9313" y2="33.0852" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#91DCFA" />
        </linearGradient>
        <linearGradient id={g(4)} x1="27.8691" y1="33.0756" x2="28.508" y2="33.1882" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(5)} x1="28.3028" y1="33.1424" x2="27.4942" y2="33.0012" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(6)} x1="24.1344" y1="32.7534" x2="24.7749" y2="32.8683" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#91DCFA" />
        </linearGradient>
        <linearGradient id={g(7)} x1="24.6645" y1="32.8779" x2="25.2756" y2="32.953" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(8)} x1="25.3779" y1="32.9687" x2="24.7104" y2="32.8373" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(9)} x1="10.142" y1="32.5588" x2="10.7366" y2="32.6662" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#91DCFA" />
        </linearGradient>
        <linearGradient id={g(10)} x1="10.1433" y1="32.7324" x2="11.1494" y2="32.6386" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(11)} x1="10.9725" y1="32.7321" x2="10.5873" y2="32.7321" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <radialGradient id={g(12)} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12.679 8.69863) scale(20.7786)">
          <stop stopColor="#99E6FC" />
          <stop offset="0.13" stopColor="#8EE1FB" />
          <stop offset="0.36" stopColor="#71D5F9" />
          <stop offset="0.66" stopColor="#43C2F5" />
          <stop offset="1" stopColor="#08A9F1" />
        </radialGradient>
        <linearGradient id={g(13)} x1="7.44865" y1="27.8375" x2="3.97432" y2="28.3628" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0182FC" stopOpacity="0" />
          <stop offset="0.1" stopColor="#017FFA" stopOpacity="0.04" />
          <stop offset="0.25" stopColor="#017AF5" stopOpacity="0.13" />
          <stop offset="0.43" stopColor="#0171ED" stopOpacity="0.29" />
          <stop offset="0.64" stopColor="#0164E3" stopOpacity="0.51" />
          <stop offset="0.85" stopColor="#0153D5" stopOpacity="0.79" />
          <stop offset="1" stopColor="#0148CC" />
        </linearGradient>
        <linearGradient id={g(14)} x1="18.5161" y1="34.9857" x2="19.345" y2="34.9677" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#91DCFA" />
        </linearGradient>
        <linearGradient id={g(15)} x1="19.4432" y1="34.9467" x2="19.9147" y2="35.0519" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(16)} x1="19.3363" y1="34.9642" x2="18.795" y2="34.9462" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(17)} x1="11.7748" y1="35.0557" x2="12.7569" y2="35.0347" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#91DCFA" />
        </linearGradient>
        <linearGradient id={g(18)} x1="12.9274" y1="35.0685" x2="13.5078" y2="35.1977" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(19)} x1="12.7779" y1="35.0384" x2="12.1405" y2="35.0167" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(20)} x1="14.0221" y1="33.4149" x2="14.5589" y2="33.4037" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#91DCFA" />
        </linearGradient>
        <linearGradient id={g(21)} x1="14.6521" y1="33.4219" x2="14.9697" y2="33.4925" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(22)} x1="14.5695" y1="33.4055" x2="14.2212" y2="33.3934" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(23)} x1="20.9693" y1="35.5074" x2="22.3157" y2="35.4771" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#91DCFA" />
        </linearGradient>
        <linearGradient id={g(24)} x1="22.4662" y1="35.4402" x2="23.255" y2="35.6193" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(25)} x1="22.3625" y1="35.4801" x2="21.5135" y2="35.4497" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(26)} x1="2.99281" y1="28.3679" x2="4.98149" y2="27.746" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#91DCFA" />
        </linearGradient>
        <linearGradient id={g(27)} x1="3.57466" y1="28.1766" x2="5.2611" y2="27.5703" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(28)} x1="5.04782" y1="30.6293" x2="6.53016" y2="30.594" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(29)} x1="31.2323" y1="24.8086" x2="33.854" y2="25.7984" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5FBFF" />
          <stop offset="1" stopColor="#91DCFA" />
        </linearGradient>
        <linearGradient id={g(30)} x1="32.4925" y1="25.2681" x2="34.0952" y2="25.9245" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
        <linearGradient id={g(31)} x1="33.0378" y1="25.4784" x2="31.3279" y2="24.9392" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60B7FF" stopOpacity="0" />
          <stop offset="0.12" stopColor="#60B7FF" stopOpacity="0.02" />
          <stop offset="0.25" stopColor="#60B7FF" stopOpacity="0.07" />
          <stop offset="0.37" stopColor="#60B7FF" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#60B7FF" stopOpacity="0.26" />
          <stop offset="0.63" stopColor="#60B7FF" stopOpacity="0.41" />
          <stop offset="0.76" stopColor="#60B7FF" stopOpacity="0.59" />
          <stop offset="0.89" stopColor="#60B7FF" stopOpacity="0.8" />
          <stop offset="1" stopColor="#60B7FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
