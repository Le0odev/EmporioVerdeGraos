// FlavorModal.tsx
import React from 'react';
import styled from 'styled-components';

// Styled components para o modal e seus elementos
const Modal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 1000; // Para garantir que o modal esteja acima de outros elementos
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 80%;
  max-width: 400px;
  margin: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.h2`
  margin: 0;
  color: #333;
  text-align: center;
`;

const ModalBody = styled.div`
  margin: 20px 0;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioLabel = styled.label`
  margin: 10px 0;
  cursor: pointer;
  font-size: 18px;
  color: #555;

  input {
    margin-right: 10px;
    cursor: pointer;
  }
`;

// Props do modal de sabores
interface FlavorModalProps {
  isOpen: boolean;
  onClose: () => void;
  flavors: string[];
  onSelectFlavor: (flavor: string) => void;
}

// Componente FlavorModal
const FlavorModal: React.FC<FlavorModalProps> = ({ isOpen, onClose, flavors, onSelectFlavor }) => {
  const handleFlavorSelect = (flavor: string) => {
    onSelectFlavor(flavor);
    onClose(); // Fecha o modal após selecionar o sabor
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Escolha um Sabor</ModalHeader>
        <ModalBody>
          <RadioGroup>
            {flavors.map((flavor) => (
              <RadioLabel key={flavor}>
                <input
                  type="radio"
                  name="flavor"
                  value={flavor}
                  onChange={() => handleFlavorSelect(flavor)}
                />
                {flavor}
              </RadioLabel>
            ))}
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FlavorModal;
