import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
// nodemailer Transport 생성
export const transporter = nodemailer.createTransport({
  service: 'google',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    // 이메일을 보낼 계정 데이터 입력
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});
