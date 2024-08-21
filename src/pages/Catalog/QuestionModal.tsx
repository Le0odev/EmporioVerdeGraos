import React from "react";
import styled from "styled-components";

interface QuestionModalProps {
  onContinueShopping: () => void;
  onGoToCart: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ConfirmationTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ConfirmationMessage = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ContinueButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 0.55rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  flex: 1;
  margin-right: 1rem;

  &:hover {
    background-color: #218838;
  }
`;

const CartButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.55rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  flex: 1;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuestionModal: React.FC<QuestionModalProps> = ({
  onContinueShopping,
  onGoToCart,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay isOpen={isOpen}>
      <ConfirmationContainer>
        <ConfirmationTitle>Produto Adicionado</ConfirmationTitle>
        <ConfirmationMessage>
          Deseja continuar comprando ou ir para o carrinho?
        </ConfirmationMessage>
        <ButtonContainer>
          <ContinueButton onClick={onContinueShopping}>
            Continuar Comprando
          </ContinueButton>
          <CartButton onClick={onGoToCart}>
            Ir para o Carrinho
          </CartButton>
        </ButtonContainer>
      </ConfirmationContainer>
    </ModalOverlay>
  );
};

export default QuestionModal;
