import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import ConfirmModal from '@/components/common/ConfirmModal';
import Header from '@/components/header/Header';
import MyPageForm from '@/components/myPageForm/MyPageForm';
import { UserContext, UserDispatchContext, useUser } from '@/context/UserProvider';
import { getLocalStorage } from '@/utils/util';

export default function MyPage() {
  const userData = useContext(UserContext);
  const { setUser } = useContext(UserDispatchContext);
  const { checkUser } = useUser();
  const navigate = useNavigate();
  const [loginAlertModal, setLoginAlertModal] = useState(false);

  const onClickGoLoginConfirm = () => {
    navigate('/login');
  };

  useEffect(() => {
    const user = getLocalStorage('user');
    if (!user) {
      checkUser();
      return;
    }
    setUser({ user: JSON.parse(user) });
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
