import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import ReviewReceipt from "..";

export default function ReceiptButton({ sale }) {
  const { isOpen, onClose, onOpen } = useModal();

  return (
    <>
      <Button onClick={onOpen}>Recibo</Button>
      {isOpen && (
        <ReviewReceipt isOpen={isOpen} onClose={onClose} sale={sale} />
      )}
    </>
  );
}
