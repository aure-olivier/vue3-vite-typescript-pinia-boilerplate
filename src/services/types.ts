export type APIResponse<T> = {
  success: boolean;
  data: T;
  status?: number;
};

export type EntriesAPIResponse<T> = {
  success: boolean;
  entries: T;
  status?: number;
};
