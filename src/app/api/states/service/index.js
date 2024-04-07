import StateModel from "../model";

export default class StateService {
  constructor() {
    this.model = new StateModel();
  }

  async getStates() {
    return this.model.getStates();
  }
}
