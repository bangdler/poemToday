import Joi from 'joi';

import User from '../models/user.js';

// 회원가입
export const register = async ctx => {
  //req.body 검증
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    // username 존재 여부 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // conflict
      return;
    }
    const user = new User({
      username,
    });
    await user.setPassword(password); // hash 비밀번호 설정
    await user.save(); // 데이터베이스 저장

    // 클라이언트에 보낼 응답 데이터에서 hashedPassword 제거
    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const login = async ctx => {
  //req.body 검증
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401; // Unauthorized
      return;
    }

    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const check = async ctx => {};

export const logout = async ctx => {};
