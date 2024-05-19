import { getSales } from "./_lib/fetcher";
import { Suspense } from "react";
import { columns } from "./_components/columns";
import dynamic from "next/dynamic";
const TablePage = dynamic(() => import("@/layouts/tablePage", { ssr: false }));

export default async function Sales({ searchParams }) {
  const sales = await getSales(searchParams);

  return (
    <Suspense
      fallback={
        <div>
          <p>loading...</p>
        </div>
      }
    >
      <TablePage data={sales} columns={columns} />
    </Suspense>
  );
}
