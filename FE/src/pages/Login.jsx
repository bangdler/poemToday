import React from 'react';
import styled from 'styled-components';

import Modal from '@/components/common/Modal';
import LoginForm from '@/components/LoginForm';
import Logo from '@/components/Logo';

export default function Login() {
  return (
    <>
      <Modal>
        <Logo name={'Today Poem'} link={'/'} blindText={'홈으로 이동합니다.'} />
        <LoginForm />
      </Modal>
    </>
  );
}
