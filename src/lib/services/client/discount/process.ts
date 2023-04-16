import { getDiscounts } from '../../server';

export const getDiscountList = async () => {
  const response = await getDiscounts();
  if (response.status === 200) {
    return response.data.data;
  }
  return [];
};
