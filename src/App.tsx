import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ProtectedRoute, AdminRoutes } from './routes';
import LoginPage from './pages/auth/login.page';
import { Provider as AlertProvider } from 'react-alert';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { BackgroundAlert } from './lib';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  const AlertTemplate = ({ style, options, message, close }: any) => (
    <div
      style={{
        ...style,
        padding: '5px 8px',
        border: `1px solid ${
          options.type === 'success'
            ? BackgroundAlert.SUCCESS
            : BackgroundAlert.ERROR
        }`,
      }}
    >
      {message}
      <Button variant='text' onClick={close}>
        <CloseIcon color={options.type}></CloseIcon>
      </Button>
    </div>
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider template={AlertTemplate}>
        <Router>
          <Routes>
            <Route path='login' element={<LoginPage />} />
          </Routes>
          <ProtectedRoute>
            <AdminRoutes></AdminRoutes>
          </ProtectedRoute>
        </Router>
      </AlertProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
