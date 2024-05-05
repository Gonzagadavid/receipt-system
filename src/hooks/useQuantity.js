import { useState } from "react";

export const useQuantity = (initialQty = 1) => {
  const [quantity, setQuantity] = useState(initialQty);

  const decreaseQty = () => {
    setQuantity((prev) => {
      if (prev === 1) return prev;
      return prev - 1;
    });
  };

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const onChangeQty = (value) => {
    const valueNumber = Number(value);
    if (Number.isNaN(valueNumber) || valueNumber <= 0) return;
    setQuantity(valueNumber);
  };

  return { quantity, onChangeQty, decreaseQty, increaseQty };
};
