import CustomerService from "./service";
import { httpStatusCode } from "../httpStatusCode";

const customerService = new CustomerService();

export async function POST(req) {
  const body = await req.json();
  const exists = await customerService.getCustomerByTaxpayer(body);
  if (exists) return Response.json(exists, { status: httpStatusCode.Conflict });
  const resp = await customerService.createCustomer(body);
  return Response.json(resp);
}
