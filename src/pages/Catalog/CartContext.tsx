import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from './Product';

// Define a interface CartItem que extende Product e inclui campos adicionais
interface CartItem extends Product {
  productId: number; // ID do produto, deve ser um número
  quantity?: number; // Quantidade para produtos não a granel
  weight?: number; // Peso em gramas para produtos a granel
  productQuantity: number; // Quantidade específica do produto
  estoquePeso: number; // Peso em estoque
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, weight?: number) => void;
  removeFromCart: (productId: number) => void;
  getCartItemCount: () => number;
  clearCart: () => void; // Adicione a definição de clearCart aqui
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, weight?: number) => {
    setCartItems(prevItems => {
      const itemIndex = prevItems.findIndex(item => item.id === product.id);

      if (itemIndex >= 0) {
        // Item já existe no carrinho
        const updatedItems = [...prevItems];
        if (product.bulk) {
          // Produto a granel
          updatedItems[itemIndex] = { 
            ...updatedItems[itemIndex], 
            weight: weight ?? updatedItems[itemIndex].weight 
          } as CartItem;
        } else {
          // Produto unitário
          updatedItems[itemIndex] = { 
            ...updatedItems[itemIndex], 
            quantity: (updatedItems[itemIndex].quantity || 0) + 1 
          } as CartItem;
        }
        return updatedItems;
      }

      // Novo item no carrinho
      return [...prevItems, { 
        ...product, 
        weight, 
        quantity: product.bulk ? undefined : 1,
        productId: product.id, // Certifique-se de que todas as propriedades sejam definidas
        productQuantity: product.productQuantity || 1,
        estoquePeso: product.estoquePeso || 0
      } as CartItem];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const clearCart = () => {
    setCartItems([]); // Limpa o carrinho de compras
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartItemCount, clearCart }}>
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
