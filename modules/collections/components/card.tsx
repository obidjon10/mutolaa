import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { COLLECTION_FALLBACK_COLOR } from "@/modules/common";

import { ICollection } from "../models";


interface ICollectionCardProps extends ICollection {
    priority?: boolean;
}

export const CollectionCard = ({
    id,
    title,
    image,
    cover_image,
    color_code,
    priority,
}: ICollectionCardProps) => {
    const color = color_code || COLLECTION_FALLBACK_COLOR;

    return (
        <Link
            href={`/collections/${id}`}
            className="group block pt-4"
            aria-label={title}
        >
            <div className="relative lg:w-57">
                <div
                    aria-hidden="true"
                    className="absolute left-6 right-6 -top-4 h-6 rounded-t-xl backdrop-blur-[57px]"
                    style={{ backgroundColor: `${color}66` }}
                />
                <div
                    aria-hidden="true"
                    className="absolute left-3 right-3 -top-2 h-6 rounded-t-xl backdrop-blur-[57px]"
                    style={{ backgroundColor: `${color}66` }}
                />
                <div
                    className="relative aspect-4/5 w-full overflow-hidden rounded-xl lg:aspect-auto lg:w-57 lg:h-67.5"
                    style={{ backgroundColor: color }}
                >
                    <Image
                        fill
                        src={cover_image || image}
                        alt={title}
                        sizes="(min-width: 1280px) 14vw, (min-width: 1024px) 17vw, (min-width: 768px) 22vw, 45vw"
                        priority={priority}
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <h3 className="absolute left-3 text-center right-3 top-3 line-clamp-2 text-sm font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] sm:text-base">
                        {title}
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export const CollectionCardSkeleton = () => (
    <div className="pt-4">
        <div className="relative lg:w-57">
            <div
                aria-hidden="true"
                className="absolute left-6 right-6 -top-4 h-6 rounded-t-2xl bg-gray-200 dark:bg-neutral-800 opacity-40"
            />
            <div
                aria-hidden="true"
                className="absolute left-3 right-3 -top-2 h-6 rounded-t-2xl bg-gray-200 dark:bg-neutral-800 opacity-70"
            />
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-neutral-800 animate-pulse lg:aspect-auto lg:w-57 lg:h-67.5" />
        </div>
    </div>
);
