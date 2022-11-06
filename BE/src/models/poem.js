import mongoose from 'mongoose';

const { Schema } = mongoose;

const PoemSchema = new Schema({
  title: String,
  body: String,
  author: String,
  category: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

const Poem = mongoose.model('Poem', PoemSchema);
export default Poem;
