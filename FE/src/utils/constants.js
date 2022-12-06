import palette from '@/style/palette';

export const LoginServerErrorMessages = {
  400: '아이디, 비밀번호 형식이 잘못되었습니다.',
  401: '없는 아이디거나 잘못된 비밀번호입니다.',
  409: '이미 존재하는 아이디입니다.',
  500: '서버 응답 오류',
  504: '서버 요청 실패(게이트웨이 시간초과)',
};

export const PostPoemServerErrorMessages = {
  400: '입력 오류. 제목, 저자, 내용을 모두 입력해주세요.',
  500: '서버 응답 오류',
};

export const GetPoemListServerErrorMessages = {
  400: '페이지 번호가 잘못되었습니다.',
  500: '서버 응답 오류',
};

export const GetPoemByIdServerErrorMessages = {
  400: '잘못된 요청입니다.',
  404: '존재하지 않는 Poem 입니다.',
  500: '서버 응답 오류',
};

export const DeletePoemByIdServerErrorMessages = {
  403: '작성자만 삭제할 수 있습니다.',
  500: '서버 응답 오류',
};

export const UpdatePoemByIdServerErrorMessages = {
  400: '잘못된 요청입니다.',
  403: '작성자만 수정할 수 있습니다.',
  404: '존재하지 않는 Poem 입니다.',
  500: '서버 응답 오류',
};

export const CategoryColors = {
  자작시: palette.yellow[2],
  사랑시: palette.red[1],
  감성시: palette.green[2],
};
