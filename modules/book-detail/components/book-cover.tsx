import { BookCover } from "@/modules/common";

interface IProps {
  cover?: string;
  alt?: string;
}

export const Cover: React.FC<IProps> = ({ cover, alt }) => {
  if (!cover) return null;

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center">
        <div className="absolute size-73.75 rounded-full bg-muted dark:bg-muted-dark" />

        <BookCover
          title={alt ?? ""}
          cover={cover}
          width={205}
          height={312}
          rounded="rounded-sm"
          shadow="sm"
        />
      </div>
    </div>
  );
};
