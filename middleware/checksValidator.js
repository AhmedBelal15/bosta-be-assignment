const Joi = require("joi");

const createCheck = Joi.object({
  name: Joi.string().min(2).max(15).required(),
  url: Joi.string().uri().required(),
  protocol: Joi.string().valid("http", "https", "tcp").required(),
  path: Joi.string().min(1),
  port: Joi.number(),
  webhook: Joi.string().uri(),
  timeout: Joi.number().min(1).max(10),
  interval: Joi.number().min(1),
  threshold: Joi.number().min(1),
  authentication: Joi.object().keys({
    username: Joi.string().min(2).max(15),
    password: Joi.string().min(6).max(255),
  }),
  httpHeaders: Joi.array(),
  assert: Joi.object().keys({
    statusCode: Joi.number(),
  }),
  tags: Joi.array(),
  ignoreSSL: Joi.boolean(),
});

const changeCheckStatus = Joi.object({
  paused: Joi.boolean().required(),
});

module.exports = { createCheck, changeCheckStatus };
