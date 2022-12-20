import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
// nodemailer Transport 생성
export const transporter = nodemailer.createTransport({
  service: 'Naver',
  host: 'smtp.naver.com',
  port: 465,
  secure: false, // true for 465, false for other ports -> 안돼서 tls 추가
  tls: true,
  auth: {
    // 이메일을 보낼 계정 데이터 입력
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
