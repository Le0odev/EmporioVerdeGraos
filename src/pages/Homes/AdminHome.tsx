import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useAuth } from '../Login/authContext';
import { format } from 'date-fns';
import Overview from './OverView';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { MdAddShoppingCart, MdOutlineCategory, MdOutlineSpaceDashboard, MdProductionQuantityLimits, MdViewList } from 'react-icons/md';
import { BsDownload } from "react-icons/bs";



const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  margin-top: -15px;

   @media (max-width: 768px) {
    padding: 10px;
    margin-top: 0.5px;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  @media (max-width: 768px) {
    margin-top: 50px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px
  }

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;


const InfoCardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;

   @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }

`;

const InfoCard = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;

  @media (max-width: 768px) {
    padding: 15px;
  }

  h3 {
    font-size: 18px;
    color: #555;
  }

  p {
    font-size: 24px;
    font-weight: bold;
    margin: 10px 0;
  }
`;

const GraphWrapper = styled.div`
  margin-top: 10px;
  padding: 20px;
  border-radius: 8px;
`;

const RecentSales = styled.div`
  margin-top: 40px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 20px;
    color: #555;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 15px;
  }

`;

const SalesList = styled.ul`
  list-style: none;
  padding: 0;
`;

const SalesListItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    align-items: flex-start;
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
  cursor: pointer;
  border-top: 1px solid #eee;
  transform: scale(1.009); // Pequeno efeito de escala ao passar o mouse


  }

  span {
    font-weight: bold;
  }
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    align-items: center;
  }

  span {
      margin-bottom: 10px;
    }


  button {
    padding: 10px;
    margin: 0 5px;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    
    &:hover:not(:disabled) {
      background-color: #333;
    }
  }

  .page-number {
    margin: 0 5px;
    cursor: pointer;
    font-size: 18px;
    color: #f9f9f9
    margin-top: 1.5px;
    padding: 5px 10px;
    border: 1px solid #ddd; /* Cor da borda */
    border-radius: 3px; /* Borda levemente arredondada */
    text-align: center;

    &:hover {
      background-color: #e0e0e0; /* Cor de fundo no hover */
      text-decoration: none;
    }

    &.active {
      font-weight: bold;
      border-color: #000; /* Cor da borda para a página ativa */
      background-color: #ddd; /* Cor de fundo para a página ativa */
    }
  }
`;
// Container do modal
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  



`;

// Conteúdo do modal
export const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  padding: 20px;
  position: relative;

  @media (max-width: 480px) {
    width: 90%;
    padding: 15px;
    
  }

`;

// Cabeçalho do modal
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

// Corpo do modal
export const ModalBody = styled.div`
  padding: 10px 0;
`;

// Rodapé do modal
export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s;

  &:hover {
    color: #e74c3c;
  }
`;

export const SaleInfo = styled.div`
  margin-bottom: 25px;
  font-size: 16px;
  color: #333;

  div {
    margin-bottom: 6px;
  }
`;

export const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const Item = styled.li`
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  color: #666;

  &:last-child {
    border-bottom: none;
  }
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-right: 8px;
  color: #333;
`;

export const ItemTitle = styled.div`
  font-weight: bold;
  color: #333;
`;

export const ItemDetails = styled.div`
  margin-top: 5px;
  line-height: 1.5;
`;
export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 4px; /* Borda arredondada */
`;


const Button = styled.button`
  display: flex; /* Alinha ícone e texto na mesma linha */
  align-items: center; /* Centraliza verticalmente */
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #333;
  }

  svg {
    margin-right: 8px; /* Espaçamento entre ícone e texto */
    font-size: 20px; /* Tamanho do ícone */
  }
`;

const SaleButton = styled(Button)`
  background-color: #f9f9f9;
  color: #000;

  &:hover {
    background-color: #ddd; /* Cor de fundo no hover */
  }

  svg {
    color: #000; /* Cor do ícone */
  }
`;



// Interfaces para tipagem
interface Sale {
  id: number;
  saleDate: string;
  saleTotals: number;
  methodPayment: string;
  discount: number;
  items: Array<{ 
    productName: string; 
    quantity: number; 
    productPrice: number; 
    weight: number; 
    subtotal: number;
    categoryId: number;
  }>;
}

const getCurrentDate = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm');
};

const Dashboard = () => {
  const [dailySales, setDailySales] = useState<number>(0);
  const [monthlySales, setMonthlySales] = useState<number>(0);
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dailySalesCount, setDailySalesCount] = useState<number>(0);
  const [isGPTModalOpen, setIsGPTModalOpen] = useState<boolean>(false);
  const pdfContentRef = useRef<HTMLDivElement>(null);


  const { token } = useAuth();

  const fetchSalesByDay = async () => {
    try {
      const today = getCurrentDate();
      if (!token) {
        console.error('Token de autenticação não fornecido.');
        return;
      }

      const response = await axios.get<Sale[]>(
        `https://systemallback-end-production.up.railway.app/report/day/${today}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      const salesData = response.data;
      const totalSales = salesData.reduce((total, sale) => total + sale.saleTotals, 0);
      setDailySales(totalSales);

      setDailySalesCount(salesData.length)


      // Atualiza vendas recentes com paginação
      const itemsPerPage = 5;
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedSales = salesData.slice(start, end);
      setRecentSales(paginatedSales);
      setTotalPages(Math.ceil(salesData.length / itemsPerPage));

    } catch (error) {
      console.error('Erro ao buscar vendas por dia:', error);
    }
  };

  const fetchTotalSalesByMonth = async () => {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
  
      const response = await axios.get<number>(
        `https://systemallback-end-production.up.railway.app/report/month/${year}/${month}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      setMonthlySales(response.data);
    } catch (error) {
      console.error('Erro ao buscar total de vendas por mês:', error);
    }
  };

  
  const handleSaleClick = async (sale: Sale) => {
    try {
      const response = await axios.get(`https://systemallback-end-production.up.railway.app/sales/${sale.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const detailedSale: Sale = response.data;
      setSelectedSale(detailedSale);
      setIsModalOpen(true);
      console.log(detailedSale);
    } catch (error) {
      console.error('Erro ao buscar detalhes da venda:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
  };

  useEffect(() => {
    fetchTotalSalesByMonth();
    fetchSalesByDay();
  }, [token, currentPage]);

  const navigate = useNavigate();


const handleCreateSale = () => {
  navigate('/criar-venda');
};


const handleDownload = () => {
  const element = pdfContentRef.current;

  if (element) {
      const opt = {
          margin: 1,
          filename: 'pagina_completa.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Gera o PDF
      html2pdf().from(element).set(opt).save();
  } else {
      console.error('Elemento não encontrado');
  }
};



  return (
    <DashboardWrapper ref={pdfContentRef}>
      <TopBar>
        <Title>Dashboard</Title>

        <IconContainer>
        <SaleButton onClick={handleCreateSale}><MdAddShoppingCart /> Criar Venda</SaleButton> 
        <Button onClick={handleDownload}><BsDownload /> Download</Button>
        
        </IconContainer>

      </TopBar>

      <InfoCardsContainer>
        <InfoCard>
          <h3>Venda Diária</h3>
          <p>R$ {(dailySales.toFixed(2)).toLocaleString()}</p>
          <small>Atualizado hoje</small>
        </InfoCard>
        <InfoCard>
          <h3>Vendas Mensais</h3>
          <p>R$ {(monthlySales.toFixed(2)).toLocaleString()}</p>
          <small>Atualizado este mês</small>
        </InfoCard>
        <InfoCard>
          <h3>Número de Vendas do Dia</h3>
          <p>{dailySalesCount}</p>
          <small>Atualizado recentemente</small>
        </InfoCard>
      </InfoCardsContainer>

      <RecentSales>
        <h3>Vendas recentes</h3>
        <SalesList>
          

          {recentSales.map(sale => (
            
            <SalesListItem key={sale.id} onClick={() => handleSaleClick(sale)}>
              <span>{formatDate(sale.saleDate)}</span>
              <span>{sale.methodPayment}</span>
              <span>R$ {(sale.saleTotals.toFixed(2)).toLocaleString()}</span>
            </SalesListItem>
          ))}
        </SalesList>
        <Pagination>
          <button 
            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))} 
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index + 1}
            className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}          <button 
            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))} 
            disabled={currentPage === totalPages}
          >
            Próxima
          </button>
        </Pagination>
      </RecentSales>
      
        <Overview />

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
                <div><strong>Total:</strong> R$ {selectedSale.saleTotals.toFixed(2)}</div>
              </SaleInfo>
              <h3>Itens:</h3>
              <ItemList>
                {selectedSale.items && selectedSale.items.length > 0 ? (
                  selectedSale.items.map((item, index) => (
                    <Item key={index}>
                      <ItemTitle>{item.productName}</ItemTitle>
                      <ItemDetails>
                        {item.quantity > 0 && (
                          <span>Quantidade: {item.quantity} unidades - R$ {item.productPrice.toFixed(2)} (UN)</span>
                        )}
                        {item.weight > 0 && (
                          <span>Peso: {item.weight} g - R$ {item.productPrice.toFixed(2)} (KG)</span>
                        )}
                        <br />
                        Subtotal: R$ {item.subtotal.toFixed(2)}
                      </ItemDetails>
                    </Item>
                  ))
                ) : (
                  <p>Sem itens disponíveis.</p>
                )}
              </ItemList>
            </ModalBody>
            <ModalFooter>
              {/* Footer modal (se necessário) */}
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      )}
    </DashboardWrapper>
  );
};

export default Dashboard;
