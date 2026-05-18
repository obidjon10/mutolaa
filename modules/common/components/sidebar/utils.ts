import classNames from "classnames";

// Shared layout for sidebar items that toggle between a full-width pill
// (expanded) and a circular icon button (collapsed). Border-radius stays
// rounded-full so the collapsed square renders as a circle and the
// expanded rectangle renders as a pill — both states have height 40px so
// only width/padding/gap animate during the sidebar collapse transition.
export const collapsibleItemClass = (collapsed: boolean) =>
  classNames(
    "flex items-center h-10 rounded-full transition-[width,padding,gap] duration-200 ease-out",
    collapsed
      ? "w-10 p-0 gap-0 justify-center mx-auto"
      : "w-full px-3 gap-2",
  );
