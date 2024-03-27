const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .min(6),
});

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});
const passwordChange = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  existingPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  newPassword: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
});

module.exports = {
  registerSchema,
  loginSchema,
  passwordChange
};
