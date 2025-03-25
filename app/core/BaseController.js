const HttpStatus = require('../constants/httpStatus');
const ResponseCode = require('../constants/responseCode');

class BaseController {
  constructor() {
    const proto = Object.getPrototypeOf(this);
    const methodNames = Object.getOwnPropertyNames(proto).filter(
      (prop) => typeof this[prop] === "function" && prop !== "constructor"
    );

    methodNames.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }
  success(res, data = null, messageKey = "success", code = ResponseCode.SUCCESS) {
    return res.status(HttpStatus.OK).json({
      code,
      message: res.__(messageKey),
      data,
    });
  }

  created(res, data = null, messageKey = "created", code = ResponseCode.SUCCESS) {
    return res.status(HttpStatus.CREATED).json({
      code,
      message: res.__(messageKey),
      data,
    });
  }

  error(
    res,
    message = "Internal Server Error",
    code = ResponseCode.SYSTEM_ERROR,
    status = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    return res.status(status).json({
      code,
      message,
      data: null,
    });
  }

  notFound(res, message = "Resource not found", code = ResponseCode.NOT_FOUND) {
    return this.error(res, message, code, HttpStatus.NOT_FOUND);
  }

  badRequest(
    res,
    message = "Bad request",
    code = ResponseCode.VALIDATION_ERROR
  ) {
    return this.error(res, message, code, HttpStatus.BAD_REQUEST);
  }

  unauthorized(
    res,
    message = "Unauthorized",
    code = ResponseCode.UNAUTHORIZED
  ) {
    return this.error(res, message, code, HttpStatus.UNAUTHORIZED);
  }
}

module.exports = BaseController;
