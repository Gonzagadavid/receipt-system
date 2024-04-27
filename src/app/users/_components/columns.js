"use client";

import { Roles } from "@/constants/roles";

export const columns = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "role",
    header: "Cargo",
    cell: ({ row }) =>
      row.original.role === Roles.EMPLOYER ? "Funcionário" : "Gerente",
  },
];
