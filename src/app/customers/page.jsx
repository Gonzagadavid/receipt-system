import { Suspense } from "react";
import { columns } from "./_components/columns";
import dynamic from "next/dynamic";
import { getCustomers } from "./_lib/fetcher";
const TablePage = dynamic(() => import("@/layouts/tablePage", { ssr: false }));

export default async function Customers({ searchParams }) {
  const customers = await getCustomers(searchParams);

  return (
    <Suspense
      fallback={
        <div>
          <p>loading...</p>
        </div>
      }
    >
      <TablePage title="Clientes" data={customers} columns={columns} />
    </Suspense>
  );
}
