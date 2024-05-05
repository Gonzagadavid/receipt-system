"use server";
export const getUser = async (email) => {
  const resp = await fetch("http://localhost:3000/api/users/" + email);
  if (!resp.ok) throw new Error("User Error");
  const user = await resp.json().catch(() => null);
  return user;
};
