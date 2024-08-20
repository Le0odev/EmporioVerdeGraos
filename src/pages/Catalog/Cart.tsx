

import React from 'react';
import { useCart } from './CartContext';
import HeaderCart from '../../components/Header/HeadrCart/HeaderCart'
import {
  CartContainer,
  CartItem,
  CartItemDetails,
  CartItemImage,
  CartItemName,
  CartItemPrice,
  RemoveButton,
  CartItemQuantity,
  CartItemWeight,
  CartItemSubtotal,
  CartSummaryContainer,
  CartSummaryTitle,
  CartSummaryItem,
  CartSummaryTotal,
  CheckoutButton
} from './StyledCart';
import { Footer } from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Calcula o subtotal e o total do carrinho
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.bulk) {
        return total + ((item.productPrice / 1000) * item.weight!);
      } else {
        return total + (item.productPrice * (item.quantity || 0));
      }
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const handleBackToCatalog = () => {
    navigate('/catalogo');
  };

  const handleGoToCart = () => {
    // Não faz sentido aqui, mas poderia ser usado para outra navegação se necessário
  };

  return (
    <>
      <CartContainer>
        <HeaderCart
          showBackButton
          handleBack={handleBackToCatalog}
          handleGoToCart={handleGoToCart}
        />
        <h1>Carrinho</h1>
        {cartItems.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          cartItems.map(item => (
            <CartItem key={item.id}>
              <CartItemImage src={item.imageUrl} alt={item.productName} />
              <CartItemDetails>
                <CartItemName>{item.productName}</CartItemName>
                {item.bulk ? (
                  <>
                    <CartItemPrice>Preço (KG): R${item.productPrice.toFixed(2)}</CartItemPrice>
                    <CartItemWeight>Peso: {item.weight?.toFixed(0)} g</CartItemWeight>
                    <CartItemSubtotal>
                      Subtotal: R${((item.productPrice / 1000) * item.weight!).toFixed(2)}
                    </CartItemSubtotal>
                  </>
                ) : (
                  <>
                    <CartItemPrice>Preço (UN): R${item.productPrice.toFixed(2)}</CartItemPrice>
                    <CartItemQuantity>Quantidade: {item.quantity}</CartItemQuantity>
                    <CartItemSubtotal>
                      Subtotal: R${(item.productPrice * item.quantity!).toFixed(2)}
                    </CartItemSubtotal>
                  </>
                )}
                <RemoveButton onClick={() => removeFromCart(item.id)}>Remover</RemoveButton>
              </CartItemDetails>
            </CartItem>
          ))
          
        )}
        <CartSummaryContainer>
              <CartSummaryTitle>Resumo do Carrinho</CartSummaryTitle>
              <CartSummaryItem>
                <span>Subtotal:</span>
                <span>R${subtotal.toFixed(2)}</span>
              </CartSummaryItem>
              {/* Adicione mais itens de resumo se necessário */}
              <CartSummaryTotal>
                Total: R${subtotal.toFixed(2)}
              </CartSummaryTotal>
              <CheckoutButton>Finalizar Compra</CheckoutButton>
            </CartSummaryContainer>
      </CartContainer>
      <Footer />
    </>
  );
};

export default Cart;
