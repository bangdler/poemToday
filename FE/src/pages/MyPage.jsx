import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import ConfirmModal from '@/components/common/ConfirmModal';
import Header from '@/components/header/Header';
import MyPageForm from '@/components/myPageForm/MyPageForm';
import { UserContext, useUser } from '@/context/UserProvider';

export default function MyPage() {
  const userData = useContext(UserContext);
  const { checkUser } = useUser();
  const navigate = useNavigate();
  const [loginAlertModal, setLoginAlertModal] = useState(false);

  const onClickGoLoginConfirm = useCallback(() => {
    navigate('/login');
  }, []);

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
      <MyPageForm />
      <ConfirmModal
        visible={loginAlertModal}
        title={'로그인이 필요합니다.'}
        description={'로그인 페이지로 이동해주세요!'}
        confirmText={'이동'}
        onConfirm={onClickGoLoginConfirm}
      />
      <Outlet />
    </>
  );
}
