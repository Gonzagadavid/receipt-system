export async function sendRequest(url, { arg }) {
  return fetch(`http://localhost:3000${url}`, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json().catch(() => null));
}
