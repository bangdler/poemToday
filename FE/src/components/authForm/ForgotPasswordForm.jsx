import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ConfirmModal from '@/components/common/ConfirmModal';
import ErrorBox from '@/components/common/ErrorBox';
import InputBox from '@/components/common/InputBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StyleLink from '@/components/common/StyleLink';
import { S_CyanButton } from '@/components/commonStyled/styleButtons';
import { AuthContext, AuthDispatchContext, useAuth } from '@/context/AuthProvider';
import { LoadingContext } from '@/context/LoadingProvider';
import { ForgotPasswordSeverErrorMessages } from '@/utils/constants';

const initialForm = {
  username: '',
  email: '',
};

export default function ForgotPasswordForm() {
  const auth = useContext(AuthContext);
  const { initializeAuth } = useContext(AuthDispatchContext);
  const { forgotPassword } = useAuth();
  const loading = useContext(LoadingContext);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({ state: false, message: '' });
  const [confirmModal, setConformModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // initializeAuth();
    return () => initializeAuth();
  }, []);

  useEffect(() => {
    if (auth.error) {
      const errorStatus = auth.error.response.status;
      setError({ state: true, message: ForgotPasswordSeverErrorMessages[errorStatus] });
      return;
    }
    if (auth.response) {
      console.log(auth.response.msg);
      setConformModal(true);
    }
    setError({ state: false, message: '' });
  }, [auth.response, auth.error]);

  const onChange = useCallback(({ target }) => {
    setForm(form => {
      return { ...form, [target.name]: target.value };
    });
  }, []);

  const closeErrorBox = useCallback(async () => {
    setError({ state: false, message: '' });
  }, []);

  const onClickConfirm = () => {
    navigate('/login');
  };

  const onClickCancel = () => {
    setConformModal(false);
  };

  const onSubmit = async e => {
    e.preventDefault();
    await closeErrorBox();
    if ([form.username, form.email].includes('')) {
      setError({ state: true, message: '??? ?????? ?????? ???????????????.' });
      return;
    }
    const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(form.email)) {
      setError({ state: true, message: '????????? ????????? ??????????????????.' });
      return;
    }
    forgotPassword({ username: form.username, email: form.email });
  };

  return (
    <>
      <S_Wrapper>
        <InputBox
          title={'?????????'}
          name={'username'}
          value={form.username}
          onChange={onChange}
          autoComplete={'username'}
        />
        <InputBox title={'?????????'} name={'email'} value={form.email} onChange={onChange} autoComplete={'email'} />
        <S_CyanButton type="submit" size={'fullWidth'} disabled={loading.login} onClick={onSubmit}>
          ???????????? ?????? <LoadingSpinner visible={loading.forgotPassword} width={'20px'} color={`red`} />
        </S_CyanButton>
        <S_Container>
          <StyleLink to={'/login'} size={'small'}>
            ?????????
          </StyleLink>
        </S_Container>
      </S_Wrapper>
      <ConfirmModal
        visible={confirmModal}
        title={'???????????? ?????? ??? ????????????'}
        description={'????????? ???????????? ???????????? ?????????????????????'}
        confirmText={'??????'}
        cancelText={'??????'}
        onConfirm={onClickConfirm}
        onCancel={onClickCancel}
      />
      <ErrorBox visible={error.state} errorMessage={error.message} onClick={closeErrorBox} />
    </>
  );
}

const S_Wrapper = styled.form`
  height: 300px;
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
  font-family: 'Gamja Flower';
  padding: 1.6rem;
  > * {
    margin: 10px 0;
  }
  > button {
    margin-top: 50px;
  }
`;

const S_Container = styled.div`
  width: 100%;
  padding-right: 1rem;
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-end' })}
`;