import { toLabelCategory, toLabelState } from "@/app/products/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

export default function ProductList({ setProductList, productList }) {
  const removeProduct = (productId) => {
    setProductList((prev) =>
      prev.filter((product) => product.id !== productId),
    );
  };

  const onChangeProductQty = (productId, qty) => {
    setProductList((prev) => {
      const newList = [...prev];
      const index = prev.findIndex((product) => product.id === productId);
      if (index < 0) return;
      newList[index].quantity = qty;
      return newList;
    });
  };
  return (
    <div className="bg-secondary my-5 mr-36 h-[38rem] w-[60rem] rounded-lg">
      <ScrollArea>
        <div className="grid grid-cols-6 p-4 items-center">
          <Label>
            <span className="mr-2 inline-block">Produto</span>
          </Label>
          <Label>
            <span className="mr-2 inline-block">Estado</span>
          </Label>
          <Label>
            <span className="mr-2 inline-block">Categoria</span>
          </Label>
          <Label>
            <span className="mr-2 inline-block">Preço</span>
          </Label>
          <div className="flex items-center">
            <Label htmlFor="qty" className="mx-2">
              Quantidade
            </Label>
          </div>
          <div></div>
        </div>
        <Separator className="bg-primary" />
        {productList.map((product) => (
          <div key={product.id}>
            <div className="grid grid-cols-6 p-4 items-center">
              <Label>{product.name}</Label>
              <Label>{toLabelState[product.state]}</Label>
              <Label>{toLabelCategory[product.category]}</Label>
              <Label>
                {product.price.toLocaleString("pt-BR", {
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Label>
              <div className="flex items-center">
                <Input
                  id="qty"
                  className="w-[100px]"
                  type="number"
                  value={product.quantity}
                  onChange={({ target }) =>
                    onChangeProductQty(product.id, +target.value)
                  }
                />
              </div>
              <Button
                onClick={() => removeProduct(product.id)}
                className="w-[5rem] ml-10"
              >
                <Trash2 />
              </Button>
            </div>
            <Separator className="bg-primary" />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
