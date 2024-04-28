import { httpStatusCode } from "../httpStatusCode";
import { toPaginationParams } from "../utils/toPaginationParams";
import ProductService from "./service";

const productService = new ProductService();

export async function POST(req) {
  const body = await req.json();
  const exists = await productService.existsProduct(body);
  if (exists) return Response.json(exists, { status: httpStatusCode.Conflict });
  const resp = await productService.createProduct(body);
  return Response.json(resp);
}

export async function GET(request) {
  const pagination = toPaginationParams(request.url);
  const productList = await productService.listProducts(pagination);
  return Response.json(productList);
}
