import mongoose from 'mongoose';

const { Schema } = mongoose;

const EmailSchema = new Schema({
  email: String,
  publishedDate: Date,
  authCode: String,
});

EmailSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

const Email = mongoose.model('Email', EmailSchema);
export default Email;
