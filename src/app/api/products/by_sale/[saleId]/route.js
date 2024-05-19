import ProductService from "../../service";

const productService = new ProductService();

export async function GET(req, { params }) {
  const id = params.saleId;
  const resp = await productService.listProductsBySale(id);
  return Response.json(resp);
}
