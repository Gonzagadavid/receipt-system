"use client";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetchers";
import { useModal } from "@/hooks/useModal";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

export function ProductInput({ setSelectedProduct, resetSelectedProduct }) {
  const [name, setName] = useState("");
  const debounce = useDebounce(name);
  const { isOpen, onClose, onOpen } = useModal(false);
  const { data = { data: [] }, isLoading } = useSWR(
    `/api/products?name=${debounce}`,
    fetcher
  );

  return (
    <Command className="rounded-lg border shadow-md w-[40rem] mx-10 my-5 h-80">
      <Input
        onChange={(e) => {
          setName(e.target.value);
          resetSelectedProduct();
        }}
        placeholder="Selecione o produto"
        onFocus={onOpen}
        className="w-[40rem]"
      />
      {
        <CommandList className="w-[40rem]">
          {isLoading
            ? "loading..."
            : data.data.map((product) => (
                <button
                  className="w-full"
                  onClick={() => {
                    setSelectedProduct(product);
                    onClose();
                  }}
                >
                  <CommandItem key={product.id}>{product.name}</CommandItem>
                </button>
              ))}
        </CommandList>
      }
    </Command>
  );
}
