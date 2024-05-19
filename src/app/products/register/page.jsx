"use client";
import FormLayoutPage, { InputType } from "@/layouts/formPage";
import { Size } from "@/components/custom/FormInput";
import useSwr from "swr";

import * as z from "zod";
import { fetcher } from "@/lib/fetchers";
import { toLabelCategory, toLabelState } from "../utils";
import { useState } from "react";

export const formInstance = {
  name: {
    input: InputType.text,
    label: "Nome do produto",
    placeholder: "produto",
    size: Size.xl,
  },
  category: {
    input: InputType.select,
    label: "Categoria",
    size: Size.sm,
  },
  state: {
    input: InputType.select,
    label: "Estado",
    size: Size.sm,
    className: "ml-4",
  },
  price: {
    input: InputType.currency,
    label: "Preço",
    size: Size.sm,
  },
};

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .max(52, { message: "Máximo 52 caracteres" }),
  category: z.string().min(1, { message: "Campo obrigatório" }),
  state: z.string().min(1, { message: "Campo obrigatório" }),
  price: z.number(),
});

const defaultValues = {
  name: "",
  category: "",
  state: "",
  price: "",
};
export default function CustomerRegister() {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const categoriesFormInstance = {
    ...formInstance,
    category: { ...formInstance.category, options: categoryOptions },
    state: { ...formInstance.state, options: stateOptions },
  };
  useSwr("/api/categories", fetcher, {
    onSuccess(resp) {
      const options = resp.map(({ name, id }) => ({
        optionLabel: toLabelCategory[name],
        value: id,
      }));
      setCategoryOptions(options);
    },
  });
  useSwr("/api/states", fetcher, {
    onSuccess(resp) {
      const options = resp.map(({ state, id }) => ({
        optionLabel: toLabelState[state],
        value: id,
      }));
      setStateOptions(options);
    },
  });

  return (
    <FormLayoutPage
      defaultValues={defaultValues}
      endpoint="/api/products"
      schema={productFormSchema}
      buttonText="Cadastrar"
      formInstance={categoriesFormInstance}
      successMessage="Produto cadastrado com sucesso"
      errorMessage="Ocorreu um erro ao tentar cadastrar produto"
    />
  );
}
