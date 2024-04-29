"use client";

import EditableModal from "@/components/custom/EditableModal";
import { Roles } from "@/constants/roles";
import { updateUserFormSchema, userFormSchema } from "../register/schema";
import { formInstance } from "../register/page";
import DeleteButton from "@/components/custom/DeleteButton";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const { id, ...info } = row.original;
      return (
        <div className="flex justify-around">
          <EditableModal
            title="Editar informações do usuário"
            defaultValues={info}
            endpoint={`/api/users/user/${id}`}
            schema={updateUserFormSchema}
            buttonText="Editar"
            formInstance={formInstance}
            successMessage="Usuário atualizado com sucesso"
            errorMessage="Ocorreu um erro ao tentar atualizar o usuário"
            method="PUT"
          />
          <DeleteButton
            path={`/api/users/user/${id}`}
            info={`o usuário ${info.name}`}
          />
        </div>
      );
    },
  },
];
