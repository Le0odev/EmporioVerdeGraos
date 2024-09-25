import React from 'react';
import { Header, LogoImage, Title, IconButton, BackButton } from './StyledHeader';
import {  FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../../pages/Catalog/CartContext'; 
import { useLocation } from 'react-router-dom'; // Importa o useLocation para pegar a rota atual
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdAddShoppingCart, MdArrowLeft, MdShoppingCart, MdShoppingCartCheckout } from 'react-icons/md';
import { FaShoppingBag, FaShoppingBasket } from 'react-icons/fa';

interface HeaderCartProps {
  handleGoToCart?: () => void;
  showBackButton?: boolean;
  handleBack?: () => void;
}

const HeaderCart: React.FC<HeaderCartProps> = ({ handleGoToCart, showBackButton = false, handleBack }) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();
  const location = useLocation(); // Pega a rota atual

  // Condiciona a exibição da logo apenas no catálogo
  const showLogo = location.pathname === '/catalogo' &&  '/finalizar-compra'; // Ajusta conforme sua rota do catálogo

  return (
    <Header>
      {showBackButton && handleBack && (
        <BackButton onClick={handleBack}>
          <FaArrowLeftLong />
        </BackButton>
      )}
      {showLogo && (
        <LogoImage src="data:image/jpeg;base64,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" alt="Company Logo" />
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
