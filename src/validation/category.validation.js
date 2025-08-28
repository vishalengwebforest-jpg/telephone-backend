const Joi = require("joi");

module.exports = {
  createCategory: Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),

    type: Joi.string()
      .valid("sell-option", "repair-option")
      .required()
      .messages({
        "any.only": 'Type must be either "sell-option" or "repair-option"',
        "string.empty": "Type is required",
        "any.required": "Type is required",
      }),
  }),
  editCategory: Joi.object({
    name: Joi.string().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),

    type: Joi.string().valid("sell-option", "repair-option").messages({
      "any.only": 'Type must be either "sell-option" or "repair-option"',
      "string.empty": "Type is required",
      "any.required": "Type is required",
    }),
    categoryId: Joi.string()
      .uuid({ version: ["uuidv4"] })
      .required()
      .messages({
        "string.base": "ID must be a string",
        "string.guid": "ID must be a valid UUID v4",
        "any.required": "ID is required",
      }),
  }),
};
