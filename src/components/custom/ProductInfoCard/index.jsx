"use client";
import { toLabelCategory, toLabelState } from "@/app/products/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuantity } from "@/hooks/useQuantity";
import { toast } from "sonner";

export default function ProductInfoCard({
  selectedProduct,
  addProduct,
  resetSelectedProduct,
}) {
  const { quantity, decreaseQty, increaseQty, onChangeQty } = useQuantity();

  const addProductInList = () => {
    if (!selectedProduct.name) {
      toast.error("Não há produto selecionado!");
      return;
    }
    addProduct({ ...selectedProduct, quantity });
    resetSelectedProduct();
    onChangeQty(1);
  };

  const onChangeQuantity = (event) => {
    onChangeQty(event.target.value);
  };
  return (
    <Card className="w-[40rem] my-5 ml-10">
      <CardHeader className="text-center">
        <h2>Informações do Produto</h2>
      </CardHeader>
      <CardContent className="flex justify-around">
        <Label>
          <span className="mr-2 inline-block">Produto:</span>
          {selectedProduct.name}
        </Label>
        <Label>
          <span className="mr-2 inline-block">Estado:</span>
          {selectedProduct.state && toLabelState[selectedProduct.state]}
        </Label>
        <Label>
          <span className="mr-2 inline-block">Categoria:</span>
          {selectedProduct.category &&
            toLabelCategory[selectedProduct.category]}
        </Label>
        <Label>
          <span className="mr-2 inline-block">Preço:</span>
          {selectedProduct.price.toLocaleString("pt-BR", {
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Label>
      </CardContent>
      <CardFooter className="flex justify-around items-end">
        <div className="flex items-end">
          <Button onClick={decreaseQty}>-</Button>
          <Label className="mx-2">
            <span className="m-2 inline-block">Quantidade:</span>
            <Input
              className="w-[100px]"
              type="number"
              value={quantity}
              onChange={onChangeQuantity}
            />
          </Label>
          <Button onClick={increaseQty}>+</Button>
        </div>
        <Button onClick={addProductInList}>Adicionar</Button>
      </CardFooter>
    </Card>
  );
}
