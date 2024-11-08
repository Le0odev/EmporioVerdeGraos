import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Title,
  SalesList,
  SalesItem,
  FilterContainer,
  FilterInput,
  TotalContainer,
  PaginationContainer,
  PaginationButton,
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
  Item,
  PeriodContainer,
  DateInputContainer,
  DateLabel,
  DateInput,
  FilterButton,
  FilterLabel,
  DateInputsWrapper,
  ButtonGroup,
  InputGroup,
  DeleteButton
} from './StyledReport';
import { useAuth } from '../Login/authContext';
import { format } from 'date-fns';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';


interface Sale {
  id: number;
  saleDate: string;
  saleTotals: number;
  methodPayment: string;
  discount: number;
  items: Array<{ productName: string; quantity: number; productPrice: number; weight: number; subtotal: number;  }>;
}

interface SalesByDay {
  id: number;  // Propriedade 'id' é obrigatória
  date: string;
  total: number;
}

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm');
};


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
  const [itemsPerPage] = useState<number>(4);
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
      const response = await axios.get(`https://systemallback-end-production.up.railway.app/report/day/${date}`, {
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
  const handleDeleteSale = async (saleId: number) => {
    // Verificação de confirmação antes de excluir
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir esta venda?');
    
    if (!confirmDelete) {
      return; // Se o usuário cancelar a ação, a exclusão não será realizada
    }
  
    try {
      // Requisição DELETE para excluir a venda
      await axios.delete(`https://systemallback-end-production.up.railway.app/sales/${saleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Atualiza o estado das vendas removendo a venda deletada
      setSales((prevSales) => prevSales.filter((sale) => sale.id !== saleId));
  
      // Se a venda estava em uma das listas agrupadas, remova também
      setGroupedSales((prevGroupedSales) =>
        prevGroupedSales.filter((groupedSale) => groupedSale.id !== saleId)
      );
  
      // Atualizar os totais de vendas, caso necessário
      calculateTotalByDay(sales);
      calculateTotalByPeriod(sales);
  
      // Realizar uma nova busca pelas vendas após exclusão
      if (filterOption === 'day' && date) {
        fetchSalesByDay();
      } else if (filterOption === 'month' && month && year) {
        fetchTotalSalesByMonth();
      } else if (filterOption === 'period' && startDate && endDate) {
        fetchSalesByPeriod();
      }
  
      toast.success('Venda deletada com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar a venda:', error);
      alert('Erro ao tentar deletar a venda.');
    }
  };
  const fetchTotalSalesByMonth = async () => {
    try {
      const response = await axios.get(`https://systemallback-end-production.up.railway.app/report/month/${year}/${month}`, {
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
      const response = await axios.get(`https://systemallback-end-production.up.railway.app/report/period?startDate=${startDate}&endDate=${endDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const salesData: Sale[] = response.data;
      setSales([]); 
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
  
    const groupedSalesArray: SalesByDay[] = Object.keys(grouped).map((date, index) => ({
      id: index + 1, // Atribuindo um id fictício ou um índice
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
      const response = await axios.get(`https://systemallback-end-production.up.railway.app/sales/${sale.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const detailedSale: Sale = response.data;
      setSelectedSale(detailedSale);
      setIsModalOpen(true);
      console.log(detailedSale)
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
  };



  const paginatedSales = sales.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(sales.length / itemsPerPage);

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
          <InputGroup >
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
              type="text"
              placeholder="Mês"
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
            />
            <FilterInput
              type="text"
              placeholder="Ano"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
            />
            <Button onClick={fetchTotalSalesByMonth}>Filtrar</Button>
          </InputGroup>
        </FilterContainer>
      )}

      {filterOption === 'period' && (
        <PeriodContainer>
        <DateInputsWrapper>
          <DateInputContainer>
            <DateLabel>Período Inicial:</DateLabel>
            <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value) } />
          </DateInputContainer>
  
          <DateInputContainer>
            <DateLabel>Período Final:</DateLabel>
            <DateInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            />
          </DateInputContainer>
        </DateInputsWrapper>
  
        <FilterButton onClick={fetchSalesByPeriod}>Filtrar</FilterButton>
      </PeriodContainer>
      )}

      {filterOption === 'day' && paginatedSales.length > 0 && (
        <SalesList>
          {paginatedSales.map((sale) => (
            <SalesItem key={sale.id} onClick={() => handleSaleClick(sale)}>
              <div>Data: {formatDate(sale.saleDate)}</div>
              <h4>Total: R${sale.saleTotals.toFixed(2)}</h4>

              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSale(sale.id);
                }}
              >
                <FaTrash />
              </DeleteButton>
            </SalesItem>
          ))}

          <TotalContainer>
            <p>Total de Vendas: R${totalSalesByDay.toFixed(2)}</p>
          </TotalContainer>

          {/* Paginação */}
          <PaginationContainer>
            <PaginationButton 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </PaginationButton>
            <span>Página {currentPage} de {totalPages}</span>
            <PaginationButton 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </PaginationButton>
          </PaginationContainer>
        </SalesList>
      )}

      {/* Outras exibições (mês, período) */}
      {filterOption === 'month' && totalSalesByMonth > 0 && (
        <TotalContainer>
          <p>Total de Vendas no Mês: R${totalSalesByMonth.toFixed(2)}</p>
        </TotalContainer>
      )}

      {filterOption === 'period' && totalSalesByPeriod > 0 && (
        <TotalContainer>
          <p>Total de Vendas no Período: R${totalSalesByPeriod.toFixed(2)}</p>
        </TotalContainer>
      )}

      {isModalOpen && selectedSale && (
    
       <ModalContainer onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h2>Detalhes da Venda</h2>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <SaleInfo>
                <div><strong>Data:</strong> {formatDate(selectedSale.saleDate)}</div>
                <div><strong>Descontos:</strong> {selectedSale.discount}%</div>
                <div><strong>Pagamento:</strong> {selectedSale.methodPayment}</div>
                <div><strong>Total:</strong> R${selectedSale.saleTotals.toFixed(2)}</div>
                
              </SaleInfo>
              <h3>Itens:</h3>
              <ItemList>
                {selectedSale.items.map((item, index) => (
                  <Item key={index}>
                    <ItemTitle>{item.productName}</ItemTitle>
                    <ItemDetails>
                      {item.quantity > 0 && (
                        <span>Quantidade: {item.quantity} unidades - R${item.productPrice.toFixed(2)} (UN)</span>
                      )}
                      {item.weight > 0 && (
                        <span>Peso: {item.weight} g - R${item.productPrice.toFixed(2)} (KG)</span>
                      )}
                      
                      <br />
                      Subtotal: R${item.subtotal.toFixed(2)}
                    </ItemDetails>
                  </Item>
                ))}
              </ItemList>
            </ModalBody>
            <ModalFooter>
              {/* Footer modal (se necessário) */}
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      )}
    </Container>
  );
};

export default Relatorio;
