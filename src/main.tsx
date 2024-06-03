import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './pages/Login/authContext'; // Certifique-se de que o caminho está correto

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
