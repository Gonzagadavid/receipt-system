"use client";
import FormLayoutPage, { InputType } from "@/layouts/formPage";
import { userFormSchema } from "./schema";
import { Roles } from "@/constants/roles";
import { Size } from "@/components/custom/FormInput";

const rolesOptions = [
  { value: Roles.EMPLOYER, optionLabel: "Funcionário(a)" },
  { value: Roles.MANAGER, optionLabel: "Gerente" },
];

const formInstance = {
  name: {
    input: InputType.text,
    label: "Nome",
    placeholder: "Nome Completo",
    size: Size.xl,
  },
  email: {
    input: InputType.text,
    label: "E-mail",
    placeholder: "email@server.com",
    size: Size.lg,
  },
  password: {
    input: InputType.password,
    label: "senha",
    placeholder: "*******",
    size: Size.sm,
    className: "ml-4",
  },
  role: {
    input: InputType.select,
    label: "Cargo",
    size: Size.lg,
    options: rolesOptions,
  },
};

const defaultValues = {
  name: "",
  role: Roles.EMPLOYER,
  email: "",
  password: "",
};
export default function UserRegister() {
  return (
    <FormLayoutPage
      title="Cadastro de usuários"
      defaultValues={defaultValues}
      endpoint="/api/users"
      schema={userFormSchema}
      buttonText="Cadastrar"
      formInstance={formInstance}
      successMessage="Usuário cadastrado com sucesso"
      errorMessage="Ocorreu um erro ao tentar cadastrar usuário"
    />
  );
}
