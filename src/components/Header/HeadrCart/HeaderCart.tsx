import React from 'react';
import { Header, LogoImage, Title, IconButton, BackButton } from './StyledHeader';
import {  FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../../pages/Catalog/CartContext'; 
import { useLocation } from 'react-router-dom'; // Importa o useLocation para pegar a rota atual
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdAddShoppingCart, MdArrowLeft, MdShoppingCart, MdShoppingCartCheckout } from 'react-icons/md';
import { FaShoppingBag, FaShoppingBasket } from 'react-icons/fa';

interface HeaderCartProps {
  handleGoToCart: () => void;
  showBackButton?: boolean;
  handleBack?: () => void;
}

const HeaderCart: React.FC<HeaderCartProps> = ({ handleGoToCart, showBackButton = false, handleBack }) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();
  const location = useLocation(); // Pega a rota atual

  // Condiciona a exibição da logo apenas no catálogo
  const showLogo = location.pathname === '/catalogo'; // Ajusta conforme sua rota do catálogo

  return (
    <Header>
      {showBackButton && handleBack && (
        <BackButton onClick={handleBack}>
          <FaArrowLeftLong />
        </BackButton>
      )}
      {showLogo && (
        <LogoImage src="/src/assets/logo.png" alt="Company Logo" />
      )}
      <Title>Empório Verde Grãos</Title>
      <IconButton onClick={handleGoToCart}>
        <FaShoppingBag />
        {itemCount > 0 && <span>{itemCount}</span>}
      </IconButton>
    </Header>
  );
};

export default HeaderCart;
