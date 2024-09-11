import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import HeaderCart from '../../components/Header/HeadrCart/HeaderCart';
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
  CheckoutButton,
  SuggestionContainer,
  SuggestionTitle,
  SuggestionCard,
  SuggestionImage,
  SuggestionDetails,
  SuggestionName,
  SuggestionPrice
} from './StyledCart';
import { useNavigate } from 'react-router-dom';
import { CartItem as CartItemType, Product } from './Product'; // Ajuste o caminho conforme necessário
import axios from 'axios';
import { useAuth } from '../Login/authContext';


const Cart: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.bulk) {
        return total + ((item.productPrice / 1000) * (item.weight || 0));
      } else {
        return total + (item.productPrice * (item.quantity || 0));
      }
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const fetchProducts = async (): Promise<Product[]> => {
    const API_URL = 'https://systemallback-end-production.up.railway.app/products/all';
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}` // Usando o token do contexto
        }
      });
      return response.data; // Ajuste isso conforme a estrutura da resposta da API
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return [];
    }
  };

  const fetchSuggestions = async (cartItems: CartItemType[]): Promise<void> => {
    try {
      const allProducts = await fetchProducts();
      const suggestedProducts = allProducts.filter(product =>
        !cartItems.some(item => item.id === product.id)
      );
      setSuggestions(suggestedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchSuggestions(cartItems);
  }, [cartItems]);

  const handleBackToCatalog = () => {
    navigate('/catalogo');
  };

  const handleGoToFinish = () => {
    if (cartItems.length > 0) {
      navigate('/finalizar-compra');
    } else {
      alert('Seu carrinho está vazio. Adicione itens antes de finalizar a compra.');
    }
  };

  return (
    <>
      <HeaderCart
        showBackButton
        handleBack={handleBackToCatalog}
        handleGoToCart={() => navigate('/cart')}
      />

      <CartContainer>
        <h1>Checkout</h1>
        {cartItems.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          cartItems.map((item: CartItemType) => (
            <CartItem key={item.id}>
              <CartItemImage src={item.imageUrl} alt={item.productName} />
              <CartItemDetails>
                <CartItemName>{item.productName}</CartItemName>
                {item.bulk ? (
                  <>
                    <CartItemPrice>Preço (KG): R${item.productPrice.toFixed(2)}</CartItemPrice>
                    <CartItemWeight>Peso: {item.weight?.toFixed(0)} g</CartItemWeight>
                    <CartItemSubtotal>
                      Subtotal: R${((item.productPrice / 1000) * (item.weight || 0)).toFixed(2)}
                    </CartItemSubtotal>
                  </>
                ) : (
                  <>
                    <CartItemPrice>Preço (UN): R${item.productPrice.toFixed(2)}</CartItemPrice>
                    <CartItemQuantity>Quantidade: {item.quantity}</CartItemQuantity>
                    <CartItemSubtotal>
                      Subtotal: R${(item.productPrice * (item.quantity || 0)).toFixed(2)}
                    </CartItemSubtotal>
                  </>
                )}
                <RemoveButton onClick={() => removeFromCart(item.id)}>Remover</RemoveButton>
              </CartItemDetails>
            </CartItem>
          ))
        )}

        {cartItems.length > 0 && (
          <>
            <CartSummaryContainer>
              <CartSummaryTitle>Resumo da Compra</CartSummaryTitle>
              <CartSummaryItem>
                <span>Subtotal:</span>
                <span>R${subtotal.toFixed(2)}</span>
              </CartSummaryItem>
              <CartSummaryTotal>
                <span>Total:</span>
                <span>R${subtotal.toFixed(2)}</span>
              </CartSummaryTotal>
              <CheckoutButton onClick={handleGoToFinish}>Finalizar Compra</CheckoutButton>
            </CartSummaryContainer>

            <SuggestionContainer>
              <SuggestionTitle>Você também pode gostar</SuggestionTitle>
              {suggestions.map((suggestion: Product) => (
                <SuggestionCard key={suggestion.id}>
                  <SuggestionImage src={suggestion.imageUrl} alt={suggestion.productName} />
                  <SuggestionDetails>
                    <SuggestionName>{suggestion.productName}</SuggestionName>
                    <SuggestionPrice>Preço: R${suggestion.productPrice.toFixed(2)}</SuggestionPrice>
                  </SuggestionDetails>
                </SuggestionCard>
              ))}
            </SuggestionContainer>
          </>
        )}
      </CartContainer>
    </>
  );
};

export default Cart;
