import {
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
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

export default function FormSelect({
  name,
  label,
  control,
  options,
  className,
  size,
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`${size} ${className}`}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            className={className}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue>
                  {options.find(({ value }) => value == field.value)
                    ?.optionLabel ?? field.value}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map(({ optionLabel, value }) => (
                <SelectItem key={value} value={value}>
                  {optionLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
