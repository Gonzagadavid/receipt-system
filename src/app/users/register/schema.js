import * as z from "zod";

export const userFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .max(52, { message: "Máximo 52 caracteres" }),
  role: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).max(8),
});

export const updateUserFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .max(52, { message: "Máximo 52 caracteres" }),
  role: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6).max(8).nullish(),
});
