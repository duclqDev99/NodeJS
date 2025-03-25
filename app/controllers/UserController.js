const { BaseController } = require("../core/index");
const resMsgKey = require("../constants/resMsgKey");
const UserService = require("../services/UserService");

class UserController extends BaseController {
  async index(req, res) {
    try {
      const users = await UserService.findAll();
      return this.success(res, users, resMsgKey.USER.GET_LIST_SUCCESS);
    } catch (err) {
      return this.error(res, err.message);
    }
  }

  async create(req, res) {
    try {
      const userData = req.body;
      const user = await UserService.create(userData);
      return this.created(res, user, resMsgKey.USER.CREATE_SUCCESS);
    } catch (error) {
      return this.error(res, res.__(error.message) || error.message);
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const userData = req.body;
      const user = await UserService.update(id, userData);
      return this.success(res, user, resMsgKey.USER.UPDATE_SUCCESS);
    } catch (error) {
      return this.error(res, res.__(error.message) || error.message);
    }
  }
}

module.exports = new UserController();
