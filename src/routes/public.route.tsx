import { Route } from 'react-router-dom';
import LoginPage from '../pages/auth/login.page';

export const PublicRoute = () => {
  return <Route path='login' element={<LoginPage></LoginPage>} />;
};
