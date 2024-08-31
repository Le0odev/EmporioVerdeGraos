import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../pages/Login/authContext';
import {
  AddButton,
  AttentionIcon,
  Container,
  NoProductsText,
  OrderIcon,
  ProductItem,
  ProductList,
  ProductText,
  SectionTitle,
  Modal,
  ModalContent,
} from './StyledList';

interface Produto {
  id: number;
  productName: string;
  bulk: boolean;
  estoquePeso?: number;
  productQuantity?: number;
  stockAlertLimit: number;
}

const ListaProdutosGerenciamento: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosAtencao, setProdutosAtencao] = useState<Produto[]>([]);
  const [produtosPedidos, setProdutosPedidos] = useState<Produto[]>([]);
  const [modalOpenPedido, setModalOpenPedido] = useState(false);
  const [distribuidor, setDistribuidor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [selectedProdutos, setSelectedProdutos] = useState<Produto[]>([]);
  const [produtoQuantidade, setProdutoQuantidade] = useState<{ [key: number]: string }>({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const produtos = response.data;
        setProdutos(produtos);
        atualizarListas(produtos);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, [token]);

  const atualizarListas = (produtos: Produto[]) => {
    const produtosAtencaoAtualizados: Produto[] = [];
    const produtosPedidosAtualizados: Produto[] = [];

    produtos.forEach((produto) => {
      if (produto.bulk) {
        if (produto.estoquePeso !== undefined) {
          if (produto.estoquePeso === 0) {
            produtosPedidosAtualizados.push(produto);
          } else if (produto.estoquePeso <= produto.stockAlertLimit) {
            produtosAtencaoAtualizados.push(produto);
          }
        }
      } else {
        if (produto.productQuantity !== undefined) {
          if (produto.productQuantity === 0) {
            produtosPedidosAtualizados.push(produto);
          } else if (produto.productQuantity <= produto.stockAlertLimit) {
            produtosAtencaoAtualizados.push(produto);
          }
        }
      }
    });

    setProdutosAtencao(produtosAtencaoAtualizados);
    setProdutosPedidos(produtosPedidosAtualizados);

    // Atualizar localStorage
    localStorage.setItem('produtosAtencao', JSON.stringify(produtosAtencaoAtualizados.map(produto => produto.id)));
    localStorage.setItem('produtosPedidos', JSON.stringify(produtosPedidosAtualizados.map(produto => produto.id)));
  };

  const handleNotificacaoClick = (produto: Produto) => {
    if (produto.bulk && produto.estoquePeso === 0 || !produto.bulk && produto.productQuantity === 0) {
      adicionarProdutoPedido(produto.id);
    } else {
      adicionarProdutoAtencao(produto.id);
    }
  };

  const adicionarProdutoAtencao = (produtoId: number) => {
    if (!produtosAtencao.some(produto => produto.id === produtoId)) {
      const produto = produtos.find(produto => produto.id === produtoId);
      if (produto) {
        setProdutosAtencao(prev => [...prev, produto]);
        atualizarListas([...produtos]); // Atualizar as listas após a mudança
        toast.success('Produto adicionado à lista de atenção.');
      }
    }
  };

  const adicionarProdutoPedido = (produtoId: number) => {
    if (!produtosPedidos.some(produto => produto.id === produtoId)) {
      const produto = produtos.find(produto => produto.id === produtoId);
      if (produto) {
        setProdutosPedidos(prev => [...prev, produto]);
        atualizarListas([...produtos]); // Atualizar as listas após a mudança
        toast.success('Produto adicionado à lista de pedidos.');
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      atualizarListas(produtos); // Atualizar listas a cada 10 segundos
    }, 10000);

    return () => clearInterval(intervalId);
  }, [produtos]);

  const handleSubmitPedido = () => {
    if (!distribuidor || selectedProdutos.length === 0) {
      toast.error('Preencha todos os campos.');
      return;
    }

    const messageLines = [`Pedido para o distribuidor: ${distribuidor}`];
    
    selectedProdutos.forEach(produto => {
      const quantidade = produtoQuantidade[produto.id];
      if (quantidade) {
        messageLines.push(
          `${produto.productName} - Quantidade: ${quantidade}`
        );
      }
    });

    const message = messageLines.join('\n');
    const encodedMessage = encodeURIComponent(message);
    const numeroWhatsApp = '5581995773288'; // Substitua pelo número desejado
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodedMessage}`;

    window.open(url, '_blank');
    
    // Fechar o modal e limpar os estados
    setModalOpenPedido(false);
    setDistribuidor('');
    setQuantidade('');
    setSelectedProdutos([]);
    setProdutoQuantidade({});
  };

  return (
    <>
      <Container>
        <div>
          <SectionTitle>Produtos em Atenção</SectionTitle>
          <ProductList>
            {produtosAtencao.length > 0 ? (
              produtosAtencao.map(produto => (
                <ProductItem key={produto.id} onClick={() => handleNotificacaoClick(produto)}>
                  <AttentionIcon />
                  <ProductText>
                    {produto.productName} - <span>{produto.bulk ? `${produto.estoquePeso} kg` : `${produto.productQuantity} unidades`}</span>
                  </ProductText>
                </ProductItem>
              ))
            ) : (
              <NoProductsText>Nenhum produto em atenção.</NoProductsText>
            )}
          </ProductList>
        </div>

        <div>
          <SectionTitle>Lista de Pedidos</SectionTitle>
          <ProductList>
            {produtosPedidos.length > 0 ? (
              produtosPedidos.map(produto => (
                <ProductItem key={produto.id}>
                  <OrderIcon />
                  <ProductText>
                    {produto.productName} - <span>{produto.bulk ? `${produto.estoquePeso} kg` : `${produto.productQuantity} unidades`}</span>
                  </ProductText>
                </ProductItem>
              ))
            ) : (
              <NoProductsText>Nenhum produto em pedido.</NoProductsText>
            )}
          </ProductList>
        </div>

        {/* Botões de ação */}
        <AddButton onClick={() => setModalOpenPedido(true)}>Enviar Pedido</AddButton>
      </Container>

      {modalOpenPedido && (
        <Modal>
          <ModalContent>
            <h2>Enviar Pedido</h2>
            <input
              type="text"
              placeholder="Nome do distribuidor"
              value={distribuidor}
              onChange={(e) => setDistribuidor(e.target.value)}
            />
            <h3>Selecione os produtos:</h3>
            {produtosPedidos.map(produto => (
              <div key={produto.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedProdutos.some(p => p.id === produto.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProdutos(prev => [...prev, produto]);
                      } else {
                        setSelectedProdutos(prev => prev.filter(p => p.id !== produto.id));
                        setProdutoQuantidade(prev => {
                          const { [produto.id]: _, ...rest } = prev;
                          return rest;
                        });
                      }
                    }}
                  />
                  {produto.productName}
                </label>
                {selectedProdutos.some(p => p.id === produto.id) && (
                  <input
                    type="text"
                    placeholder={produto.bulk ? 'Quantidade (kg)' : 'Quantidade (unidades)'}
                    value={produtoQuantidade[produto.id] || ''}
                    onChange={(e) => setProdutoQuantidade(prev => ({
                      ...prev,
                      [produto.id]: e.target.value
                    }))}
                  />
                )}
              </div>
            ))}
            <button onClick={handleSubmitPedido}>Enviar Pedido</button>
            <button onClick={() => setModalOpenPedido(false)}>Cancelar</button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ListaProdutosGerenciamento;
