const Joi = require("joi");

module.exports = {
  colorAdd: Joi.object({
    colorName: Joi.string().min(1).required().messages({
      "string.base": "Color name must be a string",
      "string.empty": "Color name is required",
      "any.required": "Color name is required",
    }),

    hexCode: Joi.string()
      .pattern(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
      .required()
      .messages({
        "string.pattern.base":
          "Hex code must be a valid hex color (e.g. #FFFFFF or #FFF)",
        "string.empty": "Hex code is required",
        "any.required": "Hex code is required",
      }),
  }),

  colorEdit: Joi.object({
    colorId: Joi.string()
      .uuid({ version: ["uuidv4"] })
      .required()
      .messages({
        "string.base": "colorId must be a string",
        "string.guid": "colorId must be a valid UUID v4",
        "any.required": "colorId is required",
      }),
    colorName: Joi.string().min(1).messages({
      "string.base": "Color name must be a string",
      "string.empty": "Color name is required",
      "any.required": "Color name is required",
    }),

    hexCode: Joi.string()
      .pattern(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/)
      .messages({
        "string.pattern.base":
          "Hex code must be a valid hex color (e.g. #FFFFFF or #FFF)",
        "string.empty": "Hex code is required",
        "any.required": "Hex code is required",
      }),
  }),
};
