import ProductService from "../service";

const productService = new ProductService();

export async function PUT(req, { params }) {
  const body = await req.json();
  const id = params.id;
  const resp = await productService.updateProduct(body, id);
  return Response.json(resp);
}

export async function DELETE(request, { params }) {
  const id = params.id;
  const resp = await productService.deleteProduct(id);
  return Response.json(resp);
}
