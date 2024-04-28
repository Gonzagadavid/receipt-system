import * as z from "zod";

export const customerFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .max(52, { message: "Máximo 52 caracteres" }),
  taxpayerIdentification: z
    .string()
    .min(8)
    .transform((data) => data.replace(/\D/g, "")),
});
