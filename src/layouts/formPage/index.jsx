"use client";

import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import useSWRMutation from "swr/mutation";
import FormInput from "@/components/custom/FormInput";
import FormSelect from "@/components/custom/FormSelect";
import { sendRequest } from "@/lib/fetchers";
import { toast } from "sonner";
import InputCurrency from "@/components/custom/InputCurrency";
import { useMemo } from "react";

export const InputType = {
  number: "number",
  text: "text",
  password: "password",
  select: "select",
  currency: "currency",
};

export const inputs = {
  number: FormInput,
  text: FormInput,
  password: FormInput,
  select: FormSelect,
  currency: InputCurrency,
};

export default function FormLayoutPage({
  title,
  endpoint,
  schema,
  defaultValues,
  buttonText,
  formInstance,
  successMessage,
  errorMessage,
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { trigger } = useSWRMutation(endpoint, sendRequest, {
    onSuccess() {
      form.reset();
      toast.success(successMessage);
    },
    onError() {
      toast.error(errorMessage);
    },
  });

  const onSubmit = (values) => {
    trigger(values);
  };

  const inputsForm = useMemo(
    () =>
      Object.keys(formInstance).map((fieldName) => {
        const { input, className, options, ...props } = formInstance[fieldName];
        const InputComponent = inputs[input];
        return (
          <InputComponent
            key={fieldName}
            name={fieldName}
            type={input}
            control={form.control}
            className={className}
            options={options}
            {...props}
          />
        );
      }),
    [formInstance]
  );

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="text-4xl text-primary m-8">{title}</h1>
      <div>
        <div className="bg-secondary w-[40rem] h-[23rem] p-4 rounded-lg">
          <Form {...form}>
            <form
              className="h-full flex flex-wrap"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {inputsForm}
              <div className="w-full flex justify-end">
                <Button className="mr-6">{buttonText}</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
