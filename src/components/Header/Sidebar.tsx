import React from 'react';
import { AiOutlineAppstore, AiOutlineBook, AiOutlineProduct } from 'react-icons/ai';
import { BiBook } from 'react-icons/bi';
import { CiLogin, CiShoppingCart } from 'react-icons/ci';
import { FaBook, FaBoxes } from 'react-icons/fa';
import { GiArchiveResearch } from 'react-icons/gi';
import { MdLibraryBooks, MdOutlineCategory, MdViewList } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  background: #333;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 250px;
  position: fixed;
  border-radius: 1px  ;

`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
  border-radius: 50%;
`;

const LogoText = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  border-bottom: 1px solid #555;
  padding-bottom: 0.5rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #f7f7f7;
  text-decoration: none;
  margin: 0.5rem 0;
  padding: 0.7rem 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.3s, color 0.3s;

  
  &:hover {
    color: #333;
    background-color: #ccc;
    border-radius: 4px;
  }

  svg {
    margin-right: 0.7rem;
    font-size: 1.5rem;
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoImage src="/src/assets/logo.png" alt="Company Logo" />
        <LogoText>Verde Grãos</LogoText>
      </LogoContainer>
      <NavLink to="/login">
        <CiLogin /> Login
      </NavLink>
      <NavLink to="/cadastrar-produto">
        <AiOutlineProduct /> Cadastrar Produto
      </NavLink>
      <NavLink to="/cadastrar-categoria">
        <MdOutlineCategory /> Cadastrar Categoria
      </NavLink>
      <NavLink to="/criar-venda">
        <CiShoppingCart /> Criar Venda
      </NavLink>
      <NavLink to="/relatorio">
        <TbReportMoney /> Relatório
      </NavLink>
      <NavLink to="/catalogo">
      <MdViewList /> Catálogo    
      </NavLink>
    </SidebarContainer>
  );
};

export default Sidebar;
