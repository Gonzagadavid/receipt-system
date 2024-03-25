"use client";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Roles } from "@/constants/roles";
import useSWRMutation from "swr/mutation";
import FormInput from "@/components/custom/FormInput";
import FormSelect from "@/components/custom/FormSelect";
import { sendRequest } from "@/lib/fetchers";
import { userFormSchema } from "./schema";

const rolesOptions = [
  { value: Roles.EMPLOYER, optionLabel: "Funcionário(a)" },
  { value: Roles.MANAGER, optionLabel: "Gerente" },
];

export default function UserForm() {
  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      role: Roles.EMPLOYER,
      email: "",
      password: "",
    },
  });

  const { trigger } = useSWRMutation("/api/users", sendRequest);

  const onSubmit = (values) => {
    trigger(values);
  };

  return (
    <div className="bg-secondary w-[42rem] h-[23rem] p-8 rounded-lg">
      <Form {...form}>
        <form
          className="h-full flex flex-col justify-around"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            control={form.control}
            name="name"
            label="Nome:"
            placeholder="Nome"
          />
          <div className="flex justify-between w-full">
            <FormInput
              control={form.control}
              name="email"
              label="E-mail:"
              placeholder="email@server.com"
              className="w-96"
            />
            <FormInput
              control={form.control}
              name="password"
              label="Senha:"
              placeholder="*******"
              inputType="password"
              className="w-52"
            />
          </div>
          <div className="flex items-end justify-between">
            <div className="w-96">
              <FormSelect name="role" label="Cargo:" options={rolesOptions} />
            </div>
            <Button className="mr-8">Cadastrar</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
