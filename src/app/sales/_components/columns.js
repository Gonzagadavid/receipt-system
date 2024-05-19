"use client";

import ReceiptButton from "./ReceiptReview/ReceiptButton";

export const columns = [
  {
    accessorKey: "created_at",
    header: "Data",
    cell: ({ row }) => {
      return new Date(row.original.created_at).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  {
    accessorKey: "customer",
    header: "Cliente",
  },
  {
    accessorKey: "seller",
    header: "Vendendor",
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) =>
      row.original.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
  },
  {
    accessorKey: "rebate",
    header: "Desconto",
    cell: ({ row }) => `${row.original.rebate}%`,
  },
  {
    id: "actions",
    cell: async ({ row }) => {
      return <ReceiptButton sale={row.original} />;
    },
  },
];
