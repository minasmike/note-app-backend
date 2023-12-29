const Joi = require("joi");

const createNoteSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  userId: Joi.number().required(),
});

const updateNoteSchema = Joi.object({
  title: Joi.string(),
  body: Joi.string(),
  userId: Joi.number().required(),
});

module.exports = {
  createNoteSchema,
  updateNoteSchema,
};
