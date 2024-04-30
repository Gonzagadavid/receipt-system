import dynamic from "next/dynamic";
import { getProducts } from "./_lib/fetcher";
import { Suspense } from "react";
import { columns } from "./_components/columns";
const TablePage = dynamic(() => import("@/layouts/tablePage", { ssr: false }));

export default async function Products({ searchParams }) {
  const products = await getProducts(searchParams);

  return (
    <Suspense
      fallback={
        <div>
          <p>loading...</p>
        </div>
      }
    >
      <TablePage title="Produtos" data={products} columns={columns} />
    </Suspense>
  );
}
