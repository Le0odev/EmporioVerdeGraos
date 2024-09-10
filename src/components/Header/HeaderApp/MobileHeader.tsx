import React from 'react';
import { FiMenu } from 'react-icons/fi';
import styled from 'styled-components';

// Estilização do cabeçalho mobile
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem; 
  background-color: #444; 
  border-radius: 2px; 
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Adicionado sombreamento para um efeito de profundidade */

  @media (min-width: 769px) {
    display: none; // Esconder o cabeçalho em telas grandes
  }
`;

// Container para a logo e título alinhados à direita
const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* Espaçamento entre a logo e o título */
`;

const LogoImage = styled.img`
  width: 2.5rem; /* Tamanho ajustado para ser um pouco menor */
  height: auto;
  object-fit: contain;
  border-radius: 50%; /* Logo circular */
  border: 2px solid white; /* Borda branca para destacar a logo */
`;

const Title = styled.div`
  font-size: 1rem; /* Tamanho do texto ajustado */
  font-weight: bold; /* Texto em negrito para mais destaque */
  color: white;
`;

const MenuIcon = styled(FiMenu)`
  font-size: 1.8rem; /* Tamanho do ícone ajustado */
  cursor: pointer;
  transition: color 0.3s; /* Transição suave para a cor ao passar o mouse */
  
  &:hover {
    color: #ddd; /* Cor do ícone muda ao passar o mouse */
  }
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
      <RightContainer>
        <LogoImage src="/src/assets/logo.png" alt="Company Logo" />
        <Title>Verde Grãos</Title> {/* Logo ou título da aplicação */}
      </RightContainer>
    </HeaderContainer>
  );
};

export default MobileHeader;
