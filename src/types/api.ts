/** Shared API contracts. */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResult<T> {
  data: T;
  message?: string;
}

export type ID = string;

export type ISODate = string;
