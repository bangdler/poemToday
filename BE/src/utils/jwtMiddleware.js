import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import { ACCESS_TOKEN, JWT_EXPIRATION_TYPE_COOKIE, JWT_REISSUANCE_LIMIT } from '../utils/constants.js';

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get(ACCESS_TOKEN);
  if (!token) return next();
  try {
    // 토큰 유효 여부, 만료 여부 확인
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decoded._id,
      username: decoded.username,
    };
    // 토큰 유효기간 3.5일 미만이면 재발급
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < JWT_REISSUANCE_LIMIT) {
      const user = await User.findById(decoded._id);
      const newToken = user.generateToken();
      ctx.cookies.set(ACCESS_TOKEN, newToken, {
        maxAge: JWT_EXPIRATION_TYPE_COOKIE,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    // 토큰 검증 실패
    return next();
  }
};

export default jwtMiddleware;
