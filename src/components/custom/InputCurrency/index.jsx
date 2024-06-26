import CurrencyInput from "react-currency-input-field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
export const Size = {
  sm: "w-52",
  lg: "w-96",
  xl: "w-[38rem]",
};

export default function InputCurrency({
  name,
  placeholder = "",
  label,
  control,
  className,
  size,
}) {
  const { getValues } = useFormContext();
  const priceValue = getValues("price");
  const [value, setValue] = useState(priceValue);

  useEffect(() => {
    if (!priceValue) {
      setValue("");
    }
  }, [priceValue]);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={size}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <CurrencyInput
              placeholder={placeholder}
              defaultValue={field.value}
              value={value}
              decimalsLimit={2}
              decimalScale={2}
              onValueChange={(value, name, values) => {
                setValue(value);
                field.onChange(values.float);
              }}
              groupSeparator="."
              decimalSeparator=","
              prefix="R$ "
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className,
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
