export const sendRequest = (method = "POST") =>
  async function (url, { arg } = {}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method,
      body: JSON.stringify(arg),
      cache: "no-store",
    });
    const response = await res.json().catch(() => null);
    if (!res.ok) return Promise.reject(response);
    return response;
  };

export async function fetcher(url) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
    cache: "no-store",
  });
  const response = await res.json().catch(() => null);
  if (!res.ok) return Promise.reject(response);
  return response;
}
