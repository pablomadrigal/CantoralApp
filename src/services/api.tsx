export function get<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...config,
  })
    .then((response) => response.json())
    .then((data) => data as TResponse);
}

export type TApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};
