  import { useState } from 'react';
  import styled from 'styled-components';

  const DashboardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
  `;

  const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  `;

  const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    color: #333;
  `;

  const Button = styled.button`
    padding: 10px 20px;
    background-color: #000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #333;
    }
  `;

  const InfoCardsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 20px;
  `;

  const InfoCard = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    flex: 1;

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
    margin-top: 40px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  `;

  const SalesList = styled.ul`
    list-style: none;
    padding: 0;

    li {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      span {
        font-weight: bold;
      }
    }
  `;

  // JSX Component

  const Dashboard = () => {
    const [dailySales, setDailySales] = useState(0);
    const [monthlySales, setMonthlySales] = useState(0);
    const [otherData, setOtherData] = useState(0);




    return (
      <DashboardWrapper>
        <TopBar>
          <Title>Dashboard</Title>
          <Button>Download</Button>
        </TopBar>

        <InfoCardsContainer>
        <InfoCard>
            <h3>Vendas Diárias</h3>
            <p>R$ {dailySales.toLocaleString()}</p>
            <small>Atualizado hoje</small>
          </InfoCard>
          <InfoCard>
            <h3>Vendas Mensais</h3>
            <p>R$ {monthlySales.toLocaleString()}</p>
            <small>Atualizado este mês</small>
          </InfoCard>
          <InfoCard>
            <h3>Outro Indicador</h3>
            <p>{otherData.toLocaleString()}</p>
            <small>Atualizado recentemente</small>
          </InfoCard>
        </InfoCardsContainer>

        <GraphWrapper>
          {/* Aqui entra o gráfico */}
          <h3>Overview</h3>
          {/* Componente de gráfico vai aqui */}
        </GraphWrapper>

        <RecentSales>
          <h3>Recent Sales</h3>
          <SalesList>
            <li>
              <span>Olivia Martin</span>
              <span>$1,999.00</span>
            </li>
            <li>
              <span>Jackson Lee</span>
              <span>$39.00</span>
            </li>
            {/* Outros items */}
          </SalesList>
        </RecentSales>
      </DashboardWrapper>
    );
  };

  export default Dashboard;
