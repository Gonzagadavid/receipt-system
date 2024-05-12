import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { SlPrinter } from "react-icons/sl";
import { useReactToPrint } from "react-to-print";

export default function ReceiptComponent({
  isOpen,
  onClose,
  productList,
  name,
  total,
  rebate,
}) {
  const receiptRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[50rem] h-[95%]">
        <div ref={receiptRef}>
          <div className="w-[50rem] flex flex-col items-center p-8">
            <div className="flex w-full justify-around">
              <Card className="w-[45%] text-[3rem] text-center">
                <p>ONO</p>
                <p className="text-[1rem] italic">
                  peixaria e produtos orientais
                </p>
              </Card>
              <Card className="w-[45%]">
                <p className="flex items-center">
                  <FaWhatsapp size="25" className="m-2" />
                  (12) 3881-1181
                </p>
                <p className="flex items-center">
                  <SiGooglemaps size="20" className="m-2" />
                  Sumaré, Caraguatatuba - SP
                </p>
              </Card>
            </div>
            <div className="w-full flex justify-center m-2">
              <Card className="w-[95%] p-2">
                <div className="grid grid-cols-2 text-[1rem]">
                  <p>
                    Data:{" "}
                    {new Date().toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                  <p>Telefone: (12) 3881-1181</p>
                </div>
                <div div className="grid grid-cols-2 my-2">
                  <p>Cliente: {name}</p>
                  <p>
                    Endereço: Av. Dr. Arthur da Costa Filho, 1999 - Sumaré,
                    Caraguatatuba - SP
                  </p>
                </div>
              </Card>
            </div>
            <h1 className="w-full text-[2rem] text-center">Recibo de venda</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor Unitário</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productList.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      {product.price.toLocaleString("pt-BR", {
                        currency: "BRL",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    <TableCell>
                      {(+product.price * +product.quantity).toLocaleString(
                        "pt-BR",
                        {
                          currency: "BRL",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="w-full flex justify-around p-6 mr-6">
              <p>Desconto: {`${rebate}%`}</p>
              <p>
                Total:{" "}
                {total.toLocaleString("pt-BR", {
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 flex justify-around p-6">
            <p>Assinatura comprador</p>
            <p>Assinatura loja</p>
          </div>
        </div>
        <div className="fixed">
          <Button onClick={handlePrint}>
            <span className="mr-2">Imprimir recibo</span>
            <SlPrinter size={20} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
