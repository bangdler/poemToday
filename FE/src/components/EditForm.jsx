import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import EditActionButtons from '@/components/EditActionButtons';
import Editor from '@/components/Editor';
import { PoemContext } from '@/context/PoemProvider';
import { UserContext } from '@/context/UserProvider';

export default function EditForm() {
  const userData = useContext(UserContext);
  const poemData = useContext(PoemContext);
  const { username, poemId } = useParams();

  return (
    <S_FormLayout>
      <Editor field={'edit'} poemForm={poemData.edit} userData={userData} />
      <EditActionButtons field={'edit'} poemForm={poemData.edit} id={poemId} username={username} />
    </S_FormLayout>
  );
}

const S_FormLayout = styled.form`
  padding: 1rem;
  max-width: 768px;
`;
