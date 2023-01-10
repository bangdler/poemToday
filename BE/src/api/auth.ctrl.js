import path from 'path';

import dotenv from 'dotenv';
import ejs from 'ejs';
import Joi from 'joi';

import Email from '../models/email.js';
import User from '../models/user.js';
import { ACCESS_TOKEN, JWT_EXPIRATION_TYPE_COOKIE } from '../utils/constants.js';
import { transporter } from '../utils/email.js';

dotenv.config();
const __dirname = path.resolve();

// 회원가입
export const register = async ctx => {
  //req.body 검증
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    authCode: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password, email, authCode } = ctx.request.body;
  try {
    // username 존재 여부 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // conflict
      return;
    }
    // email authCode 확인
    const emailModel = await Email.findByEmail(email);
    // 메일 db에 없는 메일인 경우
    if (!emailModel) {
      ctx.status = 403; // forbidden
      return;
    }
    // authCode 가 일치하지 않거나 만료된 경우
    const validAuthcode = await emailModel.checkAuthCode(authCode);
    if (!validAuthcode) {
      ctx.status = 403;
      return;
    }

    const user = new User({
      username,
      email,
    });
    await user.setPassword(password); // hash 비밀번호 설정
    await user.save(); // 데이터베이스 저장

    // 클라이언트에 보낼 응답 데이터에서 hashedPassword 제거
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set(ACCESS_TOKEN, token, {
      maxAge: JWT_EXPIRATION_TYPE_COOKIE,
      httpOnly: true,
    });
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

    const token = user.generateToken();
    ctx.cookies.set(ACCESS_TOKEN, token, {
      maxAge: JWT_EXPIRATION_TYPE_COOKIE,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 로그인 상태 확인
export const check = async ctx => {
  const { user } = ctx.state;
  if (!user) {
    // 로그인 상태 아님
    ctx.status = 401;
    return;
  }

  ctx.body = user;
};

export const logout = async ctx => {
  ctx.cookies.set(ACCESS_TOKEN);
  ctx.status = 204;
};

export const resign = async ctx => {
  const { user } = ctx.state;
  try {
    await User.findByIdAndRemove(user._id).exec();
    ctx.cookies.set(ACCESS_TOKEN);
    ctx.body = { msg: 'Resign Success' };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const changePassword = async ctx => {
  const schema = Joi.object().keys({
    existPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  try {
    const { user } = ctx.state;
    const userModel = await User.findByUsername(user.username);
    const { existPassword, newPassword } = ctx.request.body;
    const valid = await userModel.checkPassword(existPassword);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    await userModel.setPassword(newPassword); // hash 비밀번호 설정
    await userModel.save(); // 데이터베이스 저장
    ctx.body = { msg: 'ChangePassword Success' };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const verifyEmail = async ctx => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { email } = ctx.request.body;
  try {
    let authNum = Math.random().toString().substring(2, 8);
    let emailTemplate;

    // 사용자에게 authNum 메일 보내기
    await ejs.renderFile(__dirname + '/src/ejs/emailVerify.ejs', { email, code: authNum }, function (error, data) {
      if (error) {
        throw error;
      }
      emailTemplate = data;
    });

    const mailOptions = {
      from: `PoemToday<${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: 'PoemToday 이메일 인증 요청 메일입니다',
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions, (error, responses) => {
      if (error) {
        throw error;
      } else {
        console.log('send success :', responses);
      }
      transporter.close();
    });

    // db 에 저장, 이미 있는 메일이면 날짜, authCode 만 업데이트
    const exist = await Email.findByEmail(email);
    if (exist) {
      await Email.findOneAndUpdate({ email }, { $set: { publishedDate: Date.now(), authCode: authNum } });
    } else {
      const emailModel = new Email({
        email,
        publishedDate: Date.now(),
        authCode: authNum,
      });
      await emailModel.save();
    }

    ctx.body = { msg: 'Send Email Success' };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const forgotPassword = async ctx => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    email: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, email } = ctx.request.body;
  try {
    // 있는 유저인지 확인
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 404;
      return;
    }
    // 이메일이 같은지 확인
    if (user.email !== email) {
      ctx.status = 409;
      return;
    }
    // 임시비밀번호 생성 후 이메일로 전송, db 저장
    const tempPassword = Math.random().toString(36).slice(2);
    let emailTemplate;

    // 사용자에게 authNum 메일 보내기
    await ejs.renderFile(__dirname + '/src/ejs/tempPassword.ejs', { username, tempPassword }, function (error, data) {
      if (error) {
        throw error;
      }
      emailTemplate = data;
    });

    const mailOptions = {
      from: `PoemToday<${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: 'PoemToday 비밀번호 찾기에 대한 응답 메일입니다',
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions, (error, responses) => {
      if (error) {
        throw error;
      } else {
        console.log('send success :', responses);
      }
      transporter.close();
    });

    await user.setPassword(tempPassword);
    await user.save();

    ctx.body = { msg: 'ChangePassword & SendEmail Success' };
  } catch (e) {
    ctx.throw(500, e);
  }
};
