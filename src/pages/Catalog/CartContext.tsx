import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from './Product';

interface CartItem extends Product {
  quantity?: number; // Quantidade para produtos não a granel
  weight?: number; // Peso em gramas para produtos a granel
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, weight?: number) => void;
  removeFromCart: (productId: number) => void;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, weight?: number) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === product.id);
      if (itemIndex >= 0) {
        const updatedItems = [...prevItems];
        if (product.bulk) {
          updatedItems[itemIndex] = { ...updatedItems[itemIndex], weight };
        } else {
          updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity: (updatedItems[itemIndex].quantity || 0) + 1 };
        }
        return updatedItems;
      }

      return [...prevItems, { ...product, weight, quantity: product.bulk ? undefined : 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
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
