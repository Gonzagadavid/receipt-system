"use client";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Roles } from "@/constants/roles";
import bcrypt from "bcryptjs";
import useSWRMutation from "swr/mutation";

async function sendRequest(url, { arg }) {
  return fetch(`http://localhost:3000${url}`, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json().catch(() => null));
}

const userFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .max(52, { message: "Máximo 52 caracteres" }),
  role: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(8)
    .transform(async (value) => {
      const hash = await bcrypt.hash(value, 5);
      return hash;
    }),
});

export default function UserRegister() {
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
    console.log();
    trigger(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome:</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email:</FormLabel>
              <FormControl>
                <Input placeholder="email@server.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha:</FormLabel>
              <FormControl>
                <Input placeholder="*******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo:</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={Roles.EMPLOYER}>Funcionário</SelectItem>
                  <SelectItem value={Roles.MANAGER}>Gerente</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Cadastrar</Button>
      </form>
    </Form>
  );
}
