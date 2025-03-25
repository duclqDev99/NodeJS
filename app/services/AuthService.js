const { BaseService } = require("../core/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtConfig = require("../config/jwt.config");
const Users = require("../models/Users.model");
const UserRepository = require("../repositories/UserRepository");

class AuthService extends BaseService {
  constructor() {
    super(Users);
  }

  async login(email, password) {
    try {
      // Tìm user theo email
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        return { success: false, message: "User not found" };
      }

      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, message: "Invalid credentials" };
      }

      // Tạo JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        jwtConfig.secret,
        {
          expiresIn: jwtConfig.expiresIn,
        }
      );

      return { success: true, token, user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

module.exports = new AuthService();
