// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  
`;

const NavLink = styled(Link)`
  font: 15px;
  font-size:  1rem;
  color: #f7f7f7f7;
  margin: 1rem;
  text-decoration: none;
  font-weight: bold;
  

  &:hover {
    color: #333;
    background-color: #ccc;
    border-radius: 8px;
    padding: 8px;
    margin: 8px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width:50px;
  margin-right: 0.8rem;
  border-radius: 50px;
`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header: React.FC = () => {
  return (
    <Nav>
      <LogoContainer>
        <LogoImage src="/src/assets/logo2.jpg" alt="Company Logo" />
        <LogoText>Dashboard</LogoText>
       
      </LogoContainer>
      <NavLinksContainer>
        <NavLink to="/cadastrar-produto">Cadastrar Produto</NavLink>
        <NavLink to="/cadastrar-categoria">Cadastrar Categoria</NavLink>
        <NavLink to="/criar-venda">Criar Venda</NavLink>
        <NavLink to="/relatorio">Relatório</NavLink>
      </NavLinksContainer>
    </Nav>
  );
};

export default Header;
