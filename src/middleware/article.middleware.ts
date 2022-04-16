import Joi from 'joi';
import { ParameterizedContext } from 'koa';

import emitError from '@/app/handler/emit-error';

const schema = Joi.object({
  id: Joi.number(),
  title: Joi.string().min(3).max(30).required(),
  desc: Joi.string().min(3).max(100),
  content: Joi.string().required(),
  is_comment: [1, 2],
  status: [1, 2],
  head_img: Joi.string().min(3).max(50),
  click: Joi.number(),
  tag_ids: Joi.array().items(Joi.number()),
  type_ids: Joi.array().items(Joi.number()),
  user_ids: Joi.array().items(Joi.number()),
});

export const verifyProp = async (ctx: ParameterizedContext, next) => {
  const prop = ctx.request.body;
  try {
    await schema.validateAsync(prop, {
      abortEarly: false,
      allowUnknown: false,
      convert: false,
    });
    await next();
  } catch (error) {
    emitError({ ctx, code: 400, error });
  }
};
