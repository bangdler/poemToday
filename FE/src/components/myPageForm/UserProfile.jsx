import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ConfirmModal from '@/components/common/ConfirmModal';
import ErrorBox from '@/components/common/ErrorBox';
import { S_CyanButton, S_RedButton } from '@/components/commonStyled/styleButtons';
import ChangePasswordForm from '@/components/myPageForm/ChangePasswordForm';
import { AuthContext, AuthDispatchContext, useAuth } from '@/context/AuthProvider';
import { LoadingContext } from '@/context/LoadingProvider';
import { PoemListContext } from '@/context/PoemListProvider';
import Palette from '@/style/palette';
import { LoginServerErrorMessages } from '@/utils/constants';
import { getLocalStorage } from '@/utils/util';

export default function UserProfile() {
  const auth = useContext(AuthContext);
  const { initializeAuth } = useContext(AuthDispatchContext);
  const { resignAuth } = useAuth();
  const poemListData = useContext(PoemListContext);
  const loading = useContext(LoadingContext);
  const [error, setError] = useState({ state: false, message: '' });
  const [resignConfirmModal, setResignConformModal] = useState(false);
  const navigate = useNavigate();
  const [changePasswordForm, setChangePasswordForm] = useState(false);
  const profile = getLocalStorage('profile');

  const onResign = useCallback(() => setResignConformModal(true), []);

  const onClickResignConfirm = useCallback(() => {
    resignAuth();
  }, []);

  const onClickResignCancel = useCallback(() => {
    setResignConformModal(false);
  }, []);

  const onClickChangePassword = useCallback(() => {
    setChangePasswordForm(true);
  }, []);

  const closeErrorBox = useCallback(async () => {
    setError({ state: false, message: '' });
  }, []);

  const closeChangePasswordForm = useCallback(() => {
    setChangePasswordForm(false);
  }, []);

  const getPublishedDate = responseDate => {
    const koreaDate = new Date(responseDate).toLocaleString();
    return koreaDate.substring(0, koreaDate.length - 10);
  };

  useEffect(() => {
    // initializeAuth();
    return () => initializeAuth();
  }, []);

  useEffect(() => {
    if (auth.error) {
      const errorStatus = auth.error.response.status;
      setError({ state: true, message: LoginServerErrorMessages[errorStatus] });
      return;
    }
    if (auth.response?.msg === 'Resign Success') {
      //탈퇴 완료
      console.log(auth.response.msg);
      navigate('/');
    }
    setError({ state: false, message: '' });
  }, [auth.error, auth.response]);

  return (
    <S_Wrapper>
      {!changePasswordForm ? (
        <>
          <S_ProfileContainer>
            <h2>유저 프로필</h2>
            <p>Username : {profile.username}</p>
            <p>작성한 글 수 : {poemListData.total}개</p>
            <p>가입일 : {getPublishedDate(profile.createdDate)}</p>
            <p>이메일 : {profile.email}</p>
          </S_ProfileContainer>
          <S_ProfileButtons>
            <S_CyanButton size={'medium'} onClick={onClickChangePassword}>
              비밀번호 변경
            </S_CyanButton>
            <S_RedButton size={'medium'} onClick={onResign}>
              탈퇴
            </S_RedButton>
          </S_ProfileButtons>
          <ErrorBox visible={error.state} errorMessage={error.message} onClick={closeErrorBox} />
          <ConfirmModal
            visible={resignConfirmModal}
            title={'탈퇴하시겠습니까?'}
            description={'탈퇴 후 되돌릴 수 없습니다.'}
            confirmText={'탈퇴'}
            cancelText={'취소'}
            onConfirm={onClickResignConfirm}
            onCancel={onClickResignCancel}
            confirmLoading={loading.resign}
          />
        </>
      ) : (
        <ChangePasswordForm closeChangePasswordForm={closeChangePasswordForm} />
      )}
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  height: 400px;
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column', align: 'flex-start', justify: 'space-between' })};
  padding-left: 2rem;
  padding-top: 2rem;
`;

const S_ProfileContainer = styled.div`
  > h2 {
    font-size: 3rem;
    font-weight: bold;
    color: ${Palette.cyan[4]};
  }
  > p {
    font-size: 2.4rem;
  }

  > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const S_ProfileButtons = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})};
  > *:not(:last-child) {
    margin-right: 2rem;
  }
`;
