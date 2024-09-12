import { IoAdd } from 'react-icons/io5';
import styled from 'styled-components';

export const SuggestionCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%; // Ajuste o tamanho conforme necessário
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  text-align: center;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const SuggestionImage = styled.img`
  width: 60px; // Ajuste o tamanho da imagem conforme necessário
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin: 0 auto 4px;; // Centraliza horizontalmente
  display: block; // Garante que a imagem seja tratada como bloco
`;

export const SuggestionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-right: 8px; // Espaçamento entre os detalhes e o ícone de adicionar
`;

export const SuggestionName = styled.p`
  font-size: 12.5px; // Tamanho de fonte reduzido
  font-weight: bold;
  color: #333;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SuggestionPrice = styled.p`
  font-size: 12px; // Tamanho de fonte reduzido
  color: #666;
  margin: 0 auto 5px; 
`;

// Ícone de adição ao carrinho
export const AddIcon = styled(IoAdd)`
  font-size: 24px; // Reduzido para compactar
  color: white;
  background-color: #28a745; // Verde para o ícone
  margin: 0 auto;
  padding: 4px; // Compactado
  border-radius: 30%; // Fundo redondo
  display: block;
  
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #218838; // Tom mais escuro no hover
  }
`;

