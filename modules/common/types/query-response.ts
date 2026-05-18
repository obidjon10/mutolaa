export interface IQueryResponse<T> {
  count: number;
  next: string;
  previous: any;
  results: T[];
  title?: string;
}
