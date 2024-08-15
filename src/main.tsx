import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './pages/Login/authContext'; // Certifique-se de que o caminho está correto
import { CartProvider } from './pages/Catalog/CartContext';


const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider> {/* Adiciona o CartProvider aqui */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
