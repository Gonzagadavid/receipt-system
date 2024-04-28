"use server";
import { fetcher } from "@/lib/fetchers";
import { URLSearchParams } from "url";

export const getCustomers = async (params) => {
  const urlParams = new URLSearchParams(params);
  if (!urlParams.has("page")) urlParams.set("page", "1");
  if (!urlParams.has("page-size")) urlParams.set("page-size", "10");

  const customers = await fetcher(`/api/customers?${urlParams.toString()}`, {
    cache: "no-store",
  });

  return customers;
};
