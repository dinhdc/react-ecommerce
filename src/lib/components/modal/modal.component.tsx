import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';

import {
  Wrapper,
  Header,
  StyledModal,
  HeaderText,
  CloseButton,
  Content,
  Backdrop,
} from './modal.style';
import { ConfirmationModal } from './confirm-modal.component';

export interface ModalProps {
  isOpen: boolean;
  hide: () => void;
  children: React.ReactNode;
  headerText: string;
}

const childrenDeault = (
  <ConfirmationModal
    onConfirm={() => {
      console.log('confirm');
    }}
    onCancel={() => {
      console.log('cancle');
    }}
    message='Are you sure you want to delete element?'
  />
);

export const ModalGlobal: FunctionComponent<ModalProps> = ({
  isOpen,
  hide,
  children,
  headerText,
}) => {
  const modal = (
    <React.Fragment>
      <Backdrop />
      <Wrapper>
        <StyledModal>
          <Header>
            <HeaderText>{headerText}</HeaderText>
            <CloseButton onClick={hide}>
              <CloseIcon></CloseIcon>
            </CloseButton>
          </Header>
          <Content>{children}</Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  );

  return isOpen ? ReactDOM.createPortal(modal, document.body) : null;
};
