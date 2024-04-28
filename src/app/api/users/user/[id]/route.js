import UserService from "../../service";

const service = new UserService();

export async function PUT(request, { params }) {
  const id = params.id;
  const body = await request.json();
  const resp = await service.updateUser(body, id);
  return Response.json(resp);
}
