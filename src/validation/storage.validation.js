const Joi = require("joi");

module.exports = {
  sizeAdd: Joi.object({
    size: Joi.string()
      .trim()
      .pattern(/^\d+\s?(B|KB|MB|GB|TB)$/i)
      .required()
      .messages({
        "string.pattern.base":
          'Size must be a valid storage size like "10MB", "500KB", or "2 GB"',
        "string.empty": "Size is required",
        "any.required": "Size is required",
      }),
  }),
  sizeEdit: Joi.object({
    size: Joi.string()
      .trim()
      .pattern(/^\d+\s?(B|KB|MB|GB|TB)$/i)
      .required()
      .messages({
        "string.pattern.base":
          'Size must be a valid storage size like "10MB", "500KB", or "2 GB"',
        "string.empty": "Size is required",
        "any.required": "Size is required",
      }),
    storageId: Joi.string()
      .uuid({ version: ["uuidv4"] })
      .required()
      .messages({
        "string.base": "storageId must be a string",
        "string.guid": "storageId must be a valid UUID v4",
        "any.required": "storageId is required",
      }),
  }),
};
