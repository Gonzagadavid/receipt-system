"use server";
import { fetcher } from "@/lib/fetchers";
import { URLSearchParams } from "url";

export const getUsers = async (params) => {
  const urlParams = new URLSearchParams(params);
  if (!urlParams.has("page")) urlParams.set("page", "1");
  if (!urlParams.has("page-size")) urlParams.set("page-size", "10");

  const users = await fetcher(`/api/users?${urlParams.toString()}`, {
    cache: "no-store",
  });

  return users;
};
