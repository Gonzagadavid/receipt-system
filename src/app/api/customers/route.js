import CustomerService from "./service";
import { httpStatusCode } from "../httpStatusCode";

const customerService = new CustomerService();

export async function POST(req) {
  const body = await req.json();
  const resp = await customerService.createCustomer(body);
  return Response.json(resp, { status: httpStatusCode.Conflict });
}
