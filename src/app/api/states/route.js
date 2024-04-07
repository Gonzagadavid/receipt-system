import StateService from "./service";

const stateService = new StateService();

export async function GET() {
  const states = await stateService.getStates();
  return Response.json(states);
}
