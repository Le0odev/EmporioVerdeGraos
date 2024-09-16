// src/pages/Success.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderCart from '../../components/Header/HeadrCart/HeaderCart';
import PixModal from './PixModal'; // Ajuste o caminho conforme necessário

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
  text-align: center;
  padding: 20px;
`;

const SuccessMessage = styled.h1`
  color: #28a745;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const InfoMessage = styled.p`
  color: #333;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const ImportantInfo = styled.div`
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  text-align: left;

  h2 {
    color: #28a745;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
    font-size: 1rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const GeneratePixButton = styled.button`
  display: inline-block;
  padding: 12px 24px;
  font-size: 1rem;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin-top: 20px;

  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const SuccessPage: React.FC = () => {
  const [isPixModalVisible, setPixModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleBackToCatalog = () => {
    navigate('/catalogo');
  };

  const handleGeneratePixModal = () => {
    setPixModalVisible(true); // Exibir o modal do PIX
  };

  const handleClosePixModal = () => {
    setPixModalVisible(false); // Fechar o modal do PIX
  };

  const subtotal = 100; // Exemplo, ajuste conforme necessário
  const freight = 10; // Exemplo, ajuste conforme necessário
  const fullPIX = "123456789"; // Exemplo, ajuste conforme necessário
  const now = Date.now(); // Exemplo de timestamp, ajuste conforme necessário

  return (
    <>
      <HeaderCart
        showBackButton
        handleBack={handleBackToCatalog}
        handleGoToCart={() => navigate('/catalogo')}
      />

      <SuccessContainer>
        <SuccessMessage>Operação bem-sucedida!</SuccessMessage>
        <InfoMessage>
          Seu pedido foi realizado com sucesso. Agradecemos por sua compra!
        </InfoMessage>

        <ImportantInfo>
          <h2>Informações Importantes:</h2>
          <p><strong>Alteração ou Cancelamento:</strong> Para alterar ou cancelar seu pedido, por favor, entre em contato conosco pelo WhatsApp.</p>
          <p><strong>Pagamento via PIX:</strong> Se você escolheu pagamento via PIX, verifique seu e-mail ou WhatsApp para os detalhes do pagamento.</p>
          <p><strong>Confira seu pedido:</strong> O modal com detalhes do pedido está disponível no WhatsApp.</p>
        </ImportantInfo>

        <GeneratePixButton onClick={handleGeneratePixModal}>
          Gerar Modal do PIX Novamente
        </GeneratePixButton>

        <BackButton to="/catalogo">Voltar para a página inicial</BackButton>
      </SuccessContainer>

      <PixModal
        show={isPixModalVisible}
        isOpen={isPixModalVisible}
        onRequestClose={handleClosePixModal}
        subtotal={subtotal}
        freight={freight}
        fullPIX={fullPIX}
        now={now}
      />
    </>
  );
};

export default SuccessPage;
