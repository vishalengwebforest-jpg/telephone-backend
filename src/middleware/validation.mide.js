const { validationError } = require("../response");

const validationBodySchema = (schema) => (req, res, next) => {
  console.log(req.body);
  const { error } = schema.validate(req.body);

  if (!error) {
    next();
  } else {
    const errorMessage = error.details.map((err) => err.message).join(",");
    return res.status(422).send(validationError(errorMessage, {}));
  }
};

const validationQuerySchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.query);

  if (!error) {
    next();
  } else {
    const errorMessage = error.details.map((err) => err.message).join(",");
    return res.status(422).send(validationError(errorMessage, {}));
  }
};

const validationParamsSchema = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params);

  if (!error) {
    next();
  } else {
    const errorMessage = error.details.map((err) => err.message).join(",");
    return res.status(422).send(validationError(errorMessage, {}));
  }
};

module.exports = {
  validationBodySchema,
  validationQuerySchema,
  validationParamsSchema,
};
