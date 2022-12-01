import React from 'react';
import styled from 'styled-components';

import { S_Button, S_CyanButton } from '@/components/commonStyled/styleButtons';
import { DimLayerStyle } from '@/style/common';
import palette from '@/style/palette';

export default function ConfirmModal({
  visible,
  title,
  description,
  confirmText = '확인',
  cancelText,
  onConfirm,
  onCancel,
}) {
  if (!visible) return null;
  return (
    <S_DimLayer>
      <S_ConfirmModal>
        <S_Title>{title}</S_Title>
        <S_Description>{description}</S_Description>
        <S_Container>
          {cancelText && (
            <S_Button size={'medium'} onClick={onCancel}>
              {cancelText}
            </S_Button>
          )}
          <S_CyanButton size={'medium'} onClick={onConfirm}>
            {confirmText}
          </S_CyanButton>
        </S_Container>
      </S_ConfirmModal>
    </S_DimLayer>
  );
}

const S_DimLayer = styled.div`
  ${DimLayerStyle}
`;

const S_ConfirmModal = styled.div`
  width: 320px;
  height: 140px;
  background: ${palette.gray[6]};
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0/125);
  > *:not(:last-child) {
    margin-bottom: 1.5rem;
  }
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
`;

const S_Title = styled.h2`
  text-align: center;
  font-size: 3rem;
`;

const S_Description = styled.p`
  text-align: center;
  font-size: 1.4rem;
`;

const S_Container = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({})}
  > *:not(:last-child) {
    margin-right: 1.5rem;
  }
`;
