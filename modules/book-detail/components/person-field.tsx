"use client";

import { SearchLink } from "./search-link";

export interface IPerson {
  id: number;
  name: string;
}

interface IProps {
  label: string;
  people?: IPerson[];
  searchParam: "authors" | "dubbers";
}

export const PersonField: React.FC<IProps> = ({
  label,
  people,
  searchParam,
}) => {
  if (!people?.length) return null;

  return (
    <div className="text-xs space-x-2">
      <span className="text-foreground-muted">{label}</span>
      <SearchLink
        items={people.map((p) => ({ id: p.id, label: p.name }))}
        searchParam={searchParam}
        ariaLabel={label}
        textClassName="group-hover:text-brand transition-colors"
      />
    </div>
  );
};
