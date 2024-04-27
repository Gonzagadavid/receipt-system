"use client";

import { DataTable } from "@/components/custom/Table";

export default function TablePage({ data, columns }) {
  return (
    <div className="w-full flex justify-center">
      <DataTable data={data} columns={columns} />
    </div>
  );
}
