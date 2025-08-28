const Joi = require("joi");

module.exports = {
  materialAdd: Joi.object({
    materialName: Joi.string().min(2).max(100).required().messages({
      "string.base": `"materialName" should be a type of 'text'`,
      "string.empty": `"materialName" cannot be an empty field`,
      "string.min": `"materialName" should have at least {#limit} characters`,
      "string.max": `"materialName" should have at most {#limit} characters`,
      "any.required": `"materialName" is a required field`,
    }),
  }),
  materialEdit: Joi.object({
    materialName: Joi.string().min(2).max(100).required().messages({
      "string.base": `"materialName" should be a type of 'text'`,
      "string.empty": `"materialName" cannot be an empty field`,
      "string.min": `"materialName" should have at least {#limit} characters`,
      "string.max": `"materialName" should have at most {#limit} characters`,
      "any.required": `"materialName" is a required field`,
    }),
    materialId: Joi.string()
      .uuid({ version: ["uuidv4"] })
      .required()
      .messages({
        "string.base": "materialId must be a string",
        "string.guid": "materialId must be a valid UUID v4",
        "any.required": "materialId is required",
      }),
  }),
};
