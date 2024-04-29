export const sendRequest = (method = "POST") =>
  async function (url, { arg } = {}) {
    const res = await fetch(`http://localhost:3000${url}`, {
      method,
      body: JSON.stringify(arg),
    });
    const response = await res.json().catch(() => null);
    if (!res.ok) return Promise.reject(response);
    return response;
  };

export async function fetcher(url) {
  const res = await fetch(`http://localhost:3000${url}`);
  const response = await res.json().catch(() => null);
  if (!res.ok) return Promise.reject(response);
  return response;
}
