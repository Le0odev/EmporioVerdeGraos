// Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  background: #333;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  width: 250px;
  position: fixed;
`;

const NavLink = styled(Link)`
  font-size: 1rem;
  color: #f7f7f7;
  margin: 0.5rem 0;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    color: #333;
    background-color: #ccc;
    border-radius: 4px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const LogoImage = styled.img`
  width: 50px;
  margin-right: 0.8rem;
  border-radius: 50px;
`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoImage src="/src/assets/logo2.jpg" alt="Company Logo" />
        <LogoText>Dashboard</LogoText>
      </LogoContainer>
      <NavLink to="/login">Login</NavLink> {/* Adicionando o link para a página de login */}
      <NavLink to="/login" >-------------------------------</NavLink>
      <NavLink to="/cadastrar-produto">Cadastrar Produto</NavLink>
      <NavLink to="/cadastrar-categoria">Cadastrar Categoria</NavLink>
      <NavLink to="/criar-venda">Criar Venda</NavLink>
      <NavLink to="/relatorio">Relatório</NavLink>
      
    </SidebarContainer>
  );
};

export default Sidebar;
