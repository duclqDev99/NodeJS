const { BaseRepository } = require("../core/index");
const Users = require("../models/Users.model");

class UserRepository extends BaseRepository {
  constructor() {
    super(Users);
  }

  async findByEmail(email) {
    return await this.model.findOne({ where: { email } });
  }
}

module.exports = new UserRepository();
