import CustomerService from "./service";
import { httpStatusCode } from "../httpStatusCode";
import { toPaginationParams } from "../utils/toPaginationParams";

const customerService = new CustomerService();

export async function POST(req) {
  const body = await req.json();
  const exists = await customerService.getCustomerByTaxpayer(body);
  if (exists) return Response.json(exists, { status: httpStatusCode.Conflict });
  const resp = await customerService.createCustomer(body);
  return Response.json(resp);
}

export async function GET(request) {
  const { page, "page-size": pageSize, name } = toPaginationParams(request.url);
  const customersList = await customerService.listCustomers(
    { pageSize, page },
    name,
  );
  return Response.json(customersList);
}
