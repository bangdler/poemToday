import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ConfirmModal from '@/components/common/ConfirmModal';
import Header from '@/components/header/Header';
import EditForm from '@/components/writeForm/EditForm';
import { UserContext, useUser } from '@/context/UserProvider';

export default function Edit() {
  const userData = useContext(UserContext);
  const { checkUser } = useUser();
  const navigate = useNavigate();
  const { username } = useParams();
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

  useEffect(() => {
    if (userData.user && username !== userData.user.username) {
      setLoginAlertModal(true);
    }
  }, [userData.user]);

  return (
    <>
      <Header />
      <EditForm />
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
