import React, { FunctionComponent } from 'react';
import {
  ConfirmationButtons,
  Message,
  YesButton,
  NoButton,
} from './confirm-modal.style';
import { Button } from '@mui/material';

interface ConfirmationModalProps {
  onConfirm: (body?: any) => void;
  onCancel: () => void;
  message?: string;
  cancelText?: string;
  confirmText?: string;
}

export const ConfirmationModal: FunctionComponent<ConfirmationModalProps> = (
  props
) => {
  return (
    <React.Fragment>
      {props.message && <Message>{props.message}</Message>}
      <ConfirmationButtons>
        <Button onClick={props.onCancel} variant='outlined'>
          {props.cancelText || 'Cancel'}
        </Button>
        <Button onClick={props.onConfirm} variant='contained'>
          {props.confirmText || 'Create'}
        </Button>
      </ConfirmationButtons>
    </React.Fragment>
  );
};
