const Joi = require("joi");

module.exports = {
  loginValidation: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is required",
        "any.required": "Email is required",
        "string.email": "Please enter a valid email address",
      }),

    password: Joi.string().required().messages({
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  }),
};
