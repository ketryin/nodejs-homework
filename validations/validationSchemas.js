const Joi = require('joi')

const addOrUpdateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  owner: Joi.string()
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const userSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required(),
})

module.exports = {
  addOrUpdateSchema,
  updateFavoriteSchema,
  userSchema,
  subscriptionSchema
}
