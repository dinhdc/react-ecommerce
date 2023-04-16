import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CACHE_KEYS } from '../../../constants';
import { createCategory, updateCategoryAPI } from '../../server';
import { ICreateCategory } from '../../../interfaces';
import { getCategoryList } from './process';

export const useGetListCategory = () => {
  return useQuery([CACHE_KEYS.CategoryList], () => getCategoryList(), {
    keepPreviousData: true,
    refetchIntervalInBackground: false,
    refetchInterval: false,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((category: ICreateCategory) => createCategory(category), {
    onSuccess: () => queryClient.invalidateQueries([CACHE_KEYS.CategoryList]),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: { id: number; category: ICreateCategory }) => {
      return updateCategoryAPI(data.id, data.category);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([CACHE_KEYS.CategoryList]);
      },
    }
  );
};
