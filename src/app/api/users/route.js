import UserService from "./service";

const service = new UserService();

export async function POST(req) {
  const body = await req.json();

  const resp = await service.createUser(body);
  return Response.json(resp);
}
