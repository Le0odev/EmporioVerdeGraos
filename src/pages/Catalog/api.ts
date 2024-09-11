// api.ts
import axios from 'axios';
import { Product } from './Product'; // Ajuste o caminho conforme necessário

const API_URL = 'https://systemallback-end-production.up.railway.app/products/all'; // URL da API
const BEARER_TOKEN = 'YOUR_BEARER_TOKEN'; // Substitua pelo seu token

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    return response.data; // Ajuste isso conforme a estrutura da resposta da API
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
};
