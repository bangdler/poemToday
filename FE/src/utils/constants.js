// TODO: 서버 error 종류 400(아이디, 비번 형식 오류), 401(없는 아이디, 잘못된 비번), 409(회원가입시 아이디중복),
import palette from '@/style/palette';

export const ServerErrorMessages = {
  400: '아이디, 비밀번호 형식이 잘못되었습니다.',
  401: '없는 아이디거나 잘못된 비밀번호입니다.',
  409: '이미 존재하는 아이디입니다.',
  500: '서버 응답 오류',
};

export const Categories = [
  { checked: false, name: '자작시', color: palette.yellow[2] },
  { checked: false, name: '사랑시', color: palette.red[1] },
  { checked: false, name: '감성시', color: palette.green[2] },
];
