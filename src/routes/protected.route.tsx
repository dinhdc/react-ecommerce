import { Route, useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../lib/constants';
import { useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { IProfile } from '../lib/interfaces';
import { getCurrentProfile, storage } from '../lib';
import { getMyProfile } from '../lib/services/server/auth/auth.service';

export const ProtectedRoute = ({ ...props }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = storage.get(LOCAL_STORAGE_KEYS.ACCESS, true);
    if (!accessToken) {
      navigate('/login');
    }
    const profile = getCurrentProfile();
    // if (profile?.id) {
    //   storage.save(LOCAL_STORAGE_KEYS.USER_ID, profile?.id);
    // }
    if (!profile) {
      getMyProfile().then((response: AxiosResponse<IProfile>) => {
        const profile = response.data.data;
        storage.save(LOCAL_STORAGE_KEYS.PROFILE, profile);
      });
    }
  }, []);

  return props.children;
};
