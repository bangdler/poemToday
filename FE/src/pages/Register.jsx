import React from 'react';

import Modal from '@/components/common/Modal';
import Logo from '@/components/Logo';
import RegisterForm from '@/components/RegisterForm';

export default function Register() {
  return (
    <>
      <Modal>
        <Logo name={'Today Poem'} link={'/'} blindText={'홈으로 이동합니다.'} />
        <RegisterForm />
      </Modal>
    </>
  );
}
