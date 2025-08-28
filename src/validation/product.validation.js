const Joi = require("joi");

module.exports = {
  productAdd: Joi.object({
    name: Joi.string().min(1).required().messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),

    description: Joi.string().allow("", null).optional().messages({
      "string.base": "Description must be a string",
    }),

    categoryId: Joi.string()
      .uuid({ version: ["uuidv4"] })
      .required()
      .messages({
        "string.base": "Category ID must be a string",
        "string.guid": "Category ID must be a valid UUID v4",
        "any.required": "Category ID is required",
      }),
  }),
  productEdit: Joi.object({
    name: Joi.string().min(1).messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),

    description: Joi.string().allow("", null).optional().messages({
      "string.base": "Description must be a string",
    }),

    categoryId: Joi.string()
      .uuid({ version: ["uuidv4"] })
      .messages({
        "string.base": "Category ID must be a string",
        "string.guid": "Category ID must be a valid UUID v4",
        "any.required": "Category ID is required",
      }),
    productId: Joi.string()
      .uuid({ version: ["uuidv4"] })
      .required()   
      .messages({
        "string.base": "productId must be a string",
        "string.guid": "productId  must be a valid UUID v4",
        "any.required": "productId  is required",
      }),
  }),
};
