"use client";
import { fetcher } from "@/lib/fetchers";
import ReceiptComponent from "../ReceiptComponent";
import useSWR from "swr";

export default function ReviewReceipt({ sale, isOpen, onClose }) {
  const { customer, total, rebate, id } = sale;
  const { data = [], isLoading } = useSWR(
    `/api/products/by_sale/${id}`,
    fetcher,
  );

  if (isLoading) return null;
  return (
    <ReceiptComponent
      productList={data}
      isOpen={isOpen}
      onClose={onClose}
      name={customer}
      total={total}
      rebate={rebate}
    />
  );
}
