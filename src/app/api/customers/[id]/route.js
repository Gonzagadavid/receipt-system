import CustomerService from "../service";

const customerService = new CustomerService();

export async function PUT(request, { params }) {
  const id = params.id;
  const body = await request.json();
  console.log(body);
  const resp = await customerService.updateCustomer(body, id);
  return Response.json(resp);
}
