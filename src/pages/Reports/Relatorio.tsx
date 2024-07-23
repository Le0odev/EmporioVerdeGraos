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
  TotalContainer,
  PaginationContainer,
  PaginationButton,
  ButtonGroup,
  InputGroup,
  Button
} from './StyledReport';
import { useAuth } from '../Login/authContext';

interface Sales {
  id: number;
  saleDate: string;
  saleTotals: number;
}

const Relatorio = () => {
  const [sales, setSales] = useState<Sales[]>([]);
  const [groupedSales, setGroupedSales] = useState<{ date: string, total: number }[]>([]);
  const [date, setDate] = useState<string>('');
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [totalSalesByDay, setTotalSalesByDay] = useState<number>(0);
  const [totalSalesByMonth, setTotalSalesByMonth] = useState<number>(0);
  const [totalSalesByPeriod, setTotalSalesByPeriod] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterOption, setFilterOption] = useState<'day' | 'month' | 'period'>('day');
  const { token } = useAuth();

  useEffect(() => {
    if (filterOption === 'day' && date) {
      fetchSalesByDay();
    } else if (filterOption === 'month' && month && year) {
      fetchTotalSalesByMonth();
    } else if (filterOption === 'period' && startDate && endDate) {
      fetchSalesByPeriod();
    }
  }, [filterOption, date, month, year, startDate, endDate]);

  const fetchSalesByDay = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/report/day/${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const salesData = response.data;
      setSales(salesData);
      calculateTotalByDay(salesData);
      setGroupedSales([]);
      setTotalSalesByMonth(0);
      setTotalSalesByPeriod(0);
    } catch (error) {
      console.error('Erro ao buscar vendas por dia:', error);
    }
  };

  const fetchTotalSalesByMonth = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/report/month/${year}/${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSales([]);
      setTotalSalesByMonth(response.data);
      setTotalSalesByDay(0);
      setTotalSalesByPeriod(0);
      setDate('');
    } catch (error) {
      console.error('Erro ao buscar total de vendas por mês:', error);
    }
  };

  const fetchSalesByPeriod = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/report/period?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const salesData = response.data;
      setSales(salesData);
      groupSalesByDate(salesData);
      calculateTotalByPeriod(salesData);
      setTotalSalesByDay(0);
      setTotalSalesByMonth(0);
    } catch (error) {
      console.error('Erro ao buscar vendas por período:', error);
    }
  };

  const groupSalesByDate = (sales: Sales[]) => {
    const grouped = sales.reduce((acc: { [key: string]: number }, sale: Sales) => {
      const date = sale.saleDate.split('T')[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += sale.saleTotals;
      return acc;
    }, {});

    const groupedSalesArray = Object.keys(grouped).map(date => ({
      date,
      total: grouped[date]
    }));

    setGroupedSales(groupedSalesArray);
  };

  const calculateTotalByDay = (sales: Sales[]) => {
    const total = sales.reduce((sum: number, sale: Sales) => sum + sale.saleTotals, 0);
    setTotalSalesByDay(total);
  };

  const calculateTotalByPeriod = (sales: Sales[]) => {
    const total = sales.reduce((sum: number, sale: Sales) => sum + sale.saleTotals, 0);
    setTotalSalesByPeriod(total);
  };

  const handleFilterOption = (option: 'day' | 'month' | 'period') => {
    setFilterOption(option);
    setSales([]);
    setGroupedSales([]);
    setTotalSalesByDay(0);
    setTotalSalesByMonth(0);
    setTotalSalesByPeriod(0);
    setDate('');
    setMonth(0);
    setYear(0);
    setStartDate('');
    setEndDate('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 6;
  const totalItems = groupedSales.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedSales = groupedSales.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container>
      <Title>Relatório de Vendas</Title>

      <ButtonGroup>
        <Button active={filterOption === 'day'} onClick={() => handleFilterOption('day')}>
          Filtrar por Dia
        </Button>
        <Button active={filterOption === 'month'} onClick={() => handleFilterOption('month')}>
          Filtrar por Mês
        </Button>
        <Button active={filterOption === 'period'} onClick={() => handleFilterOption('period')}>
          Filtrar por Período
        </Button>
      </ButtonGroup>

      {filterOption === 'day' && (
        <FilterContainer>
          <FilterLabel htmlFor="date">Filtrar por Data:</FilterLabel>
          <InputGroup>
            <FilterInput
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Button active={true} onClick={fetchSalesByDay}>Filtrar</Button>
          </InputGroup>
        </FilterContainer>
      )}

      {filterOption === 'month' && (
        <FilterContainer>
          <FilterLabel>Filtrar por Mês e Ano:</FilterLabel>
          <InputGroup>
            <FilterInput
              type="number"
              placeholder="Mês"
              value={month || ''}
              onChange={(e) => setMonth(parseInt(e.target.value))}
            />
            <FilterInput
              type="number"
              placeholder="Ano"
              value={year || ''}
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
            <Button active={true} onClick={fetchTotalSalesByMonth}>Filtrar</Button>
          </InputGroup>
        </FilterContainer>
      )}

      {filterOption === 'period' && (
        <FilterContainer>
          <FilterLabel>Filtrar por Período:</FilterLabel>
          <InputGroup>
            <FilterInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <FilterInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <Button active={true} onClick={fetchSalesByPeriod}>Filtrar</Button>
          </InputGroup>
        </FilterContainer>
      )}

      <SalesList>
        {filterOption === 'day' ? (
          sales.map((sale) => (
            <SalesItem key={sale.id}>
              <p className="date">Data: {sale.saleDate}</p>
              <p className="total">Total: R${sale.saleTotals.toFixed(2)}</p>
            </SalesItem>
          ))
        ) : (
          paginatedSales.map((sale) => (
            <SalesItem key={sale.date}>
              <p className="date">Data: {sale.date}</p>
              <p className="total">Total: R${sale.total.toFixed(2)}</p>
            </SalesItem>
          ))
        )}
      </SalesList>

      <PaginationContainer>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationButton
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PaginationButton>
        ))}
      </PaginationContainer>

      {filterOption === 'day' && (
        <TotalContainer>Total do Dia: R${totalSalesByDay.toFixed(2)}</TotalContainer>
      )}

      {filterOption === 'month' && (
        <TotalContainer>Total de Vendas no Mês: R${totalSalesByMonth.toFixed(2)}</TotalContainer>
      )}

      {filterOption === 'period' && (
        <TotalContainer>Total do Período: R${totalSalesByPeriod.toFixed(2)}</TotalContainer>
      )}
    </Container>
  );
};

export default Relatorio;
