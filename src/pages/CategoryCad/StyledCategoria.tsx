import styled from 'styled-components';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// Contêiner principal para a página de gerenciamento de categorias
export const CategoriaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
    margin-top: 4.5rem;
    gap: 10px;
  }
`;

// Seção para cadastrar ou editar categorias
export const Section = styled.section`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 15px;
  }
`;

// Título da seção
export const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

// Formulário para cadastrar ou editar categoria
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// Rótulo dos campos do formulário
export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #555;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

// Entrada de texto para o formulário
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Botão de envio do formulário
export const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3 ;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

// Cabeçalho principal da página
export const H1 = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 20px;
  }
`;

// Cartão que contém a lista de categorias
export const Card = styled.div`
  margin-top: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;

// Lista de itens no cartão
export const CardList = styled.ul`
  margin-bottom: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

// Cada item na lista de categorias
export const CardItem = styled.li`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 8px 15px;
  }
`;

// Botão dentro do cartão para ações como editar ou excluir
export const CardButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 18px;
  }
`;

// Input de pesquisa no cartão
export const CardInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 13px;
  }
`;

// Container de pesquisa com input e botão
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  & input {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    gap: 5px;
    margin-top: 8px;
    
  }
`;

// Nome da categoria dentro do cartão
export const CategoryName = styled.span`
  font-weight: bold;
  color: #333;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

// Ícone de edição
export const EditIcon = styled(FaEdit)`
  color: #007bff;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    color: #0056b3;
  }

  @media (max-width: 768px) {
    margin-right: 8px;
    font-size:18px;
  }
`;

// Ícone de exclusão
export const DeleteIcon = styled(FaTrashAlt)`
  color: #dc3545;
  cursor: pointer;

  &:hover {
    color: #c82333;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Container para paginação
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 5px;

  @media (max-width: 768px) {
    gap: 3px;
    margin-top: 15px;
  }
`;

// Botão de paginação
export const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 12px;
  background-color: ${({ disabled }) => (disabled ? '#e9ecef' : '#007bff')};
  color: ${({ disabled }) => (disabled ? '#6c757d' : 'white')};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#e9ecef' : '#0056b3')};
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 13px;
  }
`;


// Ícone de pesquisa
export const SearchButtonIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 10px;
`;


