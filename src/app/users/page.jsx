import { getUsers } from "./_lib/fetcher";
import { Suspense } from "react";
import { columns } from "./_components/columns";
import dynamic from "next/dynamic";
const TablePage = dynamic(() => import("@/layouts/tablePage", { ssr: false }));

export default async function User({ searchParams }) {
  const users = await getUsers(searchParams);

  return (
    <Suspense
      fallback={
        <div>
          <p>loading...</p>
        </div>
      }
    >
      <TablePage title="Usuários" data={users} columns={columns} />
    </Suspense>
  );
}
