import { auth } from "../auth/auth";
import SalesService from "./service";

const saleService = new SalesService();

export async function POST(request) {
  const body = await request.json();
  const { user } = await auth();
  const message = await saleService.registerSale(user.id, body);
  return Response.json({ message });
}
