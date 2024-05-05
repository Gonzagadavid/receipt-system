import CustomerService from "../service";

const customerService = new CustomerService();

export async function PUT(request, { params }) {
  const id = params.id;
  const body = await request.json();

  const resp = await customerService.updateCustomer(body, id);
  return Response.json(resp);
}

export async function DELETE(request, { params }) {
  const id = params.id;
  const resp = await customerService.deleteCustomer(id);
  return Response.json(resp);
}
