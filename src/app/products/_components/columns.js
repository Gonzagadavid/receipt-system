"use client";

import EditableModal from "@/components/custom/EditableModal";
import { toLabelCategory, toLabelState } from "../utils";
import { formInstance, productFormSchema } from "../register/page";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetchers";
import DeleteButton from "@/components/custom/DeleteButton";
import Action from "./actions";

export const columns = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => toLabelCategory[row.original.category],
  },
  {
    accessorKey: "state",
    header: "Estado",
    cell: ({ row }) => toLabelState[row.original.state],
  },
  {
    accessorKey: "price",
    header: "Preço",
    cell: ({ row }) =>
      row.original.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, ...info } = row.original;
      return <Action id={id} info={info} />;
    },
  },
];
