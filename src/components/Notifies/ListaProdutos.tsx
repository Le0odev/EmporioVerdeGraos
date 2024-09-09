import React, { useEffect } from 'react';
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

const ListaProdutos: React.FC = () => {
  const { token } = useAuth();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('https://systemallback-end-production.up.railway.app/products/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        response.data.forEach((produto: Produto) => {
          handleProduto(produto);
        });
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, [token]);

  const handleProduto = (produto: Produto) => {
    const { id, productName, bulk, estoquePeso, productQuantity, stockAlertLimit } = produto;
    const quantidade = bulk ? estoquePeso : productQuantity;

    if (quantidade !== undefined) {
      const notificationId = `produto-${id}`;
      const notificationState = localStorage.getItem(notificationId);

      if (quantidade === 0) {
        if (notificationState !== 'esgotado') {
          adicionarProdutoPedidos(id);
          notificacaoEsgotado(productName);
          localStorage.setItem(notificationId, 'esgotado');
        }
      } else if (quantidade <= stockAlertLimit) {
        if (notificationState !== 'notificado') {
          notificacaoLimite(id, productName);
          localStorage.setItem(notificationId, 'notificado');
        }
      } else {
        if (notificationState) {
          // Remover notificação se o estoque for suficiente novamente
          localStorage.removeItem(notificationId);
        }
        removerProdutoDasListas(id);
      }
    }
  };

  const notificacaoEsgotado = (productName: string) => {
    toast.error(`Produto ${productName} está esgotado e foi adicionado à lista de pedidos.`, {
      autoClose: 10000,
    });
  };

  const notificacaoLimite = (produtoId: number, productName: string) => {
    toast.warn(`${productName} está perto do limite de estoque.`, {
      onClick: () => handleNotificacaoClick(produtoId),
      autoClose: false,
      closeButton: true,
    });
  };

  const handleNotificacaoClick = (produtoId: number) => {
    adicionarProdutoAtencao(produtoId);
    localStorage.setItem(`produto-${produtoId}`, 'notificado');
  };

  const adicionarProdutoAtencao = (produtoId: number) => {
    const produtosAtencao = JSON.parse(localStorage.getItem('produtosAtencao') || '[]');

    if (!produtosAtencao.includes(produtoId)) {
      const novaLista = [...produtosAtencao, produtoId];
      localStorage.setItem('produtosAtencao', JSON.stringify(novaLista));
      toast.success('Produto adicionado à lista de atenção.');
    } else {
      toast.info('Produto já está na lista de atenção.');
    }
  };

  const adicionarProdutoPedidos = (produtoId: number) => {
    const produtosPedidos = JSON.parse(localStorage.getItem('produtosPedidos') || '[]');

    if (!produtosPedidos.includes(produtoId)) {
      const novaLista = [...produtosPedidos, produtoId];
      localStorage.setItem('produtosPedidos', JSON.stringify(novaLista));
      toast.error('Produto adicionado à lista de pedidos.');
    }
  };

  const removerProdutoDasListas = (produtoId: number) => {
    const produtosAtencao = JSON.parse(localStorage.getItem('produtosAtencao') || '[]');
    const produtosPedidos = JSON.parse(localStorage.getItem('produtosPedidos') || '[]');

    const novaListaAtencao = produtosAtencao.filter((id: number) => id !== produtoId);
    const novaListaPedidos = produtosPedidos.filter((id: number) => id !== produtoId);

    localStorage.setItem('produtosAtencao', JSON.stringify(novaListaAtencao));
    localStorage.setItem('produtosPedidos', JSON.stringify(novaListaPedidos));
  };

  return <></>;
};

export default ListaProdutos;
