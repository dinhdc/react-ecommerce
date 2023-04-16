import { getCategories } from '../../server';

export const getCategoryList = async () => {
  const response = await getCategories();
  if (response.status === 200) {
    return response.data.data;
  }
  return [];
};
