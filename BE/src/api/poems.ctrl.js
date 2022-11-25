import Joi from 'joi';
import mongoose from 'mongoose';

import Poem from '../models/poem.js';
import { shortenQuillTypeBody } from '../utils/shortenQuillTypeBody.js';

const { ObjectId } = mongoose.Types;

export const checkOwnPoem = (ctx, next) => {
  const { user, poem } = ctx.state;
  if (poem.user._id.toString() !== user._id) {
    ctx.status = 403; // forbidden;
    return;
  }
  return next();
};

export const getPoemById = async (ctx, next) => {
  const { id } = ctx.params;
  // 클라이언트 요청 url id 체크 후 잘못된 경우 400 error
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const poem = await Poem.findById(id);
    if (!poem) {
      ctx.status = 404;
      return;
    }
    ctx.state.poem = poem;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

// post - peom 작성
export const write = async ctx => {
  // req.body 검증
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.array()
      .items(Joi.object({ checked: Joi.boolean(), name: Joi.string(), color: Joi.string() }))
      .required(),
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
    user: ctx.state.user,
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
  const { username, category, page } = ctx.query;

  const curPage = parseInt(page || '1', 10);

  if (curPage < 1) {
    ctx.status = 400;
    return;
  }

  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(category ? { category: category } : {}),
  };

  try {
    const poems = await Poem.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((curPage - 1) * 10)
      .exec();
    // 마지막 페이지 알려주기
    const poemCount = await Poem.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(poemCount / 10));
    // body 200자 이상 제한하기
    // 인스턴스 형태에서 json 으로 변환하여 사용해야함. 이 방법 또는 .skip() 뒤에 .lean() 추가하여 사용
    ctx.body = poems
      .map(poem => poem.toJSON())
      .map(poem => ({ ...poem, body: poem.body.length < 200 ? poem.body : `${shortenQuillTypeBody(poem.body)}...` }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

// get - 특정 poem 조회
export const read = async ctx => {
  ctx.body = ctx.state.poem;
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
    category: Joi.array().items(Joi.object()),
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

// getPoemById 사용으로 인한 미사용 함수
export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
};
