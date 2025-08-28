const Joi = require("joi");

module.exports = {
  paginationValidation: Joi.object({
    search: Joi.string().allow("", null).optional().messages({
      "string.base": "Search must be a string",
    }),

    pageSize: Joi.number().integer().min(1).max(100).default(10).messages({
      "number.base": "Page size must be a number",
      "number.min": "Page size must be at least 1",
      "number.max": "Page size must be at most 100",
      "number.integer": "Page size must be an integer",
    }),

    currentPage: Joi.number().integer().min(1).default(1).messages({
      "number.base": "Current page must be a number",
      "number.min": "Current page must be at least 1",
      "number.integer": "Current page must be an integer",
    }),
  }),

  uuidValidation: (key = "id") => {
    return Joi.object({
      [key]: Joi.string()
        .uuid({ version: ["uuidv4"] })
        .required()
        .messages({
          "string.base": `${key} must be a string`,
          "string.guid": `${key} must be a valid UUID v4`,
          "any.required": `${key} is required`,
        }),
    });
  },
};
