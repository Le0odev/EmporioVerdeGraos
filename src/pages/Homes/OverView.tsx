import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../Login/authContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const OverviewWrapper = styled.div`
  margin-top: 40px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  color: #555;
`;

const OverviewCard = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h4 {
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
`;

const CategoryChart = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FilterWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
  }

  select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
`;

// Função para gerar cores únicas com base no ID
const generateColor = (id: number) => {
  const hue = (id * 137.508) % 360; // Valor de cor baseado no ID
  return `hsl(${hue}, 70%, 80%)`; // HSL para mais variação e visibilidade
};


const MAX_LABEL_LENGTH = 20;

const truncateLabel = (label: string) => {
  if (label.length > MAX_LABEL_LENGTH) {
    return `${label.slice(0, MAX_LABEL_LENGTH - 3)}...`;
  }
  return label;
};

const Overview = () => {
  const [data, setData] = useState<Map<number, number>>(new Map()); // IDs são números
  const [categories, setCategories] = useState<Map<number, string>>(new Map()); // IDs são números
  const [products, setProducts] = useState<Map<number, string>>(new Map()); // IDs são números
  const [highlights, setHighlights] = useState<Array<{ name: string; growth: number }>>([]);
  const [viewMode, setViewMode] = useState('category'); // 'category' ou 'product'
  const { token } = useAuth();

  // Função para buscar categorias e mapear IDs para nomes
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://systemallback-end-production.up.railway.app/category', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const categoriesMap = new Map<number, string>();
      response.data.forEach((category: { id: number; categoryName: string }) => {
        categoriesMap.set(category.id, category.categoryName); // Mapeia o ID numérico para o nome
      });
      setCategories(categoriesMap);
    } catch (error) {
      console.error('Erro ao buscar categorias: ', error);
    }
  };

  // Função para buscar produtos e mapear IDs para nomes
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://systemallback-end-production.up.railway.app/products/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const productsMap = new Map<number, string>();
      response.data.forEach((product: { id: number; productName: string }) => {
        productsMap.set(product.id, product.productName); // Mapeia o ID numérico para o nome
      });
      setProducts(productsMap);
    } catch (error) {
      console.error('Erro ao buscar produtos: ', error);
    }
  };

  // Função para buscar dados de vendas
  const fetchSalesData = async (viewMode: string) => {
    try {
      const startDate = dayjs().subtract(30, 'days').toISOString();
      const endDate = dayjs().toISOString();

      let salesResponse;
      if (viewMode === 'category') {
        salesResponse = await axios.get<Record<string, number>>(
          'https://systemallback-end-production.up.railway.app/report/sales-categories',
          { 
            headers: { Authorization: `Bearer ${token}` },
            params: { startDate, endDate },
          }
        );
        await fetchCategories(); // Busca categorias
      } else {
        salesResponse = await axios.get<Record<string, number>>(
          'https://systemallback-end-production.up.railway.app/report/sales-products',
          { 
            headers: { Authorization: `Bearer ${token}` },
            params: { startDate, endDate },
          }
        );
        await fetchProducts(); // Busca produtos
      }

      const salesData = new Map<number, number>(
        Object.entries(salesResponse.data).map(([id, value]) => [Number(id), value])
      ); // Converte os IDs para número
      setData(salesData);

      // Buscar destaques
      const highlightsResponse = await axios.get<Array<{ name: string; growth: number }>>(
        'https://systemallback-end-production.up.railway.app/report/category-growth',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHighlights(highlightsResponse.data);

    } catch (error) {
      console.error('Erro ao buscar dados do overview:', error);
    }
  };

  useEffect(() => {
    fetchSalesData(viewMode);
  }, [viewMode, token]);

  const chartLabels = Array.from(data.keys()).map((id) => {
    if (viewMode === 'category') {
      return truncateLabel(categories.get(id) || id.toString()); // Usa o nome da categoria ou o ID se não encontrado
    } else {
      return truncateLabel(products.get(id) || `Produto ${id}`); // Usa o nome do produto ou um nome genérico se não encontrado
    }
  });
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: viewMode === 'category' ? 'Vendas por Categoria' : 'Vendas por Produto',
        data: Array.from(data.values()),
        backgroundColor: Array.from(data.keys()).map(id => generateColor(id)), // Cor única para cada ID
        borderColor: Array.from(data.keys()).map(id => generateColor(id)), // Cor única para cada ID
        borderWidth: 1,
      },
    ],
  };

  return (
    <OverviewWrapper>
      <FilterWrapper>
        <label htmlFor="viewMode">Mostrar por:</label>
        <select id="viewMode" value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
          <option value="category">Categoria</option>
          <option value="product">Produto</option>
        </select>
      </FilterWrapper>

      <SectionTitle>Performance por {viewMode === 'category' ? 'Categoria' : 'Produto'}</SectionTitle>

      <CategoryChart>
        <h4>{viewMode === 'category' ? 'Vendas por Categoria' : 'Vendas por Produto'}</h4>
        <Bar data={chartData} options={{ responsive: true }} />
      </CategoryChart>
    </OverviewWrapper>
  );
};

export default Overview;
