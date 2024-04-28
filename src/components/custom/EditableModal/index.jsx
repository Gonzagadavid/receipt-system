"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModal";
import FormLayoutPage from "@/layouts/formPage";
import { revalidateAction } from "@/lib/actions";
import { Pencil } from "lucide-react";
import { usePathname } from "next/navigation";

export default function EditableModal({ ...props }) {
  const pathname = usePathname();
  const { isOpen, onClose, onOpen } = useModal();
  const submitCB = () => {
    revalidateAction(pathname);
    onClose();
  };
  return (
    <>
      <Button onClick={onOpen}>
        <Pencil />
      </Button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-[40%]">
            <FormLayoutPage {...props} submitCB={submitCB} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
