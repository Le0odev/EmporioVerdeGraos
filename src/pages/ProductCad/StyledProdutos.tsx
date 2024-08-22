import styled from 'styled-components';
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';

// Container principal do produto
export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

// Container que envolve toda a aplicação de produtos
export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Seção para formulário e lista de produtos
export const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// Título da seção
export const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: 700;
  color: #333;
`;

// Formulário de produto
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

// Rótulo dos campos de formulário
export const Label = styled.label`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #555;
`;

// Campo de entrada de texto
export const Input = styled.input`
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Selecionar opções
export const Select = styled.select`
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Botão de ação
export const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
`;

// Cartão de produto
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  padding: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  max-width: 100%;
  height: auto; /* Ajusta a altura automaticamente com base no conteúdo */
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

// Lista de cartões de produtos
export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

// Item individual da lista de cartões
export const CardItem = styled.div`
  display: flex;
  align-items: center;
`;

// Nome do produto no cartão
export const ProductName = styled.h3`
  font-size: 18px;
  margin: 8px 0 4px;
  font-weight: 700;
  color: #333;
  text-align: center;
`;

// Preço do produto no cartão
export const ProductPrice = styled.p`
  font-size: 16px;
  margin: 4px 0;
  color: #007bff;
  text-align: center;
`;

// Ícone de edição
export const EditIcon = styled(FaEdit)`
  color: #007bff;
  cursor: pointer;
  margin-right: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

// Ícone de exclusão
export const DeleteIcon = styled(FaTrashAlt)`
  color: #dc3545;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #c82333;
  }
`;

// Container para ícones de ações
export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

// Estilo da imagem do produto
export const Image = styled.img`
  width: 100%;
  height: 120px; 
  object-fit: cover;
  border-radius: 8px;
`;

// Rótulo para checkbox
export const CheckboxLabel = styled.label`
  font-size: 16px;
  margin-left: 8px;
  color: #555;
`;

// Container para checkbox
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

// Estilo do checkbox
export const CheckboxInput = styled.input`
  margin-right: 8px;
`;

// Estilo de campo de busca
export const SearchInput = styled(Input)`
  width: 100%;
`;

// Container dos botões de filtro
export const ToggleButtonContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

// Botão de filtro alternado
export const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  background-color: ${({ active }) => (active ? '#007bff' : '#f8f9fa')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e2e6ea')};
    transform: translateY(-2px);
  }

  &:active {
    background-color: ${({ active }) => (active ? '#004494' : '#dae0e5')};
    transform: translateY(0);
  }
`;

// Botão para ações do cartão
export const CardButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  margin-right: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;
