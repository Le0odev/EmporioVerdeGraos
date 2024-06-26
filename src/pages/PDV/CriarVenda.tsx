import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
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
  ProductGrid,
  ProductCard,
  ProductImage,
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
  CheckoutSection,
  LabelPeso,
  TrashIcon,
  CartTitle,
  AlertMessage
} from './StyledVenda';

interface Produto {
  id: number;
  productName: string;
  productPrice: number;
  quantidade: number | null;
  peso?: number | null;
  bulk: boolean;
  imageUrl: string;
}

const CriarVenda: React.FC = () => {
  const { token } = useAuth();
  const [searchTermByName, setSearchTermByName] = useState<string>('');
  const [searchTermByCodeBar, setSearchTermByCodeBar] = useState<string>('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [autoAddFeedback, setAutoAddFeedback] = useState<string>('');
  const [codigoBarras, setCodigoBarras] = useState<string>('');

  const searchProdutosByCodeBar = async (codeBar: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/products/search/codebar?codeBar=${codeBar}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const produtoEncontrado = response.data[0];

      if (produtoEncontrado) {
        addToCart(produtoEncontrado);

        setAutoAddFeedback(`Produto "${produtoEncontrado.productName}" adicionado automaticamente.`);
        setSearchTermByCodeBar('');

      } else {
        setAutoAddFeedback('Produto não encontrado.');
      }

    } catch (error) {
      console.error('Erro ao buscar produtos por código de barras:', error);
      setAutoAddFeedback('Erro ao buscar produto. Tente novamente.');
    }
  };

  const searchProdutosByName = async (term: string) => {
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
      const novoCarrinho = carrinho.map(item =>
        item.id === produto.id ? { ...item, quantidade: (item.quantidade || 0) + 1 } : item
      );
      setCarrinho(novoCarrinho);

    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
    setCodigoBarras('');

  };

  const updateQuantity = (id: number, quantidade: number | null) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map(item =>
        item.id === id ? { ...item, quantidade: quantidade } : item
      ).filter(item => item.quantidade !== undefined && item.quantidade !== null && item.quantidade > 0)
    );
  };

  const updateWeight = (id: number, peso: number | null) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map(item =>
        item.id === id ? { ...item, peso: peso } : item
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
        quantity: item.bulk ? null : item.quantidade,
        weight: item.bulk ? item.peso : null,
        isBulk: item.bulk
      }));

      const response = await axios.post('http://localhost:8080/sales/create', vendaItems, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Resposta da API após checkout:', response.data);

      setCarrinho([]);
      alert('Venda finalizada com sucesso!');

    } catch (error) {
      console.error('Erro ao realizar checkout:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log('Status do erro:', axiosError.response?.status);
        console.log('Dados do erro:', axiosError.response?.data);

        let errorMessage = 'Erro ao finalizar a venda. Por favor, tente novamente mais tarde.';

        alert(errorMessage);
      } else {
        alert('Erro desconhecido ao finalizar a venda. Por favor, tente novamente mais tarde.');
      }
    }
  };

  const calcularSubtotal = () => {
    let subtotal = 0;
    carrinho.forEach((item) => {
      if (!item.bulk) {
        subtotal += item.productPrice * (item.quantidade || 0);
      } else {
        subtotal += item.productPrice * (item.peso || 0) / 1000;
      }
    });
    return subtotal;
  };

  const handleSearchByNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProdutosByName(searchTermByName);
  };

  const handleSearchByCodeBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProdutosByCodeBar(searchTermByCodeBar);
  };

  useEffect(() => {
    if (searchTermByName) {
      const debounceSearch = setTimeout(() => {
        searchProdutosByName(searchTermByName);
      }, 300);

      return () => clearTimeout(debounceSearch);
    } else {
      setProdutos([]);
    }
  }, [searchTermByName]);

  return (
    <VendaContainer>
      <SearchSection>
        <Form onSubmit={handleSearchByCodeBarSubmit}>
          <Label htmlFor='searchCodeBar'>Procure um produto:</Label>
          <Input
            type='text'
            placeholder='Insira o código de barras'
            id='searchCodeBar'
            value={searchTermByCodeBar}
            onChange={(e) => setSearchTermByCodeBar(e.target.value)}
          />
        </Form>
        <Form onSubmit={handleSearchByNameSubmit}>
          <Input
            type='text'
            placeholder='Procure um produto...'
            id='searchName'
            value={searchTermByName}
            onChange={(e) => setSearchTermByName(e.target.value)}
          />
          <Button type="submit">Pesquisar</Button>
        </Form>
        {autoAddFeedback && <AlertMessage>{autoAddFeedback}</AlertMessage>} {/* Exibição do feedback */}
        <ProductGrid>
          {produtos.map((produto) => (
            <ProductCard key={produto.id} onClick={() => addToCart(produto)}>
              <ProductImage src={produto.imageUrl} alt={produto.productName} />
              <ProductName>{produto.productName}</ProductName>
              <ProductPrice>{produto.productPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ProductPrice>
              <Button type="button">Adicionar</Button>
            </ProductCard>
          ))}
        </ProductGrid>
      </SearchSection>
      <VendaSection>
        <CartTitle>Checkout</CartTitle>
        <CartList>
          {carrinho.length === 0 ? (
            <EmptyCartMessage>Seu carrinho está vazio.</EmptyCartMessage>
          ) : (
            carrinho.map((item) => (
              <CartItem key={item.id}>
                <CartItemDetails>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ProductImage src={item.imageUrl} alt={item.productName} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <div>
                      <ProductName>{item.productName}</ProductName>
                      {item.bulk ? (
                        <div>
                          <LabelPeso htmlFor={`weight_${item.id}`}>Peso em gramas:</LabelPeso>
                          <GranelInput
                            placeholder='Gramas:'
                            type="number"
                            id={`weight_${item.id}`}
                            value={item.peso || ''}
                            onChange={(e) => updateWeight(item.id, parseFloat(e.target.value))}
                          />
                          <ProductPrice>
                            Subtotal: {(item.productPrice * (item.peso || 0) / 1000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </ProductPrice>
                        </div>
                      ) : (
                        <div>
                          <QuantityControl>
                            <FaMinus onClick={() => updateQuantity(item.id, (item.quantidade || 0) - 1)} />
                            <span>{item.quantidade}</span>
                            <FaPlus onClick={() => updateQuantity(item.id, (item.quantidade || 0) + 1)} />
                          </QuantityControl>
                          <ProductPrice>
                            Subtotal: {(item.productPrice * (item.quantidade || 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </ProductPrice>
                        </div>
                      )}
                    </div>
                  </div>
                  <CartActions>
                    <TrashIcon onClick={() => removeFromCart(item.id)} />
                  </CartActions>
                </CartItemDetails>
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
