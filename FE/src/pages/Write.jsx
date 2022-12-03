import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmModal from '@/components/common/ConfirmModal';
import Header from '@/components/header/Header';
import WriteForm from '@/components/writeForm/WriteForm';
import { UserContext, useUser } from '@/context/UserProvider';

export default function Write() {
  const userData = useContext(UserContext);
  const { checkUser } = useUser();
  const navigate = useNavigate();
  const [loginAlertModal, setLoginAlertModal] = useState(false);

  const onClickGoLoginConfirm = () => {
    navigate('/login');
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (userData.error) {
      setLoginAlertModal(true);
    }
  }, [userData.error]);

  return (
    <>
      <Header />
      <WriteForm />
      <ConfirmModal
        visible={loginAlertModal}
        title={'로그인이 필요합니다.'}
        description={'로그인 페이지로 이동해주세요!'}
        confirmText={'이동'}
        onConfirm={onClickGoLoginConfirm}
      />
    </>
  );
}
