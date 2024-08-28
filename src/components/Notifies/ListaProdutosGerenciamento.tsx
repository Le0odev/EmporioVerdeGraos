import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../pages/Login/authContext';

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

  return (
    <div>
      <div>
        <h1>Produtos em Atenção</h1>
        <ul>
          {produtosAtencao.length > 0 ? (
            produtosAtencao.map(produto => (
              <li key={produto.id} onClick={() => handleNotificacaoClick(produto)}>
                {produto.productName} - {produto.bulk ? `${produto.estoquePeso} kg` : `${produto.productQuantity} unidades`}
              </li>
            ))
          ) : (
            <p>Nenhum produto em atenção.</p>
          )}
        </ul>
      </div>

      <div>
        <h1>Lista de Pedidos</h1>
        <ul>
          {produtosPedidos.length > 0 ? (
            produtosPedidos.map(produto => (
              <li key={produto.id}>
                {produto.productName} - {produto.bulk ? `${produto.estoquePeso} kg` : `${produto.productQuantity} unidades`}
              </li>
            ))
          ) : (
            <p>Nenhum produto em pedido.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListaProdutosGerenciamento;
