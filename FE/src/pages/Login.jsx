import React from 'react';

import LoginRegisterLayout from '@/components/common/LoginRegisterLayout';
import LoginForm from '@/components/LoginForm';
import Logo from '@/components/Logo';

export default function Login() {
  return (
    <>
      <LoginRegisterLayout>
        <Logo name={'Today Poem'} link={'/'} blindText={'홈으로 이동합니다.'} />
        <LoginForm />
      </LoginRegisterLayout>
    </>
  );
}
