"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DashBoard() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>DashBoard</h1>
      <p>{count}</p>
      <Button
        onClick={() => {
          setCount((prev) => --prev);
        }}
      >
        -
      </Button>
      <Button
        onClick={() => {
          setCount((prev) => ++prev);
        }}
      >
        +
      </Button>
    </>
  );
}
