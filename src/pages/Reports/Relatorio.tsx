// Arquivo Relatorio.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Title,
  SalesList,
  SalesItem,
  FilterContainer,
  FilterLabel,
  FilterInput,
  Button,
  TotalContainer,
  PaginationContainer,
  PaginationButton,
} from './StyledReport';
import { useAuth } from '../Login/authContext';

interface Sales {
  id: number;
  saleDate: string;
  saleTotals: number;
}

const Relatorio = () => {
  const [sales, setSales] = useState<Sales[]>([]);
  const [date, setDate] = useState<string>('');
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [totalSalesByDay, setTotalSalesByDay] = useState<number>(0);
  const [totalSalesByMonth, setTotalSalesByMonth] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterOption, setFilterOption] = useState<'day' | 'month'>('day'); // Opções: 'day' para filtro por dia, 'month' para filtro por mês
  const { token } = useAuth();

  useEffect(() => {
    if (filterOption === 'day') {
      fetchSalesByDay();
    } else if (filterOption === 'month') {
      fetchTotalSalesByMonth();
    }
  }, [filterOption]); // Atualiza as vendas sempre que a opção de filtro mudar

  const fetchSalesByDay = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/report/day/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSales(response.data);
      calculateTotalByDay(response.data);
      setTotalSalesByMonth(0); // Limpa o total de vendas por mês ao mudar para filtro por dia
    } catch (error) {
      console.error('Erro ao buscar vendas por dia:', error);
    }
  };

  const fetchTotalSalesByMonth = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/report/month/${year}/${month}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSales([]); // Limpa os resultados ao mudar para filtro por mês
      setTotalSalesByMonth(response.data); // Atualiza o total de vendas no mês diretamente com o valor retornado
      setTotalSalesByDay(0); // Limpa o total de vendas por dia ao mudar para filtro por mês
      setDate(''); // Limpa a data ao mudar para filtro por mês
    } catch (error) {
      console.error('Erro ao buscar total de vendas por mês:', error);
    }
  };

  const calculateTotalByDay = (sales: Sales[]) => {
    const total = sales.reduce((sum: number, sale: Sales) => sum + sale.saleTotals, 0);
    setTotalSalesByDay(total);
  };

  const handleFilterOption = (option: 'day' | 'month') => {
    setFilterOption(option);
    if (option === 'day') {
      setDate('');
      setSales([]);
      setTotalSalesByDay(0);
    } else if (option === 'month') {
      setMonth(0);
      setYear(0);
      setSales([]);
      setTotalSalesByMonth(0);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 6;
  const totalItems = sales.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedSales = sales.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container>
      <Title>Relatório de Vendas</Title>

      <div style={{ marginBottom: '20px' }}>
        <Button
          style={{ marginRight: '10px', backgroundColor: filterOption === 'day' ? '#4CAF50' : '#DDD' }}
          onClick={() => handleFilterOption('day')}
        >
          Filtrar por Dia
        </Button>
        <Button
          style={{ backgroundColor: filterOption === 'month' ? '#4CAF50' : '#DDD' }}
          onClick={() => handleFilterOption('month')}
        >
          Filtrar por Mês
        </Button>
      </div>

      {filterOption === 'day' && (
        <FilterContainer>
          <FilterLabel htmlFor="date">Filtrar por Data:</FilterLabel>
          <FilterInput
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button onClick={fetchSalesByDay}>Filtrar</Button>
        </FilterContainer>
      )}

      {filterOption === 'month' && (
        <FilterContainer>
          <FilterLabel htmlFor="month">Filtrar por Mês e Ano:</FilterLabel>
          <FilterInput
            type="number"
            id="month"
            placeholder="Mês"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          />

          <FilterInput
            type="number"
            id="year"
            placeholder="Ano"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />

          <Button onClick={fetchTotalSalesByMonth}>Filtrar</Button>
        </FilterContainer>
      )}

      <SalesList>
        {paginatedSales.map((sale) => (
          <SalesItem key={sale.id}>
            <p>Data: {sale.saleDate}</p>
            <p>Total: {sale.saleTotals}</p>
          </SalesItem>
        ))}
      </SalesList>

      <PaginationContainer>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationButton key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </PaginationButton>
        ))}
      </PaginationContainer>

      {filterOption === 'day' && (
        <TotalContainer>Total do Dia: {totalSalesByDay}</TotalContainer>
      )}

      {filterOption === 'month' && (
        <TotalContainer>Total de Vendas no Mês: {totalSalesByMonth}</TotalContainer>
      )}
    </Container>
  );
};

export default Relatorio;
