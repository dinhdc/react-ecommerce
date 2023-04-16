import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { LOCAL_STORAGE_KEYS } from '../../../constants';
import { storage } from '../../../utils';

/**
 * Axios without `access-token`
 */
export const apiClientWithoutAuth = axios;

/**
 * Axios instance with `access-token` header injected
 */

export const apiClientWithAuth = axios.create();

apiClientWithAuth.interceptors.request.use(
  function (config) {
    const token = storage.get(LOCAL_STORAGE_KEYS.ACCESS, true);
    if (token) {
      config.headers['Authorization'] = `JWT ${token}`;
      // config.headers["Content-Type"] = "application/json";
      config.headers['accept'] = 'application/json';
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClientWithAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
