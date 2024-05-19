"use client";

import { DataTable } from "@/components/custom/Table";

export default function TablePage({ data, columns }) {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="w-full flex justify-center">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}
