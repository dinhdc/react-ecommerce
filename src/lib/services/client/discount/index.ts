import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CACHE_KEYS } from '../../../constants';
import {
  createCategory,
  createDiscount,
  updateCategoryAPI,
  updateDiscount,
} from '../../server';
import { ICreateCategory, IDiscountRequest } from '../../../interfaces';
import { getDiscountList } from './process';

export const useGetListDiscount = () => {
  return useQuery([CACHE_KEYS.DiscountList], () => getDiscountList(), {
    keepPreviousData: true,
    refetchIntervalInBackground: false,
    refetchInterval: false,
  });
};

export const useCreateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation((discount: IDiscountRequest) => createDiscount(discount), {
    onSuccess: () => queryClient.invalidateQueries([CACHE_KEYS.DiscountList]),
  });
};

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: { id: number; discount: IDiscountRequest }) => {
      return updateDiscount(data.id, data.discount);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([CACHE_KEYS.DiscountList]);
      },
    }
  );
};
