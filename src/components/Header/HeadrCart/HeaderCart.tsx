
import React from 'react';
import { Header, LogoImage, Title, IconButton, BackButton } from './StyledHeader'; // Certifique-se de ter os estilos adequados
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../../pages/Catalog/CartContext'; // Certifique-se de que o caminho está correto



interface HeaderCartProps {
  handleGoToCart: () => void;
  showBackButton?: boolean;
  handleBack?: () => void;
}

const HeaderCart: React.FC<HeaderCartProps> = ({ handleGoToCart, showBackButton = false, handleBack }) => {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Header>
      {showBackButton && handleBack && (
        <BackButton onClick={handleBack}>
          <FiArrowLeft />
        </BackButton>
      )}
      <LogoImage src="/src/assets/logo.png" alt="Company Logo" />
      <Title>Empório Verde Grãos</Title>
      <IconButton onClick={handleGoToCart}>
        <FiShoppingCart />
        {itemCount > 0 && <span>{itemCount}</span>}
      </IconButton>
    </Header>
  );
};

export default HeaderCart;
