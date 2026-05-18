export const searchQueryKeys = {
  SEARCH_RESULTS: "search-results",
};

export const AGE_BOUNDS = {
  min: 3,
  max: 18,
};

export const DEFAULT_AGE_RANGE: [number, number] = [
  AGE_BOUNDS.min,
  AGE_BOUNDS.max,
];

export interface IFilterOption {
  id: number;
  label: string;
}

// Static filter options, used until backend endpoints are wired in.
// Swap each constant with a hook (useAuthors / usePublishers / useTopics) when the API lands.
export const AUTHOR_OPTIONS: IFilterOption[] = [
  { id: 1, label: "Normurod Norqobilov" },
  { id: 2, label: "Hans Kristian Andersen" },
  { id: 3, label: "Shayx Muhammad Sodiq Muhammad Yusuf" },
  { id: 4, label: "Malik Murodov" },
  { id: 5, label: "Anton Chexov" },
];

export const TOPIC_OPTIONS: IFilterOption[] = [
  { id: 1, label: "Ta'lim" },
  { id: 2, label: "Tarix" },
  { id: 3, label: "Siyosat" },
  { id: 4, label: "Biznes" },
  { id: 5, label: "Bolalarbop" },
  { id: 6, label: "Sport" },
];

export const PUBLISHER_OPTIONS: IFilterOption[] = [
  { id: 1, label: "Hilol nashr" },
  { id: 2, label: "Asaxiy books" },
  { id: 3, label: "Tirilish" },
  { id: 4, label: "PIR" },
];
