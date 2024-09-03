import styled from 'styled-components';
import { FaExclamationTriangle, FaCartPlus } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80%;
  flex-direction: column;
  padding: 15px;
  gap: 10px;
  border: solid 1px #d0d0d0; 
  border-radius: 8px;
  background-color: #f5f5f5; 
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 8px;
  border-bottom: 2px solid #b0b0b0; // Linha de separação em cinza
  padding-bottom: 4px;
  color: #333;
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 350px;
  overflow-y: auto;
  padding: 0 8px;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #dcdcdc; // Borda cinza clara
  border-radius: 4px;
  background-color: #ffffff; // Fundo branco para os cards
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15); // Sombra leve
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // Sombra mais forte no hover
  }
`;

export const ProductText = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: 500;
  color: #444;

  span {
    font-weight: normal;
    color: #666;
  }
`;

export const AttentionIcon = styled(FaExclamationTriangle)`
  color: #e67e22;
  margin-left: 6px;
`;

export const OrderIcon = styled(FaCartPlus)`
  color: #27ae60;
  margin-left: 6px;
`;

export const NoProductsText = styled.p`
  font-size: 12px;
  color: #999;
  text-align: center;
`;

export const AddButton = styled.button`
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;

  &:hover {
    background-color: #229954;
  }
`;

export const SubButton = styled.button`
  background-color: #2980b9;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;

  &:hover {
    background-color: #2471a3;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // Garantir que o modal fique acima de outros elementos
`;

export const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  max-width: 600px; // Ajustar para um tamanho maior
  width: 90%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    margin-top: 0;
    font-size: 18px; // Tamanho maior para melhor legibilidade
    color: #333;
  }

  h3 {
    margin: 12px 0 8px;
    font-size: 16px; // Tamanho maior para melhor legibilidade
    color: #555;
  }

  input[type="text"],
  input[type="number"] {
    width: calc(100% - 16px);
    padding: 12px;
    margin-bottom: 8px;
    border: 1px solid #dcdcdc; // Borda cinza clara
    border-radius: 4px;
  }

  button {
    background-color: #27ae60;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
    margin-top: 8px;

    &:hover {
      background-color: #229954;
    }
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
`;

export const SelectCategory = styled.select`
  padding: 8px;
  font-size: 0.9rem;
  border: 1px solid #dcdcdc; // Borda cinza clara
  border-radius: 4px;
  width: 100%;
  max-width: 280px;
  margin-bottom: 16px;
  cursor: pointer;

  option {
    font-size: 0.9rem;
  }
`;

export const ContainerButton = styled.div `
  display: flex;
  gap: 15px;
`;
