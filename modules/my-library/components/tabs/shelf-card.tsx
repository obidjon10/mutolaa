import { useId } from "react";

import { BookCover } from "@/modules/common";

import { IShelf } from "../../models";

interface IProps {
  shelf: IShelf;
  onSelect: (shelf: IShelf) => void;
}

// Rotation configs for 1, 2, or 3 books
const BOOK_ROTATIONS: Record<
  number,
  { rotate: string; translateX: string; zIndex: number }[]
> = {
  1: [{ rotate: "0deg", translateX: "0px", zIndex: 2 }],
  2: [
    { rotate: "-10deg", translateX: "-18px", zIndex: 1 },
    { rotate: "10deg", translateX: "18px", zIndex: 1 },
  ],
  3: [
    { rotate: "-16deg", translateX: "-26px", zIndex: 1 },
    { rotate: "0deg", translateX: "0px", zIndex: 2 },
    { rotate: "16deg", translateX: "26px", zIndex: 1 },
  ],
};
const BOOK_WIDTH = 56;
const CONTAINER_WIDTH = 192; // w-48 = 12rem = 192px

function FolderShape({ className }: { className?: string }) {
  const uid = useId();
  const gradId = `fg-${uid}`;

  return (
    <svg
      viewBox="0 0 222 167"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: "drop-shadow(0 5px 14px rgba(0,0,0,0.04))" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9648 31.1982C13.9648 23.4199 13.9648 19.5308 15.4786 16.5598C16.8101 13.9465 18.9348 11.8219 21.5481 10.4903C24.5191 8.97656 28.4082 8.97656 36.1865 8.97656H71.6876C75.5782 8.97656 77.5235 8.97656 78.91 9.26218C81.0771 9.70859 80.4789 9.49793 82.4476 10.5079C83.7071 11.1541 87.7165 14.3776 95.7352 20.8247C99.4845 23.8391 104.501 26.2436 110.965 26.2436C115.657 26.2436 158.472 25.9903 185.629 25.8267C193.436 25.7797 197.34 25.7561 200.329 27.2633C202.959 28.5891 205.098 30.7157 206.44 33.337C207.965 36.317 207.965 40.2278 207.965 48.0495V114.644C207.965 126.312 207.965 132.145 205.694 136.602C203.697 140.522 200.51 143.709 196.59 145.706C192.134 147.977 186.3 147.977 174.632 147.977H47.2974C35.6299 147.977 29.7962 147.977 25.3398 145.706C21.4198 143.709 18.2328 140.522 16.2355 136.602C13.9648 132.145 13.9648 126.312 13.9648 114.644V31.1982Z"
        fill={`url(#${gradId})`}
        className="dark:fill-[#27272A]"
        stroke="#686868"
        strokeOpacity="0.06"
        strokeWidth="1.49617"
      />
      <defs>
        <linearGradient
          id={gradId}
          x1="110.965"
          y1="8.97656"
          x2="110.965"
          y2="167.834"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F7F7F7" />
          <stop offset="1" stopColor="#EBEBEB" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ShelfCard({ shelf, onSelect }: IProps) {
  const covers = shelf?.wallpaper?.slice(0, 3);
  const rotations = BOOK_ROTATIONS?.[covers?.length] ?? BOOK_ROTATIONS?.[3];

  const overlap =
    covers.length > 1
      ? Math.max(
          0,
          (covers.length * BOOK_WIDTH - CONTAINER_WIDTH) / (covers.length - 1),
        )
      : 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(shelf)}
      className="relative w-full cursor-pointer flex flex-col"
    >
      <div className="relative z-0 flex justify-center items-center mx-auto w-45 px-10">
        {covers?.length === 0 ? (
          <div className="w-14 h-21.5 rounded bg-[#E4E4E7] dark:bg-[#3F3F46]" />
        ) : (
          covers?.map((src, i) => {
            const style = rotations?.[i];
            return (
              <BookCover
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                cover={src || ""}
                title="Shelf Book"
                width={56}
                height={86}
                rounded="rounded"
                wrapperStyle={{
                  // transform: `rotate(${style?.rotate}) translateX(${style?.translateX})`,
                  // zIndex: style?.zIndex,
                  left: `${i * (BOOK_WIDTH - overlap)}px`,
                  transform: `rotate(${style?.rotate || "0deg"})`,
                  zIndex: style?.zIndex || i,
                }}
              />
            );
          })
        )}
      </div>

      {/* Folder — in front of books (higher z-index), overlaps book bottoms */}
      <div className="relative z-10 -mt-13 group">
        <FolderShape className="w-full" />
        {/* Shelf name on the folder face */}
        <p className="absolute bottom-10 left-7 text-sm  font-semibold truncate transition-colors text-[#18181B66] group-hover:text-gray-900 dark:group-hover:text-white">
          {shelf.name}
        </p>
      </div>
    </button>
  );
}
