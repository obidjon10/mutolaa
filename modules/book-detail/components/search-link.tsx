"use client";

import { ReactNode, useEffect } from "react";
import { Dropdown } from "@heroui/react";

import { Link, useRouter } from "@/i18n/navigation";
import { setFilterLabels } from "@/modules/search";

export interface ISearchItem {
  id: number;
  label: string;
}

interface IProps {
  items: ISearchItem[];
  // Query-string key on `/search`, e.g. "authors", "dubbers", "categories".
  searchParam: string;
  // a11y name for the dropdown menu (e.g. "Janr").
  ariaLabel: string;
  /**
   * Tailwind classes applied to the visible text in BOTH the single-item Link
   * and the multi-item dropdown trigger's first-item span. Use `group-hover:`
   * for hover effects so the styling fires whether the cursor is over the
   * name or the `+N` count.
   */
  textClassName?: string;
  // Rendered when `items` is empty (default: "-").
  emptyFallback?: ReactNode;
}

const hrefFor = (param: string, id: number) => `/search?${param}=${id}`;

export const SearchLink: React.FC<IProps> = ({
  items,
  searchParam,
  ariaLabel,
  textClassName,
  emptyFallback = "-",
}) => {
  const { push } = useRouter();

  useEffect(() => {
    setFilterLabels(searchParam, items);
  }, [items, searchParam]);

  if (!items.length) return emptyFallback;

  if (items.length === 1) {
    const item = items[0];
    return (
      <span className="group inline-flex items-center">
        <Link href={hrefFor(searchParam, item.id)} className={textClassName}>
          {item.label}
        </Link>
      </span>
    );
  }

  const [first, ...rest] = items;

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <span className="cursor-pointer inline-flex items-center group">
          <span className={textClassName}>{first.label}</span>
          <span className="ml-1 text-foreground-muted">+{rest.length}</span>
        </span>
      </Dropdown.Trigger>
      <Dropdown.Popover placement="bottom start" className="rounded-xl">
        <Dropdown.Menu
          aria-label={ariaLabel}
          className="p-1 min-w-48"
          onAction={(key) => push(hrefFor(searchParam, Number(key)))}
        >
          {items.map((item) => (
            <Dropdown.Item
              key={item.id}
              id={String(item.id)}
              textValue={item.label}
            >
              {item.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
