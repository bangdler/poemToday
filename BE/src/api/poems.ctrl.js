let poemId = 1;

const poems = [
  {
    id: poemId,
    title: '제목',
    body: '내용',
  },
];

// post - peom 작성
export const write = ctx => {
  const { title, body } = ctx.request.body;
  const poem = { id: poemId++, title, body };
  poems.push(poem);
  ctx.body = poem;
};

// get - poem 목록 조회
export const list = ctx => {
  ctx.body = poems;
};

// get - 특정 poem 조회
export const read = ctx => {
  const { id } = ctx.params;
  const poem = poems.find(it => it.id === +id);
  // 없는 경우
  if (!poem) {
    ctx.status = 404;
    ctx.body = {
      message: 'poem 이 존재하지 않습니다.',
    };
    return;
  }
  ctx.body = poem;
};

// delete - 특정 poem 제거
export const remove = ctx => {
  const { id } = ctx.params;
  const index = poems.findIndex(it => it.id === +id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'poem 이 존재하지 않습니다.',
    };
    return;
  }
  poems.splice(index, 1);
  ctx.status = 204; // No Content
};

// put - poem 수정 (통으로 data 교체)
export const replace = ctx => {
  const { id } = ctx.params;
  const index = poems.findIndex(it => it.id === +id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'poem 이 존재하지 않습니다.',
    };
    return;
  }
  poems[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = poems[index];
};

// patch - poem 수정 (주어진 필드)
export const update = ctx => {
  const { id } = ctx.params;
  const index = poems.findIndex(it => it.id === +id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'poem 이 존재하지 않습니다.',
    };
    return;
  }
  poems[index] = {
    ...poems[index],
    ...ctx.request.body,
  };
  ctx.body = poems[index];
};
