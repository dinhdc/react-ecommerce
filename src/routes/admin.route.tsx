import { Route, Routes } from 'react-router-dom';
import CategoryPage from '../pages/categories/category.page';
import MainLayout from '../lib/layouts/main/main';
import DiscountPage from '../pages/discount/discount.page';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='' element={<MainLayout />}>
        <Route index element={<CategoryPage />}></Route>
        <Route path='categories' element={<CategoryPage />}></Route>
        <Route path='discounts' element={<DiscountPage />}></Route>
      </Route>
    </Routes>
  );
};
