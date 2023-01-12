import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as Eye } from '@/assets/icons/eye-fill.svg';
import { ReactComponent as EyeSlash } from '@/assets/icons/eye-slash-fill.svg';
import ErrorBox from '@/components/common/ErrorBox';
import InputBox from '@/components/common/InputBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { S_Button, S_CyanButton } from '@/components/commonStyled/styleButtons';
import { AuthContext, AuthDispatchContext, useAuth } from '@/context/AuthProvider';
import { LoadingContext } from '@/context/LoadingProvider';
import { LoginServerErrorMessages } from '@/utils/constants';

const initialForm = {
  existPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
};

export default function ChangePasswordForm({ closeChangePasswordForm }) {
  const auth = useContext(AuthContext);
  const { initializeAuth } = useContext(AuthDispatchContext);
  const { changePassword } = useAuth();
  const loading = useContext(LoadingContext);
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState({
    existPassword: false,
    newPassword: false,
    newPasswordConfirm: false,
  });
  const [error, setError] = useState({ state: false, message: '' });

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
    if (auth.response?.msg === 'ChangePassword Success') {
      //변경 완료
      console.log(auth.response.msg);
      closeChangePasswordForm();
    }
    setError({ state: false, message: '' });
  }, [auth.error, auth.response]);

  const onChange = useCallback(({ target }) => {
    setForm(form => {
      return { ...form, [target.name]: target.value };
    });
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await closeErrorBox();
    if ([form.existPassword, form.newPassword, form.newPasswordConfirm].includes('')) {
      setError({ state: true, message: '빈 칸을 모두 입력하세요.' });
      return;
    }
    if (form.newPassword !== form.newPasswordConfirm) {
      setError({ state: true, message: '비밀번호가 일치하지 않습니다.' });
      setForm(form => {
        return { ...form, newPassword: '', newPasswordConfirm: '' };
      });
      return;
    }
    changePassword({ existPassword: form.existPassword, newPassword: form.newPassword });
  };

  const clickCancelButton = e => {
    e.preventDefault();
    closeChangePasswordForm();
  };

  const closeErrorBox = useCallback(async () => {
    setError({ state: false, message: '' });
  }, []);

  const clickShowPasswordButton = useCallback(e => {
    e.preventDefault();
    const field = e.currentTarget.name;
    setShowPassword(prev => {
      return {
        ...prev,
        [field]: !prev[field],
      };
    });
  }, []);

  const passwordOption = useMemo(() => {
    return {
      component: {
        text: <Eye width={22} height={22} viewBox="0 0 16 16" />,
        password: <EyeSlash width={22} height={22} viewBox="0 0 16 16" />,
      },
      onClick: clickShowPasswordButton,
    };
  }, [clickShowPasswordButton]);

  return (
    <>
      <S_Wrapper>
        <S_FakeInput type="text" name="email" autoComplete={'username email'} />.
        <InputBox
          title={'기존 비밀번호'}
          name={'existPassword'}
          value={form.existPassword}
          type={showPassword.existPassword ? 'text' : 'password'}
          onChange={onChange}
          autoComplete={'new-password'}
          option={passwordOption}
        />
        <InputBox
          title={'새 비밀번호'}
          name={'newPassword'}
          value={form.newPassword}
          type={showPassword.newPassword ? 'text' : 'password'}
          onChange={onChange}
          autoComplete={'new-password'}
          option={passwordOption}
        />
        <InputBox
          title={'새 비밀번호 확인'}
          name={'newPasswordConfirm'}
          value={form.newPasswordConfirm}
          type={showPassword.newPasswordConfirm ? 'text' : 'password'}
          onChange={onChange}
          autoComplete={'new-password'}
          option={passwordOption}
        />
        <S_ChangeButtons>
          <S_Button size={'medium'} onClick={clickCancelButton}>
            취소
          </S_Button>
          <S_CyanButton type="submit" size={'medium'} disabled={loading.changePassword} onClick={onSubmit}>
            비밀번호 변경 <LoadingSpinner visible={loading.changePassword} width={'20px'} color={`red`} />
          </S_CyanButton>
        </S_ChangeButtons>
      </S_Wrapper>
      <ErrorBox visible={error.state} errorMessage={error.message} onClick={closeErrorBox} />
    </>
  );
}

const S_Wrapper = styled.form`
  width: 360px;
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column', align: 'flex-start' })};
  > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const S_FakeInput = styled.input`
  display: none;
`;
const S_ChangeButtons = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})};
  > *:not(:last-child) {
    margin-right: 2rem;
  }
`;
