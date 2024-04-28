"use client";

export const columns = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "taxpayer_identification",
    header: "CPF/CNPJ",
    cell: ({ row }) =>
      row.original.taxpayer_identification.length === 11
        ? row.original.taxpayer_identification.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
          )
        : row.original.taxpayer_identification.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5"
          ),
  },
];
