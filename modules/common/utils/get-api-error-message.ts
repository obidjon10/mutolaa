interface IApiErrorEntry {
  error?: string;
  message?: string;
}

interface IApiErrorResponse {
  status_code?: number;
  errors?: IApiErrorEntry[];
  message?: string;
}

const hasResponseData = (
  err: unknown,
): err is { response: { data: IApiErrorResponse } } =>
  !!err &&
  typeof err === "object" &&
  "response" in err &&
  !!(err as { response?: unknown }).response &&
  typeof (err as { response: { data?: unknown } }).response === "object";

export const getApiErrorMessage = (
  err: unknown,
  fallback?: string,
): string | undefined => {
  if (hasResponseData(err)) {
    const data = err.response.data;
    const firstError = data?.errors?.[0]?.message;
    if (firstError) return firstError;
    if (data?.message) return data.message;
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
};
