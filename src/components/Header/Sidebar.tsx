import React, { useState } from 'react';
import { AiOutlineProduct } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { MdAddShoppingCart, MdOutlineCategory, MdProductionQuantityLimits, MdViewList } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FiMenu, FiX } from 'react-icons/fi';

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
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  z-index: 1001; // Para garantir que o sidebar fique acima do overlay

  // Comportamento em telas grandes
  @media (min-width: 769px) {
    transform: translateX(0); // Sempre visível
  }

  // Comportamento em telas pequenas
  @media (max-width: 768px) {
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    box-shadow: ${({ isOpen }) => (isOpen ? '0 0 10px rgba(0,0,0,0.5)' : 'none')};
  }
`;

// Sobreposição para o fundo
const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  z-index: 1000; // Para garantir que a sobreposição fique abaixo do sidebar
`;

// Ícone de menu (três linhas) e ícone de fechar (X)
const MenuIcon = styled(FiMenu)`
  font-size: 2rem;
  color: #99999;
  position: fixed;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 1002;

  @media (min-width: 769px) {
    display: none; // Esconde o ícone de menu em telas grandes
  }
`;

const CloseIcon = styled(FiX)`
  font-size: 2rem;
  color: white;
  position: fixed;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 1002;

  @media (min-width: 769px) {
    display: none; // Esconde o ícone de fechar em telas grandes
  }
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

  return (
    <>
      {/* Sobreposição que aparece quando o sidebar está aberto */}
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      {/* Ícone de menu, só aparece em telas pequenas */}
      {!isOpen && <MenuIcon aria-label="Open sidebar" onClick={() => setIsOpen(true)} />}
      {/* Ícone de fechar, só aparece quando o sidebar está aberto */}
      {isOpen && <CloseIcon aria-label="Close sidebar" onClick={() => setIsOpen(false)} />}

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
