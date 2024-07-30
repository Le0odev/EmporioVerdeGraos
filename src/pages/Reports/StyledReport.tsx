import styled from 'styled-components';

interface ButtonProps {
  active?: boolean;
}

// Container principal
export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

// Título
export const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
`;

// Container para os filtros
export const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

// Rótulo dos filtros
export const FilterLabel = styled.label`
  font-size: 18px;
  color: #666;
  margin-bottom: 8px;
`;

// Entrada para os filtros
export const FilterInput = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  width: calc(100% - 150px);
  font-size: 16px;
  box-sizing: border-box;
`;

// Container para o total de vendas
export const TotalContainer = styled.div`
  font-size: 20px;
  color: #333;
  margin: 20px 0;
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Lista de vendas
export const SalesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Item de venda (Card)
export const SalesItem = styled.li`
  padding: 20px;
  margin-bottom: 12px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #f0f0f0;
    transform: scale(1.02);
  }
`;

// Container da paginação
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

// Botão da paginação
export const PaginationButton = styled.button<{ active?: boolean }>`
  background-color: ${props => (props.active ? '#007bff' : '#fff')};
  border: 1px solid ${props => (props.active ? '#007bff' : '#ddd')};
  color: ${props => (props.active ? '#fff' : '#007bff')};
  padding: 12px 20px;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#f0f0f0')};
    color: ${props => (props.active ? '#fff' : '#007bff')};
  }
`;

// Botão geral
export const Button = styled.button<ButtonProps>`
  background-color: ${props => (props.active ? '#007bff' : '#fff')};
  border: 1px solid ${props => (props.active ? '#007bff' : '#ddd')};
  color: ${props => (props.active ? '#fff' : '#007bff')};
  padding: 12px 20px;
  margin: 0 5px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#f0f0f0')};
    color: ${props => (props.active ? '#fff' : '#007bff')};
  }
`;

// Grupo de botões
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

// Grupo de entradas
export const InputGroup = styled.div`
  display: flex;
  align-items: center;
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
`;

export const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  padding: 20px;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

export const ModalBody = styled.div`
  padding: 10px 0;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s;

  &:hover {
    color: #e74c3c;
  }
`;

export const SaleInfo = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;

  div {
    margin-bottom: 10px;
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
  font-size: 14px;
  color: #666;

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemTitle = styled.div`
  font-weight: bold;
  color: #333;
`;

export const ItemDetails = styled.div`
  margin-top: 5px;
`;
