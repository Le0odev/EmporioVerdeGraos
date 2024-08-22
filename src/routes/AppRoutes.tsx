import { Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CadastrarProduto from '../pages/ProductCad/CadastrarProduto';
import Sidebar from '../components/Header/Sidebar';
import Login from '../pages/Login/Login';
import CadastrarCategoria from '../pages/CategoryCad/CadastrarCategoria';
import { CriarVenda } from '../pages/PDV/CriarVenda';
import RelatorioVendas from '../pages/Reports/Relatorio';
import Catalog from '../pages/Catalog/Catalog';
import Cart from '../pages/Catalog/Cart';

const AppContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div<{ showSidebar: boolean }>`
  flex: 1;
  padding: 1.5rem;
  background-color: #ccc;
  margin-left: ${(props) => (props.showSidebar ? '250px' : '0')};
  transition: margin-left 0.3s;

  @media (max-width: 768px) {
    padding: 0.6rem;
  }
`;

export const AppRoutes = () => {
  const location = useLocation();
  
  // Defina as rotas onde a sidebar não deve aparecer
  const noSidebarRoutes = ['/catalogo', '/cart'];

  // Exibir a sidebar apenas se a rota atual não estiver na lista de rotas sem sidebar
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <AppContainer>
      {showSidebar && <Sidebar />} {/* Exibe a sidebar com base na condição */}
      <MainContent showSidebar={showSidebar}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
          <Route path="/cadastrar-categoria" element={<CadastrarCategoria />} />
          <Route path="/criar-venda" element={<CriarVenda />} />
          <Route path="/relatorio" element={<RelatorioVendas />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
};
