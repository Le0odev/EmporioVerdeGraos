import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface WeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (weight: number) => void;
}

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

const Input = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid ${({ hasError }) => (hasError ? 'red' : '#ddd')};
  border-radius: 4px;
  &:focus {
    outline-color: ${({ hasError }) => (hasError ? 'red' : '#007bff')};
  }
`;

const Button = styled.button`
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

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

const WeightModal: React.FC<WeightModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [weight, setWeight] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSubmit = () => {
    const weightValue = parseInt(weight, 10); // Converter para inteiro

    if (!isNaN(weightValue) && weightValue > 0) {
      onSubmit(weightValue);
      setWeight('');
      onClose();
    } else {
      setHasError(true);
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
        <Input
          type="number"
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
            setHasError(false);
          }}
          placeholder="Peso em gramas (inteiros)"
          hasError={hasError}
          min="1"
          step="1"
        />
        {hasError && <ErrorMessage>Por favor, insira um valor inteiro e positivo.</ErrorMessage>}
        <Button onClick={handleSubmit}>Adicionar ao Carrinho</Button>
        <Button onClick={handleClose} style={{ marginLeft: '10px', background: '#ccc' }}>
          Cancelar
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default WeightModal;
