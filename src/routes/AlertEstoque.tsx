import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../pages/Login/authContext'; // Substitua pelo caminho real do seu hook de autenticação
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: string;
  productName: string;
  productQuantity: number; // Quantidade para produtos não a granel
  stockAlertLimit: number; // Limite para alerta de estoque
  isBulk: boolean; // Indica se o produto é a granel
  estoquePeso: number; // Peso do estoque para produtos a granel
}

const AlertEstoque: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const { token } = useAuth();

  const checkStockLevels = (products: Product[]) => {
    console.log('Produtos recebidos:', products);
    products.forEach((product) => {
      console.log(`Verificando produto: ${product.productName}`);
      console.log(`Peso: ${product.estoquePeso}`);
      console.log(`Quantidade: ${product.productQuantity}`);

      if (product.isBulk) {
        if (product.productQuantity >= 0) {
          console.log(`o ${product.productQuantity} está correto`)
        } else if (product.estoquePeso <= product.stockAlertLimit) {
          toast.warn(`Produto ${product.productName} está perto do limite!`);
        }
      } else {
        // Verifica o estoque baseado na quantidade para produtos não a granel
        if (product.productQuantity <= 0) {
          toast.error(`Produto ${product.productName} está esgotado!`);
        } else if (product.productQuantity <= product.stockAlertLimit) {
          toast.warn(`Produto ${product.productName} está perto do limite!`);
        }
      }
    });
  };

  const handleApiCall = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/products/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data);
      checkStockLevels(response.data);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleApiCall();
  }, [token]);

  return null; // Retorna null já que o componente não renderiza nada
};

export default AlertEstoque;
