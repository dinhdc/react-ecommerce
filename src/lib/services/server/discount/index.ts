import { apiClientWithoutAuth } from '../config';
import {
  IDiscountListResponse,
  IDiscountRequest,
  IDiscountSingleResponse,
} from '../../../interfaces';

const URL = `${import.meta.env.VITE_BACKEND_URL}/discount`;

export const getDiscounts = () => {
  return apiClientWithoutAuth.get<IDiscountListResponse>(`${URL}`);
};

export const getDiscount = (id: number) => {
  return apiClientWithoutAuth.get<IDiscountSingleResponse>(`${URL}/${id}`);
};

export const updateDiscount = (id: number, data: IDiscountRequest) => {
  return apiClientWithoutAuth.patch<IDiscountRequest, IDiscountSingleResponse>(
    `${URL}/${id}`,
    data
  );
};

export const createDiscount = (data: IDiscountRequest) => {
  return apiClientWithoutAuth.post<IDiscountRequest, IDiscountSingleResponse>(
    `${URL}`,
    data
  );
};
