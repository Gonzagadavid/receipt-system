import ProductService from "../service";

const productService = new ProductService();

export async function PUT(req, { params }) {
  const body = await req.json();
  const id = params.id;
  const resp = await productService.updateProduct(body, id);
  return Response.json(resp);
}
