"use client";

import { useTopSectionList } from "../hooks";

import { SectionListSkeleton, SectionRenderer } from "./sections";

export const TopSections = () => {
  const { topSections, isLoading, isError } = useTopSectionList();

  if (isLoading) return <SectionListSkeleton count={3} />;
  if (isError || !topSections?.length) return null;

  return (
    <div className="space-y-16">
      {topSections?.map((section) => (
        <SectionRenderer key={section?.id} section={section} />
      ))}
    </div>
  );
};
