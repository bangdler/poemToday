import Poem from '../models/poem.js';

// post - peom 작성
export const write = async ctx => {
  const { title, body, author, category } = ctx.request.body;
  const poem = new Poem({
    title,
    body,
    author,
    category,
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
  try {
    const poems = await Poem.find().exec();
    ctx.body = poems;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// get - 특정 poem 조회
export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const poem = await Poem.findById(id).exec();
    // 없는 경우
    if (!poem) {
      ctx.status = 404;
      return;
    }
    ctx.body = poem;
  } catch (e) {
    ctx.throw(500, e);
  }
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
