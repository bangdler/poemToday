import React from 'react';

import LoginRegisterLayout from '@/components/common/LoginRegisterLayout';
import Logo from '@/components/Logo';
import RegisterForm from '@/components/RegisterForm';

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
