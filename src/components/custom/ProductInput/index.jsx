"use client";

import { Command, CommandItem, CommandList } from "@/components/ui/command";

import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetchers";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

export function ProductInput({ setSelectedProduct, resetSelectedProduct }) {
  const [name, setName] = useState("");
  const debounce = useDebounce(name);
  const { data = { data: [] }, isLoading } = useSWR(
    `/api/products?name=${debounce}`,
    fetcher,
  );

  return (
    <Command className="rounded-lg border shadow-md w-[40rem] mx-10 my-5 h-80">
      <Input
        onChange={(e) => {
          setName(e.target.value);
          resetSelectedProduct();
        }}
        placeholder="Selecione o produto"
        className="w-[40rem]"
      />
      {
        <CommandList className="w-[40rem]">
          {isLoading
            ? "loading..."
            : data.data.map((product) => (
                <button
                  key={product.id}
                  className="w-full"
                  onClick={() => {
                    setSelectedProduct(product);
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
