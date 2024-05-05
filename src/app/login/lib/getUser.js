"use server";
export const getUser = async (email) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${email}`,
  );
  if (!resp.ok) throw new Error("Get user information error");
  const user = await resp.json().catch(() => null);
  return user;
};
