import styled from 'styled-components';
import {  FaRegEdit, FaTrashAlt } from 'react-icons/fa';

interface CheckboxStyledProps {
  checked: boolean;
}

// Container principal do produto
export const ProductContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 80%; 
  padding: 5px;
  box-sizing: border-box;
  
`;


// Container que envolve toda a aplicação de produtos
export const ContainerWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  background: #f8f9fa;
  margin-top: -20px;

`;

// Seção para formulário e lista de produtos
export const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-radius: 10px;
  background: #f8f9fa;
  border: solid 1px #ddd;
  overflow: auto;  
`;

// Container dos botões de filtro
export const ToggleButtonContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

// Botão de filtro alternado
export const ToggleButton = styled.button<{ active: boolean }>`
  padding: 12px 20px;
  background-color: ${({ active }) => (active ? '#007bff' : '#ffffff')};
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  border: solid 1.5px #ddd;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e2e6ea')};
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${({ active }) => (active ? '#004494' : '#dae0e5')};
    transform: translateY(0);
    border: #dae0e5;
  }
`;

// Título da seção
export const SectionTitle = styled.h2`
  margin-bottom: 15px;
  font-size: 20px;
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
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #555;
`;

// Campo de entrada de texto
export const Input = styled.input`
  margin-bottom: 12px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

// Estilo de campo de busca
export const SearchInput = styled(Input)`
  width: 100%;
`;


// Selecionar opções
export const Select = styled.select`
  margin-bottom: 12px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
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
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  height: auto;
  width: 140px;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* Ajuste o tamanho dos cartões */
  margin-top: 10px;
`;

export const CardButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  margin-right: 8px;
  
  transition: color 0.3s ease;
  
  
  /* Adiciona espaçamento entre ícones */
  & > *:not(:last-child) {
    margin-right: 8px;
  }

  &:hover {
    color: #007bff;
  }
`;


// Item individual da lista de cartões
export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// Botão de ação
export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
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

// Estilo da imagem do produto
export const Image = styled.img`
  width: 120px;
  height: 120px; /* Tamanho fixo para evitar distorção */
  object-fit: cover;
  border-radius: 8px;
`;

// Nome do produto no cartão
export const ProductName = styled.h3`
  font-size: 16px;
  margin: 6px 0 4px;
  font-weight: 700;
  color: #333;
  text-align: center;
`;

export const ProductPrice = styled.p`
  font-size: 16px;
  margin: 4px 0;
  color: #28a745;
  font-weight: bold;
  text-align: center;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

export const EditIcon = styled(FaRegEdit)`
  color: #007bff;
  cursor: pointer;
  font-size: 21px;
  transition: color 0.3s ease;
  margin-left: auto;


  &:hover {
    color: #0056b3;
  }
`

export const DeleteIcon = styled(FaTrashAlt)`
  color: #dc3545;
  cursor: pointer;
  font-size: 19px;
  transition: color 0.3s ease;
  margin-right: -12px;

  &:hover {
    color: #c82333;
  }
`;




// Altere a FlexContainer se necessário para manter outros elementos
export const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 1px;

  /* Mantenha a flexibilidade, mas evite afetar o alinhamento do checkbox e do label */
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const CheckboxStyled = styled.div<CheckboxStyledProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 16px;
  color: ${({ checked }) => (checked ? '#28a745' : '#444')};
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 5px;
  font-size: 24px; /* Ajuste o tamanho dos ícones aqui */
`;

// Estilo do ícone do checkbox
export const CheckboxIcon = styled.div<CheckboxStyledProps>`
   
  background-color: ${({ checked }) => (checked ? '#28a745' : 'transparent')};
`;


// Estilização do modal em si
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // Fundo semi-transparente
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Certifica-se de que o modal esteja acima de outros elementos
`;

// Conteúdo do modal, centrado na tela
export const ModalContent = styled.div`
  background-color: white;
  padding: 30px; 
  border-radius: 10px; // Bordas arredondadas
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); // Sombra para dar destaque
  max-width: 500px; // Largura máxima
  width: 100%; // Responsividade
  text-align: center; 
`;

// Cabeçalho do modal
export const ModalHeader = styled.div`
  margin-bottom: 20px; // Espaçamento inferior
  font-size: 1.5rem; // Tamanho maior para o título
  font-weight: bold; // Negrito para destaque
`;

// Rodapé com os botões de ação (Confirmar/Cancelar)
export const ModalFooter = styled.div`
  display: flex;
  gap: 20px;    
  margin-top: 30px;
  margin-left: 25%;
  
  
`;

export const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 15px;


  &:hover {
    background-color: #0056b3;
  }
`;

// Botão alternativo de Cancelar com estilo diferente
export const CancelButton = styled(ModalButton)`
  background-color: #dc3545; // Cor vermelha para o botão de cancelar

  &:hover {
    background-color: #c82333; // Vermelho mais escuro ao passar o mouse
  }
`;
