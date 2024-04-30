"use client";

import EditableModal from "@/components/custom/EditableModal";
import { toLabelCategory, toLabelState } from "../utils";
import { formInstance, productFormSchema } from "../register/page";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetchers";
import DeleteButton from "@/components/custom/DeleteButton";

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

      const [categoryOptions, setCategoryOptions] = useState([]);
      const [stateOptions, setStateOptions] = useState([]);
      const categoriesFormInstance = {
        ...formInstance,
        category: { ...formInstance.category, options: categoryOptions },
        state: { ...formInstance.state, options: stateOptions },
      };
      useSWR("/api/categories", fetcher, {
        onSuccess(resp) {
          const options = resp.map(({ name, id }) => ({
            optionLabel: toLabelCategory[name],
            value: id,
          }));
          setCategoryOptions(options);
        },
      });
      useSWR("/api/states", fetcher, {
        onSuccess(resp) {
          const options = resp.map(({ state, id }) => ({
            optionLabel: toLabelState[state],
            value: id,
          }));
          setStateOptions(options);
        },
      });

      return (
        <div className="flex justify-around">
          <EditableModal
            title="Editar informações do produto"
            defaultValues={info}
            endpoint={`/api/products/${id}`}
            schema={productFormSchema}
            buttonText="Editar"
            formInstance={categoriesFormInstance}
            successMessage="Produto atualizado com sucesso"
            errorMessage="Ocorreu um erro ao tentar atualizar o produto"
            method="PUT"
          />
          <DeleteButton
            path={`/api/products/${id}`}
            info={`o produto ${info.name}`}
          />
        </div>
      );
    },
  },
];
