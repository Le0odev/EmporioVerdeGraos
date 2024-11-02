import { Route, Routes, useLocation } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import CadastrarProduto from '../pages/ProductCad/CadastrarProduto';
import Login from '../pages/Login/Login';
import CadastrarCategoria from '../pages/CategoryCad/CadastrarCategoria';
import { CriarVenda } from '../pages/PDV/CriarVenda';
import RelatorioVendas from '../pages/Reports/Relatorio';
import Catalog from '../pages/Catalog/Catalog';
import Cart from '../pages/Catalog/Cart';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ListaDeProdutos from '../components/Notifies/ListaProdutos';
import ListaProdutosGerenciamento from '../components/Notifies/GerenciarProdutos/ListaProdutosGerenciamento';
import EnviarPedido from '../components/Notifies/EnviarPedido/EnviarPedido';
import { Footer } from '../components/Footer/Footer';
import Sidebar from '../components/Header/Sidebar';
import { useState, useEffect } from 'react';
import FinalizarCompra from '../pages/Catalog/FinalizarCompra';
import PIX from 'react-qrcode-pix';
import SuccessPage from '../pages/Catalog/Sucess';
import Dashboard from '../pages/Homes/AdminHome';

declare const H: any;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div<{ showSidebar: boolean }>`
  flex: 1;
  padding: 1.5rem;
  background-color: #ccc;
  margin-left: ${(props) => (props.showSidebar ? '250px' : '0')};
  transition: margin-left 0.3s;

  @media (max-width: 768px) {
    padding: 0;
    margin-left: 0;
  }
`;

const ClearToastsButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 15px;
  background-color: #ff3333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

export const AppRoutes = () => {
  const location = useLocation();
  const [hasToasts, setHasToasts] = useState(false);

  const noSidebarRoutes = ['/catalogo', '/cart', '/finalizar-compra', '/sucess'];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  const handleClearAllToasts = () => {
    toast.dismiss();
    setHasToasts(false); // Define hasToasts como false após limpar as notificações
  };

  useEffect(() => {
    const showToastListener = () => setHasToasts(true);
    const hideToastListener = () => {
     // @ts-ignore
      if (toast.isActive()) {
        setHasToasts(true);
      } else {
        setHasToasts(false);
      }
    };

    // Adiciona eventos de monitoramento
    toast.onChange((data) => {
      if (data.status === 'added') showToastListener();
      else if (data.status === 'removed') hideToastListener();
    });

    return () => {
      toast.onChange(() => {}); // Passa uma função vazia para remover o listener
    };
  }, []);

  return (
    <AppContainer>
      {showSidebar && <Sidebar />}
      <MainContent showSidebar={showSidebar}>

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin-home' element={<Dashboard />} />
          <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
          <Route path="/cadastrar-categoria" element={<CadastrarCategoria />} />
          <Route path="/criar-venda" element={<CriarVenda />} />
          <Route path="/relatorio" element={<RelatorioVendas />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/finalizar-compra" element={<FinalizarCompra />} />
          <Route path="/sucess" element={<SuccessPage />} />
          <Route path="/lista-pedidos" element={<ListaProdutosGerenciamento />} />
          <Route path="/lista-pedidos/enviar-pedido" element={<EnviarPedido />} />
        </Routes>

        <ListaDeProdutos />
        <ToastContainer />
        
        {/* Botão para limpar todos os toasts, exibido apenas se houver notificações */}
        {hasToasts && (
          <ClearToastsButton onClick={handleClearAllToasts}>
            Limpar Todos
          </ClearToastsButton>
        )}
      </MainContent>
      <Footer />
    </AppContainer>
  );
};
