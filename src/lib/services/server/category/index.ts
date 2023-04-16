import { apiClientWithoutAuth } from '../config';
import {
  ICategory,
  ICategoryResponse,
  ICommonResponse,
  ICreateCategory,
} from '../../../interfaces';

const URL = import.meta.env.VITE_BACKEND_URL;

export interface ICategorySingle extends ICommonResponse<ICategory> {}

export const getCategories = () => {
  return apiClientWithoutAuth.get<ICategoryResponse>(`${URL}/categories`);
};

export const getCategory = (id: number) => {
  return apiClientWithoutAuth.get<ICategorySingle>(`${URL}/categories/${id}`);
};

export const updateCategoryAPI = (id: number, data: ICreateCategory) => {
  return apiClientWithoutAuth.patch<ICreateCategory, ICategoryResponse>(
    `${URL}/categories/${id}`,
    data
  );
};

export const createCategory = (data: ICreateCategory) => {
  return apiClientWithoutAuth.post<ICreateCategory, ICategoryResponse>(
    `${URL}/categories`,
    data
  );
};
