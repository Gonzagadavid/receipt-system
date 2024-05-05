"use client";

import { Command, CommandItem, CommandList } from "@/components/ui/command";

import useSWR from "swr";
import { fetcher } from "@/lib/fetchers";
import { useModal } from "@/hooks/useModal";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

export function CustomerInput({ setSelectedCustomer, name, setName }) {
  const debounce = useDebounce(name);
  const { isOpen, onClose, onOpen } = useModal(false);
  const { data = { data: [] }, isLoading } = useSWR(
    `/api/customers?name=${debounce}`,
    fetcher,
  );

  return (
    <Command className="rounded-lg border shadow-md w-[40rem] h-46">
      <Input
        onChange={(e) => {
          setName(e.target.value);
          setSelectedCustomer("");
        }}
        value={name}
        placeholder="Selecione o Cliente"
        onFocus={onOpen}
        className="w-[40rem]"
      />
      {isOpen && (
        <CommandList className="z-20">
          {isLoading
            ? "loading..."
            : data.data.map((customer) => (
                <button
                  key={customer.id}
                  className="w-[40rem]"
                  onClick={() => {
                    setSelectedCustomer(customer.id);
                    setName(customer.name);
                    onClose();
                  }}
                >
                  <CommandItem key={customer.id}>{customer.name}</CommandItem>
                </button>
              ))}
        </CommandList>
      )}
    </Command>
  );
}
