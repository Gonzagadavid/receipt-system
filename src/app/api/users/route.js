import UserService from "./service";

const service = new UserService();

export async function POST(req) {
  const body = await req.json();
  const exists = await service.getUserByEmail(body.email);
  if (exists) return Response.json({ message: "User Already registred" });
  const resp = await service.createUser(body);
  return Response.json(resp);
}
