const { BaseController } = require("../core/index");
const AuthService = require("../services/AuthService");
const resMsgKey = require("../constants/resMsgKey");
const resStatus = require("../constants/httpStatus");
const resCode = require("../constants/responseCode");

class AuthController extends BaseController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
  
      if (!result.success) {
        return this.success(res, result, resMsgKey.AUTH.LOGIN_SUCCESS, resCode.UNAUTHORIZED, resStatus.UNAUTHORIZED)
      }
  
      return res.json({ token: result.token, user: result.user });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
}

module.exports = new AuthController();
