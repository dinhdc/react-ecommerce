import { LOCAL_STORAGE_KEYS } from '../constants';
import { IUserDto } from '../interfaces';
import { getLocalStorage } from './storage';

export const getCurrentProfile = (): IUserDto | null => {
  const profile: IUserDto | null = getLocalStorage(
    LOCAL_STORAGE_KEYS.PROFILE,
    true
  );
  return profile;
};
