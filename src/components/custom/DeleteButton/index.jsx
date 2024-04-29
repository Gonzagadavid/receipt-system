"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModal";
import { revalidateAction } from "@/lib/actions";
import { sendRequest } from "@/lib/fetchers";
import { Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DeleteButton({ path, info }) {
  const { isOpen, onClose, onOpen } = useModal();
  const pathname = usePathname();
  const onDelete = () => {
    sendRequest("DELETE")(path);
    revalidateAction(pathname);
    onClose();
  };
  return (
    <>
      <Button onClick={onOpen}>
        <Trash2 />
      </Button>
      {isOpen && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>Atenção</DialogDescription>
            </DialogHeader>
            <div>{`Tem certeza que deseja remover ${info}?`}</div>
            <DialogFooter className="flex justify-center sm:justify-center">
              <div className="flex w-full justify-between">
                <Button onClick={onClose} size="sm" type="button">
                  NÃO
                </Button>
                <Button onClick={onDelete} size="sm" type="button">
                  SIM
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
