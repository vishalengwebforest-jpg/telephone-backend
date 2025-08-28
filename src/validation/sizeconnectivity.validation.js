const Joi = require("joi");

module.exports = {
  sizeConnectivityAdd: Joi.object({
    size: Joi.string().valid("40mm", "44mm").required().messages({
      "any.only": `"size" must be either 40mm or 44mm`,
      "any.required": `"size" is a required field`,
    }),

    connectivity: Joi.string().valid("GPS", "LTE").required().messages({
      "any.only": `"connectivity" must be either GPS or LTE`,
      "any.required": `"connectivity" is a required field`,
    }),
  }),

  sizeConnectivityEdit: Joi.object({
    size: Joi.string().valid("40mm", "44mm").messages({
      "any.only": `"size" must be either 40mm or 44mm`,
      "any.required": `"size" is a required field`,
    }),

    connectivity: Joi.string().valid("GPS", "LTE").messages({
      "any.only": `"connectivity" must be either GPS or LTE`,
      "any.required": `"connectivity" is a required field`,
    }),
    sizeConnectivityId: Joi.string()
      .uuid({ version: ["uuidv4"] })
      .required()
      .messages({
        "string.base": "sizeConnectivityId must be a string",
        "string.guid": "sizeConnectivityId must be a valid UUID v4",
        "any.required": "sizeConnectivityId is required",
      }),
  }),
};
