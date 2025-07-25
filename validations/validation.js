const joi = require("joi");
const addUserSchema = joi.object({
  name: joi.string().min(3).max(30).required().messages({
    "string.base": `name should be a string`,
    "string.empty": `name cannot be empty`,
    "string.min": `name should have at least 3 characters`,
    "string.max": `name should have at most 30 characters`,
    "any.required": `name is a required field`,
  }),
  age: joi.number().min(1).max(100).required().messages({
    "number.base": `age should be a number`,
    "number.min": `age must be at least 1`,
    "number.max": `age must be at most 100`,
    "any.required": `age is a required field`,
  }),
});

module.exports = {
  addUserSchema,
};
