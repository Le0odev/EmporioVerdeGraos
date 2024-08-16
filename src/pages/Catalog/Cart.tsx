// Cart.tsx
import React from 'react';
import { useCart } from './CartContext';
import {
  CartContainer,
  CartItem,
  CartItemDetails,
  CartItemImage,
  CartItemName,
  CartItemPrice,
  RemoveButton,
  CartItemQuantity
} from './StyledCart'
import { Footer } from '../../components/Footer/Footer';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <>
    <CartContainer>
      <h1>Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        cartItems.map(item => (
          <CartItem key={item.id}>
            <CartItemImage src={item.imageUrl} alt={item.productName} />
            <CartItemDetails>
              <CartItemName>{item.productName}</CartItemName>
              <CartItemPrice>R${item.productPrice.toFixed(2)}</CartItemPrice>
              <CartItemQuantity>Quantidade: {item.quantity}</CartItemQuantity>
              <RemoveButton onClick={() => removeFromCart(item.id)}>Remover</RemoveButton>
            </CartItemDetails>
          </CartItem>
        ))
      )}
    </CartContainer>
    <Footer />
    </>
  );
};

export default Cart;
