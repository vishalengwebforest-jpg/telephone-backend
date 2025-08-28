class Response {
  constructor(status, statusCode, message, data, err) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.err = err;
  }
}

const success = (message, data = {}) => {
  return new Response(true, 200, message, data, {});
};

const badRequest = (message) => {
  return new Response(false, 400, message, null, {});
};

const unAuthorization = (message) => {
  return new Response(false, 401, message, {}, {});
};

const conflictResponse = (message) => {
  return new Response(false, 409, message, {}, {});
};

const serverError = (message, err = {}) => {
  return new Response(false, 500, message, {}, err);
};

const validationError = (message, err = {}) => {
  return new Response(false, 422, message, {}, err);
};

const notFound = (message, err = {}) => {
  return new Response(false, 404, message, {}, err);
};

module.exports = {
  success,
  badRequest,
  unAuthorization,
  conflictResponse,
  serverError,
  validationError,
  notFound,
};
