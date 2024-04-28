import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import InputMask from "react-input-mask";

export const Size = {
  sm: "w-52",
  lg: "w-96",
  xl: "w-[38rem]",
};

export default function FormRegisterInput({
  name,
  placeholder = "",
  label,
  control,
  inputType,
  className,
  size,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(size, className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <InputMask
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              mask={
                field.value.length <= 11
                  ? "999.999.999-99"
                  : "99.999.999/9999-99"
              }
              maskChar=""
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
