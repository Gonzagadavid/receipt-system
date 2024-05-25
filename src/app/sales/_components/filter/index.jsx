"use client";
import { DatePicker } from "@/components/custom/DatePick";
import { CustomerInput } from "@/components/custom/CustomerInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { fetcher } from "@/lib/fetchers";
import { navigate } from "@/lib/navigate";
import { format } from "date-fns";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

export default function SalesFilter() {
  const { data = { data: [] } } = useSWR("/api/customers", fetcher);
  const [startDate, setStartDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const pathname = usePathname();
  const customerIds = useMemo(() => {
    return data.data.reduce((acc, crr) => ({ ...acc, [crr.name]: crr.id }), {});
  }, [data]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const onChange = (name) => {
    setSelectedCustomer(name);
  };
  const onFilter = () => {
    const urlParams = new URLSearchParams();
    if (selectedCustomer) {
      const customerId = customerIds?.[selectedCustomer];
      if (!customerId) {
        toast.error("Cliente não encontrado");
      }
      urlParams.set("customer", customerId);
    }
    if (startDate && finalDate) {
      urlParams.set("date_start", format(startDate, "yyyy-MM-dd"));
      urlParams.set("date_end", format(finalDate, "yyyy-MM-dd"));
    }
    navigate(`${pathname}?${urlParams.toString()}`);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="m-6 flex justify-around w-[60%]">
        <div className="w-96">
          <Select onValueChange={onChange} defaultValue={selectedCustomer}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar pro cliente" />
            </SelectTrigger>
            <SelectContent>
              {data.data.map(({ id, name }) => (
                <SelectItem key={id} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DatePicker
          placeholder="Selecione a inicial"
          setDate={setStartDate}
          date={startDate}
        />
        <DatePicker
          placeholder="Selecione a final"
          setDate={setFinalDate}
          date={finalDate}
        />
        <Button onClick={onFilter}>Filtrar</Button>
      </div>
    </div>
  );
}
