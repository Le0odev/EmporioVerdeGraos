import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../pages/Login/authContext'; // Substitua pelo caminho real do seu hook de autenticação
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: string;
  productName: string;
  productQuantity: number;
  stockAlertLimit: number;
}

const AlertEstoque: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { token } = useAuth();

  const checkStockLevels = (products: Product[]) => {
    console.log('Produtos recebidos:', products);
    products.forEach((product) => {
      console.log(`Verificando produto: ${product.productName}`);
      if (product.productQuantity <= 0) {
        toast.error(`Produto ${product.productName} está esgotado!`);
      } else if (product.productQuantity <= product.stockAlertLimit) {
        toast.warn(`Produto ${product.productName} está perto do limite!`);
      }
    });
  };

  const handleApiCall = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Dados da API:', response.data);
      setProducts(response.data);
      checkStockLevels(response.data);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      toast.error('Falha ao obter produtos.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleApiCall();
  }, [token]);

  return (
    <></>
  );
};

export default AlertEstoque;
