import React, { useState } from 'react';
import { AiOutlineProduct } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { MdAddShoppingCart, MdOutlineCategory, MdProductionQuantityLimits, MdViewList } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MobileHeader from './HeaderApp/MobileHeader';

// Container do Sidebar
const SidebarContainer = styled.nav<{ isOpen: boolean }>`
  background: #333;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 250px;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1001;

  @media (min-width: 769px) {
    transform: translateX(0); // Sidebar sempre visível em telas grandes
  }

  @media (max-width: 768px) {
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

// Overlay que aparece quando o menu está aberto no mobile
const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  margin-bottom: 0.5rem;
  border-radius: 50%;
`;

const LogoText = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
  border-bottom: 1px solid #555;
  padding-bottom: 0.5rem;
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #f7f7f7;
  text-decoration: none;
  margin: 0.60rem 0;
  padding: 0.50rem 1rem;
  width: 100%;
  background-color: ${({ isActive }) => (isActive ? '#ccc' : 'transparent')};
  color: ${({ isActive }) => (isActive ? '#333' : '#f7f7f7')};
  border-radius: 3px;

  &:hover {
    color: #333;
    background-color: #ccc;
  }

  svg {
    margin-right: 0.7rem;
    font-size: 1.5rem;
  }
`;

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Função para alternar o menu
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>

      <MobileHeader toggleMenu={toggleMenu} />


      {/* Sobreposição que aparece quando o sidebar está aberto */}
      <Overlay isOpen={isOpen} onClick={toggleMenu} />

      {/* Sidebar que é sempre visível em telas grandes e colapsável em telas pequenas */}
      <SidebarContainer isOpen={isOpen}>
        <LogoContainer>
          <LogoImage src="/src/assets/logo.png" alt="Company Logo" />
          <LogoText>Verde Grãos</LogoText>
        </LogoContainer>

        <NavLink to="/login" isActive={location.pathname === '/login'}>
          <CiLogin /> Login
        </NavLink>
        <NavLink to="/cadastrar-produto" isActive={location.pathname === '/cadastrar-produto'}>
          <AiOutlineProduct /> Cadastrar Produto
        </NavLink>
        <NavLink to="/cadastrar-categoria" isActive={location.pathname === '/cadastrar-categoria'}>
          <MdOutlineCategory /> Cadastrar Categoria
        </NavLink>
        <NavLink to="/criar-venda" isActive={location.pathname === '/criar-venda'}>
          <MdAddShoppingCart /> Criar Venda
        </NavLink>
        <NavLink to="/relatorio" isActive={location.pathname === '/relatorio'}>
          <TbReportMoney /> Relatório
        </NavLink>
        <NavLink to="/lista-pedidos" isActive={location.pathname === '/lista-pedidos'}>
          <MdProductionQuantityLimits /> Lista de compras
        </NavLink>
        <NavLink to="/catalogo" isActive={location.pathname === '/catalogo'}>
          <MdViewList /> Catálogo
        </NavLink>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
