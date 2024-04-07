export async function sendRequest(url, { arg }) {
  return fetch(`http://localhost:3000${url}`, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then(async (res) => {
    const response = await res.json();
    if (!res.ok) return Promise.reject(response);
    return response;
  });
}
