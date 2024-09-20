import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-in-out;

  @media (max-width: 768px) {
  margin: 20px;
  }

  
`;

export const ModalTitle = styled.h2`
  margin: 0 0 10px;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const ModalButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;


export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

interface WeightModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productId: string, weight: number) => void;
}

const WeightModal: React.FC<WeightModalProps> = ({ productId, isOpen, onClose, onSubmit }) => {
    const [weight, setWeight] = useState<number | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);


    const handleSubmit = () => {
        if (weight !== null) {
          onSubmit(productId, weight);
          onClose();
        } else {
          alert('Por favor, insira um peso válido.');
        }
      };


  const handleClose = () => {
    setHasError(false);
    onClose();
  };


  if (!isOpen) return null;

  return (
      


        <ModalOverlay onClick={handleClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h2>Informe a quantidade:</h2>
          <ModalInput
            type="number"
            value={weight !== null ? weight : ''}
            onChange={(e) => {
                setWeight(parseFloat(e.target.value));
            }}
            placeholder="Peso em gramas (inteiros)"
            min="1"
            step="1"
          />
          <ModalButton onClick={handleSubmit}>Adicionar ao Carrinho</ModalButton>
          <ModalButton onClick={handleClose} style={{ marginLeft: '10px', background: '#ccc' }}>
            Cancelar
          </ModalButton>
        </ModalContent>
      </ModalOverlay>




);
};

export default WeightModal;
