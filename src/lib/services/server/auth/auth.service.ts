import { apiClientWithAuth, apiClientWithoutAuth } from '../config';
import { ILoginResponse, IProfile } from '../../../interfaces';

const URL = import.meta.env.VITE_BACKEND_URL;
export const login = (username: string, password: string) => {
  return apiClientWithoutAuth.post<ILoginResponse>(`${URL}/auth/signin`, {
    username,
    password,
  });
};

export const getMyProfile = () => {
  return apiClientWithAuth.get<IProfile>(`${URL}/auth/me`);
};
