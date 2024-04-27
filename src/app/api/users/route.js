import { httpStatusCode } from "../httpStatusCode";
import { toPaginationParams } from "../utils/toPaginationParams";
import UserService from "./service";

const service = new UserService();

export async function POST(request) {
  const body = await request.json();

  const exists = await service.getUserByEmail(body.email);
  if (exists)
    return Response.json(
      { message: "User Already registered" },
      { status: httpStatusCode.Conflict }
    );

  const resp = await service.createUser(body);
  return Response.json(resp);
}

export async function GET(request) {
  const pagination = toPaginationParams(request.url);
  const userList = await service.listUsers(pagination);
  return Response.json(userList);
}
