import { dbConnection } from "../../db";

export default class StateModel {
  constructor() {
    this.db = dbConnection();
  }

  async getStates() {
    const query = "SELECT * from states";
    const [states] = await this.db.execute(query);
    return states;
  }
}
