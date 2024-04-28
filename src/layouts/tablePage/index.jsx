"use client";

import { DataTable } from "@/components/custom/Table";

export default function TablePage({ data, columns, title }) {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="text-4xl text-primary m-8">{title}</h1>
      <div className="w-full flex justify-center">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}
