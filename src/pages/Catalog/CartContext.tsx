// src/context/CartContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from './Product'; // Ajuste o caminho se necessário

interface CartItem extends Product {
  quantity: number; // A quantidade para o carrinho
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex(item => item.id === product.id);
      if (itemIndex >= 0) {
        // Se o item já está no carrinho, atualize a quantidade
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += product.quantidade ?? 1; // Incrementa a quantidade
        return updatedItems;
      }
      // Se o item não está no carrinho, adicione o novo item com a quantidade inicial
      return [...prevItems, { ...product, quantity: product.quantidade ?? 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
