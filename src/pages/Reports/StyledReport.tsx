import styled from 'styled-components';

interface ButtonProps {
  active?: boolean;
}


export const PeriodContainer = styled.div`
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;


`;

export const DateInputsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px; /* Adiciona espaço entre os campos */
  
`;

export const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateLabel = styled.label`
  margin-top: 8px;
  margin-bottom: 5px;
  color: #333;
  font-size: 14px;
  font-weight: bold;
`;

export const DateInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 12px;
`;

export const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
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
  z-index: 1000;
  



`;

// Conteúdo do modal
export const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  padding: 20px;
  position: relative;

  @media (max-width: 480px) {
    width: 90%;
    padding: 15px;
    
  }

`;

// Cabeçalho do modal
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

// Corpo do modal
export const ModalBody = styled.div`
  padding: 10px 0;
`;

// Rodapé do modal
export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #333;
  transition: color 0.3s;

  &:hover {
    color: #e74c3c;
  }
`;

export const SaleInfo = styled.div`
  margin-bottom: 25px;
  font-size: 16px;
  color: #333;

  div {
    margin-bottom: 6px;
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
  font-size: 15px;
  color: #666;

  &:last-child {
    border-bottom: none;
  }
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-right: 8px;
  color: #333;
`;

export const ItemTitle = styled.div`
  font-weight: bold;
  color: #333;
`;

export const ItemDetails = styled.div`
  margin-top: 5px;
  line-height: 1.5;
`;


// Grupo de entradas
export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px; /* Adicionado para separar do rótulo */
`;

// Grupo de botões
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 20px; /* Adicionado para separar do filtro */
`;

// Container da Paginação
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  gap: 8px; // Adicionando espaço entre os botões
`;

// Botões de Paginação
export const PaginationButton = styled.button`
  background-color: #28a745;  // Verde como na categoria
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #218838; // Sombra mais escura ao passar o mouse
    transform: scale(1.05); // Pequeno efeito de escala ao passar o mouse
  }

  &:disabled {
    background-color: #e2e6ea;
    color: #6c757d;
    cursor: not-allowed;
  }
`;



// Container principal
export const Container = styled.div`
  padding: 25px;
  width: 70%;
  max-width: 100%;
  margin: 0px auto;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    width: 90%;
    padding: 20px;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 15px;
    margin-top: 80px;
  }
`;

// Título
export const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

// Container para os filtros
export const FilterContainer = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

// Entrada para os filtros
export const FilterInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 220px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(38, 143, 255, 0.25);
  }

  @media (max-width: 768px) {
    max-width: 180px;
  }

  @media (max-width: 480px) {
    max-width: 150px;
    padding: 8px;
  }
`;



// Container para o total de vendas
export const TotalContainer = styled.div`
  font-size: 20px;
  color: #28a745;
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 12px;
  
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 10px;
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

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 12px;
  }
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #ff4d4d;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #e60000;  // Um tom mais intenso de vermelho quando passar o mouse
  }

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 16px;
  }
`;

export const SalesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SalesItem = styled.li`
  display: flex;
  justify-content: space-between; /* Alinha os itens para as extremidades */
  align-items: center; /* Centraliza o conteúdo verticalmente */
  padding: 20px;
  margin-bottom: 12px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #e9ecef;
    transform: scale(1.02);
  }

  & > div {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 12px;
  }
`;
