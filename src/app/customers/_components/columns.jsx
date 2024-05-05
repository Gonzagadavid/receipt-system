"use client";

import EditableModal from "@/components/custom/EditableModal";
import { customerFormSchema } from "../register/schema";
import { formInstance } from "../register/page";
import DeleteButton from "@/components/custom/DeleteButton";

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
            "$1.$2.$3-$4",
          )
        : row.original.taxpayer_identification.replace(
            /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
            "$1.$2.$3/$4-$5",
          ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const {
        id,
        name,
        taxpayer_identification: taxpayerIdentification,
      } = row.original;
      return (
        <div className="flex justify-around">
          <EditableModal
            title="Editar informações do cliente"
            defaultValues={{ name, taxpayerIdentification }}
            endpoint={`/api/customers/${id}`}
            schema={customerFormSchema}
            buttonText="Editar"
            formInstance={formInstance}
            successMessage="Cliente atualizado com sucesso"
            errorMessage="Ocorreu um erro ao tentar atualizar o cliente"
            method="PUT"
          />
          <DeleteButton
            path={`/api/customers/${id}`}
            info={`o cliente ${name}`}
          />
        </div>
      );
    },
  },
];
