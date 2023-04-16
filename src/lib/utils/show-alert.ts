import { AlertOptions } from 'react-alert';

export const showAlert = (alert: any, message: string, options?: AlertOptions) => {
  alert.show(message, {...options, timeout: 3000});
};
