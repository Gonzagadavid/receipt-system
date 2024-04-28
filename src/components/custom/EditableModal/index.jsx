"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModal";
import FormLayoutPage from "@/layouts/formPage";
import { Pencil } from "lucide-react";

export default function EditableModal({ ...props }) {
  const { isOpen, onClose, onOpen } = useModal();
  return (
    <>
      <Button onClick={onOpen}>
        <Pencil />
      </Button>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-[40%]">
            <FormLayoutPage {...props} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
