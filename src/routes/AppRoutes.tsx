
import { Route, Routes } from 'react-router-dom';


import styled from 'styled-components';
import CadastrarProduto from '../pages/ProductCad/CadastrarProduto';
import Sidebar from '../components/Header/Sidebar';
import Login from '../pages/Login/Login';
import CadastrarCategoria from '../pages/CategoryCad/CadastrarCategoria';
import { CriarVenda } from '../pages/PDV/CriarVenda';





const AppContainer = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 250px; /* Matches the width of the Sidebar */
  background-color: #ccc;
`;

export const AppRoutes = () => {
  return (
    <>
    
      <AppContainer>
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
            <Route path="/cadastrar-categoria" element={<CadastrarCategoria />} />
            <Route path="/criar-venda" element={<CriarVenda />} />
            <Route path="/relatorio" element={<CadastrarProduto />} />
            
          </Routes>
        </MainContent>
      </AppContainer>
    </>
  );
};
