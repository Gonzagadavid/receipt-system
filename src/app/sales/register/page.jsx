"use client";
import { CustomerInput } from "@/components/custom/CustomerInput";
import ProductInfoCard from "@/components/custom/ProductInfoCard";
import { ProductInput } from "@/components/custom/ProductInput";
import ProductList from "@/components/custom/ProductList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendRequest } from "@/lib/fetchers";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useModal } from "@/hooks/useModal";
import ReceiptComponent from "../_components/ReceiptComponent";

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
  const [name, setName] = useState("");
  const { isOpen, onClose, onOpen } = useModal();

  const { trigger } = useSWRMutation("/api/sales", sendRequest(), {
    onSuccess() {
      toast.success("Venda registrada com sucesso!");
      onOpen();
    },
    onError() {
      toast.error("Ocorreu um erro ao tentar registrar a venda");
    },
  });

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
      0,
    );
    if (!rebate) return totalValue;
    return totalValue - (totalValue * Number(rebate.replace(",", "."))) / 100;
  }, [productList, rebate]);

  const registerSale = async () => {
    if (!productList.length) {
      toast.error("Nenhum produto adicionado");
      return;
    }
    if (!selectedCustomer) {
      toast.error("Nenhum cliente selecionado");
      return;
    }
    const sale = {
      products: productList,
      customer: selectedCustomer,
      rebate,
      total,
    };

    await trigger(sale);
  };

  const onCloseReceipt = () => {
    resetSelectedProduct();
    setProductList([]);
    setSelectedCustomer("");
    setName("");
    setRebate(0);
    onClose();
  };
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
            name={name}
            setName={setName}
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
          <Button onClick={registerSale}>Finalizar</Button>
        </div>
      </div>
      <ReceiptComponent
        productList={productList}
        isOpen={isOpen}
        onClose={onCloseReceipt}
        name={name}
        total={total}
        rebate={rebate}
      />
    </div>
  );
}
