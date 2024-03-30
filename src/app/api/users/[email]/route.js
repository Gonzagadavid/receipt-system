import UserService from "../service";

const service = new UserService();

export async function GET(req, { params }) {
  const user = await service.getUserByEmail(params.email);
  return Response.json(user);
}
