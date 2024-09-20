// src/pages/Success.tsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeaderCart from '../../components/Header/HeadrCart/HeaderCart';
import PixModal from './ModalsCatalog/PixModal'; // Ajuste o caminho conforme necessário
import { toast, ToastContainer } from 'react-toastify';

// Estilos para o componente de avaliação
const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const RatingTitle = styled.h3`
  font-size: 1.5rem;
`;

const StarsContainer = styled.div`
  display: flex;
`;

const Star = styled.span<{ selected: boolean }>`
  font-size: 2rem;
  color: ${props => (props.selected ? '#FFD700' : '#CCCCCC')};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #FFD700;
  }
`;


const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f9fc;
  text-align: center;
  padding: 10px;
  border-radius: 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: auto;
    padding: 20px;
    margin: 10px;
  }
`;

const SuccessMessage = styled.h1`
  color: #28a745;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 15px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-top: 10px;
  }
`;

const InfoMessage = styled.p`
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const ImportantInfo = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 600px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 15px;
    max-width: 100%;
    box-shadow: none;
    border-radius: 5px;
  }

  h2 {
    color: #28a745;
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }

  p {
    margin: 10px 0;
    font-size: 1.05rem;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  p strong {
    color: #333;
    font-weight: 600;
  }
`;

const BackButton = styled(Link)`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const GeneratePixButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #28a745;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #218838;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    max-width: 100%;
  }
`;


const SuccessPage: React.FC = () => {
  const [isPixModalVisible, setPixModalVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0); // Estado para o sistema de avaliação


  const sendFeedback = async (rating: number) => {
    try {
      const response = await fetch('https://systemallback-end-production.up.railway.app/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          timestamp: new Date().toISOString(), // Formato de data ISO
        }),
      });
  
      if (response.ok) {
        toast.success('Feedback enviado com sucesso!');
      } else {
        toast.error('Falha ao enviar feedback.');
      }
    } catch (error) {
      toast.error('Erro ao enviar feedback.');
    }
  };
  

  const handleRating = (value: number) => {
    setRating(value);
    sendFeedback(value);
  };


  const state = location.state as {
    subtotal?: number;
    freight?: number;
    now?: number;
  };

  const subtotal = state.subtotal ?? 0;
  const freight = state.freight ?? 0;
  const now = state.now ?? Date.now();

  const pixData = {
    subtotal,
    freight,
    fullPIX: "1", 
    now
  };

  const handleBackToCatalog = () => {
    navigate('/catalogo');
  };

  const handleGeneratePixModal = () => {
    setPixModalVisible(true);
  };

  const handleClosePixModal = () => {
    setPixModalVisible(false); 
  };

  return (
    <>
    <ToastContainer></ToastContainer>
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
        <p><strong>Alteração ou Cancelamento:</strong> Para qualquer informação sobre pedido, por favor, entre em contato conosco pelo <a href="https://wa.me/5581991676177?text=Olá,%20preciso%20de%20ajuda%20com%20meu%20pedido." className="custom-link" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
        <p><strong>Pagamento via PIX:</strong> Se você escolheu pagamento via PIX, confirme o pagamento e envie o comprovante para o <a href="https://wa.me/5581991676177?text=Olá,%20preciso%20de%20ajuda%20com%20meu%20pedido." className="custom-link" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
        <p><strong>Confira seu pedido:</strong> Os detalhes do pedido estão disponíveis no <a href="https://wa.me/5581991676177?text=Olá,%20preciso%20de%20ajuda%20com%20meu%20pedido." className="custom-link" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p>
      </ImportantInfo>


      <ButtonContainer>
        <GeneratePixButton onClick={handleGeneratePixModal}>
          Gerar PIX novamente
        </GeneratePixButton>

        <BackButton to="/catalogo">
          Voltar para o catálogo
        </BackButton>
      </ButtonContainer>

      {/* Avaliação da experiência */}
      <RatingContainer>
        <RatingTitle>Como foi sua experiência?</RatingTitle>
        <StarsContainer>
          {[1, 2, 3, 4, 5].map(star => (
             <Star
             key={star}
             selected={star <= rating}
             onClick={() => handleRating(star)}
             tabIndex={0}
             aria-label={`Rate ${star} stars`}
           >
             {star <= rating ? '★' : '☆'}
           </Star>
          ))}
        </StarsContainer>
      </RatingContainer>

    </SuccessContainer>

    <PixModal
      show={isPixModalVisible}
      isOpen={isPixModalVisible}
      onRequestClose={handleClosePixModal}
      subtotal={pixData.subtotal}
      freight={pixData.freight}
      fullPIX={pixData.fullPIX}
      now={pixData.now}
    />
  </>
);
};

export default SuccessPage;
