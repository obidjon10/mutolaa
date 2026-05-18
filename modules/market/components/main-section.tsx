"use client";

import { useMainSectionList } from "../hooks";

import { BookShelfSection } from "./book-shelf-section";
import { BookListSkeleton } from "./skeleton";

export const MainSection = () => {
  const { mainSectionList, isError, isLoading } = useMainSectionList();

  if (isLoading) return <BookListSkeleton />;
  if (isError || !mainSectionList?.length) return null;

  return (
    <div className="space-y-16">
      {mainSectionList?.map((section) => (
        <BookShelfSection key={section?.id} section={section} />
      ))}
    </div>
  );
};
