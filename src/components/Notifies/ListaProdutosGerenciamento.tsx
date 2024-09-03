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
  SubButton,
  SelectCategory,
} from './StyledList';

interface Produto {
  id: number;
  productName: string;
  bulk: boolean;
  estoquePeso?: number;
  productQuantity?: number;
  stockAlertLimit: number;
  categoryId: number;
}

interface Categoria {
  id: number;
  categoryName: string;
}

const ListaProdutosGerenciamento: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosAtencao, setProdutosAtencao] = useState<Produto[]>([]);
  const [produtosPedidos, setProdutosPedidos] = useState<Produto[]>([]);
  const [modalOpenPedido, setModalOpenPedido] = useState(false);
  const [modalOpenAdicionar, setModalOpenAdicionar] = useState(false);
  const [distribuidor, setDistribuidor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [selectedProdutos, setSelectedProdutos] = useState<Produto[]>([]);
  const [produtoQuantidade, setProdutoQuantidade] = useState<{ [key: number]: string }>({});
  const [novoProdutoNome, setNovoProdutoNome] = useState('');
  const [listaProdutosAdicionados, setListaProdutosAdicionados] = useState<Produto[]>(() => {
    // Recupera os produtos adicionados manualmente do localStorage
    const savedProducts = localStorage.getItem('produtosAdicionados');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
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
        console.log(response.data)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/category', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchProdutos();
    fetchCategorias();
  }, [token]);

  useEffect(() => {
    // Atualizar localStorage sempre que a lista de produtos adicionados manualmente mudar
    localStorage.setItem('produtosAdicionados', JSON.stringify(listaProdutosAdicionados));
  }, [listaProdutosAdicionados]);

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

    // Atualizar localStorage para as listas de atenção e pedidos
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

  const handleAdicionarProduto = () => {
    if (!novoProdutoNome) {
      toast.error('Insira o nome do produto.');
      return;
    }

    const novoProduto: Produto = {
      id: Date.now(), // Gerar um ID único temporário
      productName: novoProdutoNome,
      bulk: false,
      estoquePeso: 0,
      productQuantity: 0,
      stockAlertLimit: 0,
      categoryId: 0, // Adicione um ID de categoria padrão se necessário
    };

    // Adiciona o produto à lista local e aos produtos pedidos
    setListaProdutosAdicionados(prev => [...prev, novoProduto]);
    adicionarProdutoPedido(novoProduto.id);
    setNovoProdutoNome('');
    setModalOpenAdicionar(false);
    toast.success('Produto adicionado à lista e aos pedidos.');
  };

  const produtosFiltradosPorCategoria = (produtos: Produto[]) => {
    if (categoriaSelecionada === null) {
      return produtos;
    }
    return produtos.filter(produto => produto.categoryId === categoriaSelecionada);
  };

  return (
    <>
      <Container>
        <div>
          <SectionTitle>Filtrar por Categoria</SectionTitle>
          <SelectCategory onChange={(e) => setCategoriaSelecionada(Number(e.target.value))}>
            <option value="">Selecione uma categoria</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.categoryName}
              </option>
            ))}
          </SelectCategory>
        </div>
  
        <div>
          <SectionTitle>Produtos em Atenção</SectionTitle>
          <ProductList>
            {produtosFiltradosPorCategoria(produtosAtencao).length > 0 ? (
              produtosFiltradosPorCategoria(produtosAtencao).map(produto => (
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
            {produtosFiltradosPorCategoria([...produtosPedidos, ...listaProdutosAdicionados]).length > 0 ? (
              produtosFiltradosPorCategoria([...produtosPedidos, ...listaProdutosAdicionados]).map(produto => (
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
  
        <AddButton onClick={() => setModalOpenAdicionar(true)}>Adicionar Produto</AddButton>
        <SubButton onClick={() => setModalOpenPedido(true)}>Enviar Pedido</SubButton>
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
            {[...produtosPedidos, ...listaProdutosAdicionados].map(produto => (
              <div key={produto.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedProdutos.some(p => p.id === produto.id)}
                    onChange={() => {
                      setSelectedProdutos(prev => {
                        if (prev.some(p => p.id === produto.id)) {
                          return prev.filter(p => p.id !== produto.id);
                        } else {
                          return [...prev, produto];
                        }
                      });
                    }}
                  />
                  {produto.productName}
                  {produto.bulk ? (
                    <input
                      type="number"
                      placeholder="Peso (kg)"
                      value={produtoQuantidade[produto.id] || ''}
                      onChange={(e) => setProdutoQuantidade(prev => ({
                        ...prev,
                        [produto.id]: e.target.value
                      }))}
                    />
                  ) : (
                    <input
                      type="number"
                      placeholder="Quantidade"
                      value={produtoQuantidade[produto.id] || ''}
                      onChange={(e) => setProdutoQuantidade(prev => ({
                        ...prev,
                        [produto.id]: e.target.value
                      }))}
                    />
                  )}
                </label>
              </div>
            ))}
            <button onClick={handleSubmitPedido}>Enviar</button>
            <button onClick={() => setModalOpenPedido(false)}>Fechar</button>
          </ModalContent>
        </Modal>
      )}
  
      {modalOpenAdicionar && (
        <Modal>
          <ModalContent>
            <h2>Adicionar Novo Produto</h2>
            <input
              type="text"
              placeholder="Nome do produto"
              value={novoProdutoNome}
              onChange={(e) => setNovoProdutoNome(e.target.value)}
            />
            <button onClick={handleAdicionarProduto}>Adicionar</button>
            <button onClick={() => setModalOpenAdicionar(false)}>Fechar</button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ListaProdutosGerenciamento;
