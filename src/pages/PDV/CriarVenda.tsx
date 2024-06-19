import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import { useAuth } from '../Login/authContext';
import {
  VendaContainer,
  SearchSection,
  VendaSection,
  Form,
  Label,
  Input,
  Button,
  ProductList,
  ProductItem,
  ProductName,
  ProductPrice,
  QuantityControl,
  CheckoutButton,
  CartList,
  CartItem,
  CartItemDetails,
  CartActions,
  GranelInput,
  SubtotalContainer,
  SubtotalLabel,
  SubtotalAmount,
  EmptyCartMessage,
  CheckoutSection
} from './StyledVenda';

interface Produto {
  id: number;
  productName: string;
  productPrice: number;
  quantidade: number;
  peso?: number;
  isBulk: boolean;
}

const CriarVenda: React.FC = () => {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const searchProdutos = async (term: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/products/search?productName=${term}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setProdutos([]);
    }
  };

  const addToCart = (produto: Produto) => {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    if (itemExistente) {
      // Se o item já existe no carrinho, incrementa a quantidade
      const novoCarrinho = carrinho.map(item =>
        item.id === produto.id ? { ...item, quantidade: (item.quantidade || 0) + 1 } : item
      );
      setCarrinho(novoCarrinho);
    } else {
      // Caso contrário, adiciona o produto com quantidade 1
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const updateQuantity = (id: number, quantidade: number) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map(item =>
        item.id === id ? { ...item, quantidade: quantidade || 0 } : item
      ).filter(item => item.quantidade !== undefined && item.quantidade > 0)
    );
  };

  const updateWeight = (id: number, peso: number) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map(item =>
        item.id === id ? { ...item, peso } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCarrinho((prevCarrinho) => prevCarrinho.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    try {
      const vendaItems = carrinho.map((item) => ({
        productId: item.id,
        quantity: item.isBulk ? undefined : item.quantidade,
        weight: item.isBulk ? item.peso : undefined,
        isBulk: item.isBulk
      }));

      await axios.post('http://localhost:8080/vendas', { itens: vendaItems }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCarrinho([]);
    } catch (error) {
      console.error('Erro ao realizar checkout:', error);
    }
  };

  const calcularSubtotal = () => {
    let subtotal = 0;
    carrinho.forEach((item) => {
      if (!item.isBulk) {
        subtotal += item.productPrice * item.quantidade;
      } else {
        subtotal += item.productPrice * (item.peso || 0) / 1000; // Convertendo gramas para quilogramas
      }
    });
    return subtotal;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProdutos(searchTerm);
  };

  useEffect(() => {
    if (searchTerm) {
      const debounceSearch = setTimeout(() => {
        searchProdutos(searchTerm);
      }, 300);

      return () => clearTimeout(debounceSearch);
    } else {
      setProdutos([]);
    }
  }, [searchTerm]);

  return (
    <VendaContainer>
      <SearchSection>
        <Form onSubmit={handleSearchSubmit}>
          <Label htmlFor="search">Pesquisar produto:</Label>
          <Input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit">Pesquisar</Button>
        </Form>
        <ProductList>
          {produtos.map((produto) => (
            <ProductItem key={produto.id} onClick={() => addToCart(produto)}>
              <ProductName>{produto.productName}</ProductName>
              <ProductPrice>{produto.productPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ProductPrice>
              <Button type="button">Adicionar</Button>
            </ProductItem>
          ))}
        </ProductList>
      </SearchSection>
      <VendaSection>
        <h2>Carrinho</h2>
        <CartList>
          {carrinho.length === 0 ? (
            <EmptyCartMessage>Seu carrinho está vazio.</EmptyCartMessage>
          ) : (
            carrinho.map((item) => (
              <CartItem key={item.id}>
                <CartItemDetails>
                  <ProductName>{item.productName}</ProductName>
                  <ProductPrice>{item.productPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ProductPrice>
                  {item.isBulk && (
                    <div>
                      <Label htmlFor={`weight_${item.id}`}>Peso (g):</Label>
                      <GranelInput
                        type="number"
                        id={`weight_${item.id}`}
                        value={item.peso || ''}
                        onChange={(e) => updateWeight(item.id, parseFloat(e.target.value))}
                      />
                    </div>
                  )}
                </CartItemDetails>
                <CartActions>
                  <QuantityControl>
                    <FaMinus onClick={() => updateQuantity(item.id, item.quantidade - 1)} />
                    <span>{item.quantidade}</span>
                    <FaPlus onClick={() => updateQuantity(item.id, item.quantidade + 1)} />
                  </QuantityControl>
                  <FaTrashAlt onClick={() => removeFromCart(item.id)} />
                </CartActions>
              </CartItem>
            ))
          )}
        </CartList>
        {carrinho.length > 0 && (
          <>
            <SubtotalContainer>
              <SubtotalLabel>Subtotal:</SubtotalLabel>
              <SubtotalAmount>{calcularSubtotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</SubtotalAmount>
            </SubtotalContainer>
            <CheckoutSection>
              <CheckoutButton onClick={handleCheckout}>Finalizar Venda</CheckoutButton>
            </CheckoutSection>
          </>
        )}
      </VendaSection>
    </VendaContainer>
  );
};

export { CriarVenda };
