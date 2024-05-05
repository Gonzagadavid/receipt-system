"use server";
export const getUser = async (email) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_UR}/api/users/${email}`,
  );
  if (!resp.ok) throw new Error("User Error");
  const user = await resp.json().catch(() => null);
  return user;
};
