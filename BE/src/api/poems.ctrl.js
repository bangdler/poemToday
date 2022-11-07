import Joi from 'joi';
import mongoose from 'mongoose';

import Poem from '../models/poem.js';

const { ObjectId } = mongoose.Types;

// 클라이언트 요청 url id 체크 후 잘못된 경우 400 error
export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
};

// post - peom 작성
export const write = async ctx => {
  // req.body 검증
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.array().items(Joi.string()).required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  // 요청이 제대로 왔을 경우 데이타베이스 등록
  const { title, body, author, category } = ctx.request.body;
  const poem = new Poem({
    title,
    body,
    author,
    category,
  });
  try {
    await poem.save();
    ctx.body = poem;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// get - poem 목록 조회
export const list = async ctx => {
  try {
    const poems = await Poem.find().exec();
    ctx.body = poems;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// get - 특정 poem 조회
export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const poem = await Poem.findById(id).exec();
    // 없는 경우
    if (!poem) {
      ctx.status = 404;
      return;
    }
    ctx.body = poem;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// delete - 특정 poem 제거
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Poem.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공은 했으나 응답 데이터 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

// patch - poem 수정 (주어진 필드)
export const update = async ctx => {
  // req.body 검증
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    author: Joi.string(),
    category: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  // 요청이 제대로 왔을 경우 데이터 수정
  const { id } = ctx.params;
  try {
    const poem = await Poem.findByIdAndUpdate(id, ctx.request.body, { new: true }).exec();
    if (!poem) {
      ctx.status = 404;
      return;
    }
    ctx.body = poem;
  } catch (e) {
    ctx.throw(500, e);
  }
};
