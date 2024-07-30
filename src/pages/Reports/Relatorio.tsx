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
  Button,
  ModalContainer,
  ModalContent,
  CloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ItemTitle,
  ItemDetails,
  ItemList,
  SaleInfo,
  Item
} from './StyledReport';
import { useAuth } from '../Login/authContext';

interface Sale {
  id: number;
  saleDate: string;
  saleTotals: number;
  items: Array<{ productName: string; quantity: number; productPrice: number; weight: number; subtotal: number; }>;
}

interface SalesByDay {
  date: string;
  total: number;
}

const Relatorio: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [groupedSales, setGroupedSales] = useState<SalesByDay[]>([]);
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
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
        headers: { Authorization: `Bearer ${token}` },
      });
      const salesData: Sale[] = response.data;
      setSales(salesData);
      calculateTotalByDay(salesData);
      groupSalesByDate(salesData);
      setTotalSalesByMonth(0);
      setTotalSalesByPeriod(0);
    } catch (error) {
      console.error('Erro ao buscar vendas por dia:', error);
    }
  };

  const fetchTotalSalesByMonth = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/report/month/${year}/${month}`, {
        headers: { Authorization: `Bearer ${token}` },
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
        headers: { Authorization: `Bearer ${token}` },
      });
      const salesData: Sale[] = response.data;
      setSales([]);  // Limpa a lista de vendas para evitar exibir lista quando filtrado por período
      setGroupedSales([]);
      groupSalesByDate(salesData);
      calculateTotalByPeriod(salesData);
      setTotalSalesByDay(0);
      setTotalSalesByMonth(0);
    } catch (error) {
      console.error('Erro ao buscar vendas por período:', error);
    }
  };

  const groupSalesByDate = (sales: Sale[]) => {
    const grouped = sales.reduce((acc: { [key: string]: number }, sale: Sale) => {
      const date = sale.saleDate.split('T')[0];
      if (!acc[date]) acc[date] = 0;
      acc[date] += sale.saleTotals;
      return acc;
    }, {});

    const groupedSalesArray: SalesByDay[] = Object.keys(grouped).map(date => ({
      date,
      total: grouped[date],
    }));

    setGroupedSales(groupedSalesArray);
  };

  const calculateTotalByDay = (sales: Sale[]) => {
    const total = sales.reduce((sum: number, sale: Sale) => sum + sale.saleTotals, 0);
    setTotalSalesByDay(total);
  };

  const calculateTotalByPeriod = (sales: Sale[]) => {
    const total = sales.reduce((sum: number, sale: Sale) => sum + sale.saleTotals, 0);
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

  const handleSaleClick = async (sale: Sale) => {
    try {
      const response = await axios.get(`http://localhost:8080/sales/${sale.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const detailedSale: Sale = response.data;
      setSelectedSale(detailedSale);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
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
            <Button onClick={fetchSalesByDay}>Filtrar</Button>
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
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
            />
            <FilterInput
              type="number"
              placeholder="Ano"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
            <Button onClick={fetchTotalSalesByMonth}>Filtrar</Button>
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
            <Button onClick={fetchSalesByPeriod}>Filtrar</Button>
          </InputGroup>
        </FilterContainer>
      )}

      {filterOption === 'day' && sales.length > 0 && (
        <SalesList>
          {sales.map((sale) => (
            <SalesItem key={sale.id} onClick={() => handleSaleClick(sale)}>
              <div>Data: {sale.saleDate}</div>
              <div>Total: R${sale.saleTotals.toFixed(2)}</div>
            </SalesItem>
          ))}

          <TotalContainer>
            <p>Total de Vendas: {totalSalesByDay.toFixed(2)}</p>
          </TotalContainer>   
        </SalesList>
      )}

      {filterOption === 'month' && totalSalesByMonth > 0 && (
        <TotalContainer>
          <div>Total de Vendas do Mês: R${totalSalesByMonth.toFixed(2)}</div>
        </TotalContainer>
      )}

      {filterOption === 'period' && totalSalesByPeriod > 0 && (
        <TotalContainer>
          <div>Total de Vendas no Período: R${totalSalesByPeriod.toFixed(2)}</div>
        </TotalContainer>
      )}

      {filterOption === 'period' && groupedSales.length > 0 && (
        <>
          
        </>
      )}
      {isModalOpen && selectedSale && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <h2>Detalhes da Venda</h2>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <SaleInfo>
                <div><strong>Data:</strong> {selectedSale.saleDate}</div>
                <div><strong>Total:</strong> R${selectedSale.saleTotals.toFixed(2)}</div>
              </SaleInfo>
              <h3>Itens:</h3>
              <ItemList>
                {selectedSale.items.map((item, index) => (
                  <Item key={index}>
                    <ItemTitle>{item.productName}</ItemTitle>
                    <ItemDetails>
                      {item.quantity > 0 && (
                        <span>Quantidade: {item.quantity} unidades - R${item.productPrice.toFixed(2)} por unidade</span>
                      )}
                      {item.weight > 0 && (
                        <span>Peso: {item.weight} g - R${item.productPrice.toFixed(2)} por kg</span>
                      )}
                      <br />
                      Subtotal: R${item.subtotal.toFixed(2)}
                    </ItemDetails>
                  </Item>
                ))}
              </ItemList>
            </ModalBody>
            <ModalFooter>
              <button onClick={handleCloseModal}>Fechar</button>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      )}
      
    </Container>
  );
};

export default Relatorio;
