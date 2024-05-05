import DeleteButton from "@/components/custom/DeleteButton";
import EditableModal from "@/components/custom/EditableModal";
import { useState } from "react";
import useSWR from "swr";

export default function Action({ id, info }) {
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
}
