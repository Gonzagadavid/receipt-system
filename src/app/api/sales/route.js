import { auth } from "../auth/auth";
import { getParams } from "../utils/toPaginationParams";
import SalesService from "./service";

const saleService = new SalesService();

export async function POST(request) {
  const body = await request.json();
  const { user } = await auth();
  const message = await saleService.registerSale(user.id, body);
  return Response.json({ message });
}

export async function GET(request) {
  const params = getParams(request.url);
  const sales = await saleService.listSales(params);
  return Response.json(sales);
}
