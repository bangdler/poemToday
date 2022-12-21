import React from 'react';

import ForgotPasswordForm from '@/components/authForm/ForgotPasswordForm';
import LoginRegisterLayout from '@/components/authForm/LoginRegisterLayout';
import Logo from '@/components/common/Logo';

export default function ForgotPassword() {
  return (
    <>
      <LoginRegisterLayout>
        <Logo name={'Today Poem'} link={'/'} blindText={'홈으로 이동합니다.'} />
        <ForgotPasswordForm />
      </LoginRegisterLayout>
    </>
  );
}
