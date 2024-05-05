"use client";
import { CustomerInput } from "@/components/custom/CustomerInput";
import ProductInfoCard from "@/components/custom/ProductInfoCard";
import { ProductInput } from "@/components/custom/ProductInput";
import ProductList from "@/components/custom/ProductList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useMemo, useState } from "react";
import { toast } from "sonner";

const initialProduct = {
  id: "",
  name: "",
  state: "",
  price: 0,
  category: "",
};

export default function SaleRegister() {
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [productList, setProductList] = useState([]);
  const [rebate, setRebate] = useState(0);

  const resetSelectedProduct = () => {
    setSelectedProduct(initialProduct);
  };

  const addProduct = (product) => {
    const exists = productList.some((prod) => prod.id === product.id);
    if (exists) {
      toast.error("Produto já adicionado");
      return;
    }
    setProductList((prev) => [...prev, product]);
  };

  const total = useMemo(() => {
    const totalValue = productList.reduce(
      (totalPrice, product) => totalPrice + product.price * product.quantity,
      0
    );
    if (!rebate) return totalValue;
    return totalValue - (totalValue * rebate) / 100;
  }, [productList, rebate]);
  return (
    <div className="grid grid-cols-2 w-[90%]">
      <div>
        <ProductInput
          setSelectedProduct={setSelectedProduct}
          resetSelectedProduct={resetSelectedProduct}
        />
        <ProductInfoCard
          selectedProduct={selectedProduct}
          addProduct={addProduct}
          resetSelectedProduct={resetSelectedProduct}
        />
        <div className="flex  flex-col w-[40rem] mx-10">
          <CustomerInput
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
          />
        </div>
      </div>
      <div>
        <ProductList
          setProductList={setProductList}
          productList={productList}
        />
        <div className="flex items-center justify-around">
          <div className="flex items-center">
            <Label htmlFor="rebate">Desconto(%):</Label>
            <Input
              id="rebate"
              value={rebate}
              onChange={({ target }) => setRebate(target.value)}
              className="mmy-5 w-24"
            />
          </div>
          <Label>
            <span className="mr-3">Total:</span>
            {total.toLocaleString("pt-BR", {
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Label>
          <Button>Finalizar</Button>
        </div>
      </div>
    </div>
  );
}
