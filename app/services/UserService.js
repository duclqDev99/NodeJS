const BaseService = require("../core/BaseService");
const Users = require("../models/Users.model");

class UserService extends BaseService {
  constructor() {
    super(Users); 
  }
}

module.exports = new UserService();
