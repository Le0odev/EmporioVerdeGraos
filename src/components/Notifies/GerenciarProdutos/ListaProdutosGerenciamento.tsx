import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../pages/Login/authContext';
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
  ContainerButton,
} from './StyledList';
import { useNavigate } from 'react-router-dom';

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
  const [modalOpenAdicionar, setModalOpenAdicionar] = useState(false);
  const [distribuidor, setDistribuidor] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [selectedProdutos, setSelectedProdutos] = useState<Produto[]>([]);
  const [produtoQuantidade, setProdutoQuantidade] = useState<{ [key: number]: string }>({});
  const [novoProdutoNome, setNovoProdutoNome] = useState('');
  const [listaProdutosAdicionados, setListaProdutosAdicionados] = useState<Produto[]>(() => {
    const savedProducts = localStorage.getItem('produtosAdicionados');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

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
        atualizarListas([...produtos]);
        toast.success('Produto adicionado à lista de atenção.');
      }
    }
  };

  const adicionarProdutoPedido = (produtoId: number) => {
    if (!produtosPedidos.some(produto => produto.id === produtoId)) {
      const produto = produtos.find(produto => produto.id === produtoId);
      if (produto) {
        setProdutosPedidos(prev => [...prev, produto]);
        atualizarListas([...produtos]);
        toast.success('Produto adicionado à lista de pedidos.');
      }
    }
  };

  const handleAdicionarProduto = () => {
    if (!novoProdutoNome) {
      toast.error('Insira o nome do produto.');
      return;
    }

    const novoProduto: Produto = {
      id: Date.now(),
      productName: novoProdutoNome,
      bulk: false,
      estoquePeso: 0,
      productQuantity: 0,
      stockAlertLimit: 0,
      categoryId: 0,
    };

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
                  <ProductText>
                    {produto.productName} - <span>{produto.bulk ? `${produto.estoquePeso} kg` : `${produto.productQuantity} UN`}</span>
                  </ProductText>
                  <AttentionIcon />
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
                  <ProductText>
                    {produto.productName} - <span>{produto.bulk ? `${produto.estoquePeso} kg` : `${produto.productQuantity} UN`}</span>
                  </ProductText>
                  <OrderIcon />
                </ProductItem>
              ))
            ) : (
              <NoProductsText>Nenhum produto em pedido.</NoProductsText>
            )}
          </ProductList>
        </div>
        <ContainerButton>
          <AddButton onClick={() => setModalOpenAdicionar(true)}>Adicionar Produto</AddButton>
          <SubButton onClick={() => navigate('/lista-pedidos/enviar-pedido')}>Enviar Pedido</SubButton>
        </ContainerButton>
      </Container>
  
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
