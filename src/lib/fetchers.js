"use server";
export const sendRequest = (method = "POST") =>
  async function (url, { arg } = {}) {
    const res = await fetch(`${process.env.BASE_URL}${url}`, {
      method,
      body: JSON.stringify(arg),
    });
    const response = await res.json().catch(() => null);
    if (!res.ok) return Promise.reject(response);
    return response;
  };

export async function fetcher(url) {
  const res = await fetch(`${process.env.BASE_URL}${url}`);
  const response = await res.json().catch(() => null);
  if (!res.ok) return Promise.reject(response);
  return response;
}
