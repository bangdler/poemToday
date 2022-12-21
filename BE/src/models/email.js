import mongoose from 'mongoose';

import { EMAIL_VERIFICATION_EXPIRATION } from '../utils/constants.js';

const { Schema } = mongoose;

const EmailSchema = new Schema({
  email: String,
  publishedDate: Date,
  authCode: String,
});

EmailSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

EmailSchema.methods.checkAuthCode = async function (authCode) {
  const publishedTime = new Date(this.publishedDate).getTime();
  const curTime = Date.now();
  if (curTime - publishedTime > EMAIL_VERIFICATION_EXPIRATION) {
    return false;
  }
  return authCode === this.authCode; // true || false
};
const Email = mongoose.model('Email', EmailSchema);
export default Email;
