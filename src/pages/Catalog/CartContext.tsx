import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from './Product';

// Define a interface CartItem que extende Product e inclui campos adicionais
interface CartItem extends Product {
  productId: number; // ID do produto, deve ser um número
  quantity?: number; // Quantidade para produtos não a granel
  weight?: number; // Peso em gramas para produtos a granel
  productQuantity: number; // Quantidade específica do produto
  estoquePeso: number; // Peso em estoque
  categoryId: number;
  selectedFlavor?: string; // Adiciona a propriedade selectedFlavor
  flavors: string[];
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product, weight?: number) => void;
  removeFromCart: (productId: number) => void;
  getCartItemCount: () => number;
  clearCart: () => void; // Adicione a definição de clearCart aqui
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

// Função para carregar itens do carrinho do localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  const storedCart = localStorage.getItem('cartItems');
  if (storedCart) {
    return JSON.parse(storedCart);
  }
  return [];
};

// Função para salvar itens do carrinho no localStorage
const saveCartToLocalStorage = (items: CartItem[]) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(loadCartFromLocalStorage());

  const addToCart = (product: Product, weight?: number, flavor?: string) => {
    setCartItems(prevItems => {
        const itemIndex = prevItems.findIndex(item => item.id === product.id);
        
        if (itemIndex >= 0) {
            const updatedItems = [...prevItems];
            if (product.bulk) {
                // Se for produto a granel, atualiza o peso
                updatedItems[itemIndex] = { 
                    ...updatedItems[itemIndex], 
                    weight: weight ?? updatedItems[itemIndex].weight 
                } as CartItem;
            } else {
                // Produto unitário, incrementa a quantidade e atualiza o sabor
                updatedItems[itemIndex] = { 
                    ...updatedItems[itemIndex], 
                    quantity: (updatedItems[itemIndex].quantity || 0) + 1,
                    selectedFlavor: flavor && flavor !== 'Sem sabor' ? flavor : updatedItems[itemIndex].selectedFlavor
                } as CartItem;
            }
            saveCartToLocalStorage(updatedItems);
            return updatedItems;
        }
        
        // Caso o produto ainda não esteja no carrinho, adiciona um novo item
        const newItem: CartItem = {
            ...product,
            weight,
            quantity: product.bulk ? undefined : 1,
            selectedFlavor: flavor && flavor !== 'Sem sabor' ? flavor : 'Sem sabor', // Define o sabor selecionado ou padrão
            productId: product.id,
            productQuantity: product.productQuantity || 1,
            estoquePeso: product.estoquePeso || 0,
            categoryId: product.categoryId,
        };
  
        const updatedItems = [...prevItems, newItem];
        saveCartToLocalStorage(updatedItems);
        return updatedItems;
    });
};

  
  
  // Remove um item do carrinho
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      saveCartToLocalStorage(updatedItems);
      return updatedItems;
    });
  };

  // Obtém a contagem total de itens no carrinho
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  // Limpa todos os itens do carrinho
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems'); // Remove itens do localStorage
  };

  useEffect(() => {
    // Atualiza o localStorage sempre que cartItems muda
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

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