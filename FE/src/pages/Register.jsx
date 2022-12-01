import React from 'react';

import LoginRegisterLayout from '@/components/authForm/LoginRegisterLayout';
import RegisterForm from '@/components/authForm/RegisterForm';
import Logo from '@/components/common/Logo';

export default function Register() {
  return (
    <>
      <LoginRegisterLayout>
        <Logo name={'Today Poem'} link={'/'} blindText={'홈으로 이동합니다.'} />
        <RegisterForm />
      </LoginRegisterLayout>
    </>
  );
}
