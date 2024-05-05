export const salesFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Campo obrigatório" })
    .max(52, { message: "Máximo 52 caracteres" }),
  category: z.string().min(1, { message: "Campo obrigatório" }),
  state: z.string().min(1, { message: "Campo obrigatório" }),
  price: z.number(),
});
