import styled from 'styled-components';

// Container principal
export const Container = styled.div`
  padding: 20px;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f4f5f7;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Títulos das seções
export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
`;

// Lista de produtos
export const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

// Item de produto
export const ProductItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid #e0e0e0;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f1f1f1;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

// Ícone de atenção
export const AttentionIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #f57c00;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
`;

// Ícone de pedido
export const OrderIcon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #2196f3;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
`;

// Texto do produto
export const ProductText = styled.span`
  font-size: 1rem;
  color: #333;
  
  span {
    font-weight: 600;
    color: #007bff;
  }
`;

// Texto para nenhum produto
export const NoProductsText = styled.p`
  font-size: 1rem;
  color: #888;
  text-align: center;
`;

// Botões de ação
export const AddButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    background-color: #218838;
    transform: scale(1.03);
  }

  &:active {
    background-color: #1e7e34;
  }
`;

// Botão de enviar pedido
export const SendOrderButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.03);
  }

  &:active {
    background-color: #004494;
  }
`;

// Modal
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Conteúdo do modal
export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 15px;
    font-size: 1.5rem;
    color: #333;
    font-weight: 600;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    color: #333;
  }

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background-color 0.3s, transform 0.2s;
    margin-right: 10px;

    &:hover {
      background-color: #0056b3;
      transform: scale(1.03);
    }

    &:active {
      background-color: #004494;
    }
  }

  button + button {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }

    &:active {
      background-color: #bd2130;
    }
  }

  div {
    margin-bottom: 10px;
  }
`;
