import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import HeaderCart from '../../components/Header/HeadrCart/HeaderCart';
import axios from 'axios';
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
  SuggestedProductsContainer,
  SuggestionTitle,
  
} from './StyledCart';
import { useNavigate } from 'react-router-dom';
import { CartItem as CartItemType, Product } from './Product';
import { useAuth } from '../Login/authContext';
import WeightModalCart from './ModalsCatalog/WeightModalCart';
import SuggestionsCarousel from './SuggestionsCarousel'; // Importando o carrossel

const SUGGESTION_LIMIT = 3;

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  const [weightInput, setWeightInput] = useState<{ [key: string]: number }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.bulk) {
        return total + ((item.productPrice / 1000) * (item.weight || weightInput[item.id] || 0));
      } else {
        return total + (item.productPrice * (item.quantity || 0));
      }
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get('https://systemallback-end-production.up.railway.app/public/products/all');
      const allProducts: Product[] = response.data;
      const suggestedProducts = allProducts.filter((product) => 
        !cartItems.some((item) => item.id === product.id)
      ).slice(0, SUGGESTION_LIMIT);
      setSuggestions(suggestedProducts);
    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
    }
  };

  useEffect(() => {
    fetchSuggestions();

    cartItems.forEach(item => {
      const storedWeight = localStorage.getItem(`weight_${item.id}`);
      if (storedWeight) {
        setWeightInput(prevState => ({
          ...prevState,
          [item.id]: parseFloat(storedWeight)
        }));
      }
    });

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

  const handleAddToCart = (product: Product, flavor?: string) => {
    if (product.bulk) {
      setCurrentProduct(product);
      setIsModalOpen(true);
    } else {
      addToCart({ ...product, selectedFlavor: flavor }); // Incluindo o sabor selecionado
    }
  };

  const handleWeightSubmit = (productId: string, weight: number) => {
    setWeightInput(prevState => ({
      ...prevState,
      [productId]: weight
    }));
    
    localStorage.setItem(`weight_${productId}`, weight.toString());
    
    addToCart({ ...currentProduct!, weight });
    setCurrentProduct(null);
    setIsModalOpen(false);
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
                    <CartItemPrice>Sabor: {item.productName}</CartItemPrice>
                    <CartItemWeight>
                      Peso: {item.weight ? `${item.weight.toFixed(0)} g` : `${weightInput[item.id] ? weightInput[item.id].toFixed(0) + ' g' : 'Não definido'}`}
                    </CartItemWeight>
                    <CartItemSubtotal>
                      Subtotal: R${((item.productPrice / 1000) * (item.weight || weightInput[item.id] || 0)).toFixed(2)}
                    </CartItemSubtotal>
                  </>
                ) : (
                  <>
                    <CartItemPrice>Preço (UN): R${item.productPrice.toFixed(2)}</CartItemPrice>
                    <CartItemPrice>Sabor: {item.selectedFlavor}</CartItemPrice>
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
            <SuggestedProductsContainer>
              <SuggestionTitle>Você também pode gostar</SuggestionTitle>
              <SuggestionsCarousel suggestions={suggestions} onAddToCart={handleAddToCart} />
            </SuggestedProductsContainer>

            <CartSummaryContainer>
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
          </>
        )}
      </CartContainer>

      <WeightModalCart
        productId={currentProduct?.id?.toString() || ''}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleWeightSubmit}
      />
    </>
  );
};

export default Cart;
