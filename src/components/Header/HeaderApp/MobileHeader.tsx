import React from 'react';
import { FiMenu } from 'react-icons/fi';
import styled from 'styled-components';

// Estilização do cabeçalho mobile
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;

  @media (min-width: 769px) {
    display: none; // Esconder o cabeçalho em telas grandes
  }
`;

// Estilização do ícone de menu
const MenuIcon = styled(FiMenu)`
  font-size: 2rem;
  cursor: pointer;
`;

// Interface para definir os tipos das props do MobileHeader
interface MobileHeaderProps {
  toggleMenu: () => void; // Definir o tipo de toggleMenu explicitamente
}

// Componente MobileHeader
const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleMenu }) => {
  return (
    <HeaderContainer>
      <MenuIcon onClick={toggleMenu} /> {/* Ícone que abre o menu */}
      <div>Verde Grãos</div> {/* Logo ou título da aplicação */}
    </HeaderContainer>
  );
};

export default MobileHeader;
