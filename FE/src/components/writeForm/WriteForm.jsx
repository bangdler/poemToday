import React, { useContext } from 'react';
import styled from 'styled-components';

import Editor from '@/components/writeForm/Editor';
import WriteActionButtons from '@/components/writeForm/WriteActionButtons';
import { PoemContext } from '@/context/PoemProvider';
import { UserContext } from '@/context/UserProvider';

export default function WriteForm() {
  const userData = useContext(UserContext);
  const poemData = useContext(PoemContext);

  return (
    <S_FormLayout>
      <Editor field={'write'} poemForm={poemData.write} userData={userData} />
      <WriteActionButtons field={'write'} poemForm={poemData.write} />
    </S_FormLayout>
  );
}

const S_FormLayout = styled.form`
  padding: 1rem;
  max-width: 768px;
`;
