const Joi = require("joi");

const addOrUpdateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

module.exports = addOrUpdateSchema;