import styled from 'styled-components';
import { FaExclamationTriangle, FaCartPlus } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px; // Espaçamento entre seções
`;

export const SectionTitle = styled.h2`
  font-size: 16px; // Tamanho reduzido
  margin-bottom: 10px; // Espaçamento ajustado
  border-bottom: 1px solid #ddd; // Linha inferior para separar seções
  padding-bottom: 5px; // Espaço adicional para a linha
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; // Espaçamento entre itens
  max-height: 400px;
  overflow-y: auto;
  padding: 0 10px; // Padding ajustado para alinhar com o Container
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px; // Padding ajustado
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.2s;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Sombra para destaque

  &:hover {
    transform: scale(1.02);
  }
`;

export const ProductText = styled.p`
  font-size: 14px; // Tamanho ajustado
  margin: 0;
  font-weight: bold;

  span {
    font-weight: normal;
  }
`;

export const AttentionIcon = styled(FaExclamationTriangle)`
  color: #ffcc00;
  margin-right: 8px; // Espaço entre ícone e texto
`;

export const OrderIcon = styled(FaCartPlus)`
  color: #4caf50;
  margin-right: 8px;
`;

export const NoProductsText = styled.p`
  font-size: 14px;
  color: #999;
  text-align: center; // Centraliza o texto
`;

export const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 12px 20px; // Padding ajustado
  border-radius: 6px; // Borda arredondada ajustada
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px; // Espaçamento superior

  &:hover {
    background-color: #45a049;
  }
`;

export const SubButton = styled.button`
  background-color: #008cba;
  color: white;
  border: none;
  padding: 12px 20px; // Padding ajustado
  border-radius: 6px; // Borda arredondada ajustada
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px; // Espaçamento superior

  &:hover {
    background-color: #007bb5;
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
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); // Sombra ajustada

  h2 {
    margin-top: 0;
    font-size: 18px; // Fonte ajustada
  }

  h3 {
    margin: 15px 0 10px; // Margens ajustadas
    font-size: 16px;
  }

  input[type="text"],
  input[type="number"] {
    width: calc(100% - 20px); // Largura ajustada
    padding: 10px; // Padding ajustado
    margin-bottom: 12px; // Margem ajustada
    border: 1px solid #ddd;
    border-radius: 6px;
  }

  button {
    margin-top: 10px; // Margem ajustada
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;

    &:hover {
      background-color: #45a049;
    }
  }
`;

export const SelectCategory = styled.select`
  padding: 10px; // Padding ajustado
  font-size: 1rem; // Tamanho da fonte ajustado
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  max-width: 300px; // Largura ajustada
  margin-bottom: 20px; // Espaçamento ajustado
  cursor: pointer;

  option {
    font-size: 1rem; // Tamanho da fonte ajustado
  }
`;
