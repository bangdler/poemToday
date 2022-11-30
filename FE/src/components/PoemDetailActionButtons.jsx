import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ErrorBox from '@/components/common/ErrorBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { S_Button, S_CyanButton, S_RedButton } from '@/components/commonStyled/styleButtons';
import { DeletePoemByIdServerErrorMessages } from '@/utils/constants';

export default function PoemDetailActionButtons({
  closeModal,
  ownPoem,
  onEdit,
  onRemove,
  removePoemResponse,
  removePoemError,
  loading,
}) {
  const navigate = useNavigate();
  const [error, setError] = useState({ state: false, message: '' });

  const closeErrorBox = async () => {
    setError({ state: false, message: '' });
  };

  useEffect(() => {
    if (removePoemResponse === null) return;
    alert('삭제 성공');
    navigate('/');
  }, [removePoemResponse]);

  useEffect(() => {
    if (removePoemError === null) return;
    const errorStatus = removePoemError.response.status;
    if (errorStatus === '401') {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
    setError({ state: true, message: DeletePoemByIdServerErrorMessages[errorStatus] });
  }, [removePoemError]);

  return (
    <>
      <S_Wrapper>
        <S_Wrapper2>
          {ownPoem && (
            <>
              <S_CyanButton size={'medium'} disabled={loading} onClick={onEdit}>
                수정
              </S_CyanButton>
              <S_RedButton size={'medium'} disabled={loading} onClick={onRemove}>
                삭제 {loading && <LoadingSpinner width={'20px'} color={`blue`} />}
              </S_RedButton>
            </>
          )}
        </S_Wrapper2>
        <S_Button size={'medium'} onClick={() => closeModal()}>
          닫기
        </S_Button>
      </S_Wrapper>
      {error.state && <ErrorBox errorMessage={error.message} onClick={closeErrorBox} />}
    </>
  );
}

const S_Wrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({ justify: 'space-between' })};
`;

const S_Wrapper2 = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})};
  > *:not(:last-child) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;
