"use client";
import FormLayoutPage, { InputType } from "@/layouts/formPage";
import { Size } from "@/components/custom/FormInput";
import { customerFormSchema } from "./schema";

const formInstance = {
  name: {
    input: InputType.text,
    label: "Nome",
    placeholder: "Nome do Cliente",
    size: Size.xl,
  },
  taxpayerIdentification: {
    input: InputType.register,
    label: "CPF / CNPJ",
    size: Size.lg,
  },
};

const defaultValues = {
  name: "",
  taxpayerIdentification: "",
};
export default function CustomerRegister() {
  return (
    <FormLayoutPage
      title="Cadastro de Cliente"
      defaultValues={defaultValues}
      endpoint="/api/customers"
      schema={customerFormSchema}
      buttonText="Cadastrar"
      formInstance={formInstance}
      successMessage="Cliente cadastrado com sucesso"
      errorMessage="Ocorreu um erro ao tentar cadastrar cliente"
    />
  );
}
