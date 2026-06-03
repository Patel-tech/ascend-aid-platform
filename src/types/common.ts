export type Status = "idle" | "loading" | "success" | "error";

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export interface AsyncState<T> {
  data: T | null;
  status: Status;
  error: string | null;
}
