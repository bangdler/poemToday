import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// 인스턴스 메서드 - 각 document 에서 사용할 수 있는 함수, this = user 도큐먼트 (new User)
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true || false
};

// 클라이언트에 보낼 응답데이터에 hashedPassword 필드 제거 메서드
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

// 스태틱 메서드 - 모델에서 바로 사용할 수 있는 함수, this = User 모델
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;
