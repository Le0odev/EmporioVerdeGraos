
import styled from 'styled-components';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';

interface CheckboxStyledProps {
  checked: boolean;
}


// Botão de ação
export const Button = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-bottom: 8px;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }

  @media (max-width: 768px)     
    font-size: 15px;
    padding: 10px;

  }
`;


export const AddButton = styled.button `
  padding: 8px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  margin-top: 5px;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }

  @media (max-width: 768px)     
    font-size: 15px;
    padding: 10px;
    margin-left: -100px;

  }
`;


export const CheckboxStyled = styled.div<CheckboxStyledProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
  color: ${({ checked }) => (checked ? '#28a745' : '#444')};
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 4px;
  font-size: 22px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 20px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;

  label {
    font-size: 14px;
    
  }
  }

`;

export const CheckboxIcon = styled.div<CheckboxStyledProps>`
  background-color: ${({ checked }) => (checked ? '#28a745' : 'transparent')};
`;

// Rodapé com os botões de ação (Confirmar/Cancelar)
export const ModalFooter = styled.div`
  display:flex; 
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
  padding:

  
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;


  &:hover {
    background-color: #0056b3;

  }

`;



// Altere a FlexContainer se necessário para manter outros elementos
export const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 1px;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  @media (max-width: 768px) {
  flex-direction: column;
  gap: 0px;

  input {
    font-size: 14px;
    padding: 10px;
  }
  }

`;


// Botão alternativo de Cancelar com estilo diferente
export const CancelButton = styled(ModalButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;



// Container que envolve toda a aplicação de produtos
export const ContainerWrapper = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  background: #f8f9fa;
  margin-top: -10px;

  @media (max-width: 768px) {
    
    margin-top: 3.5rem;
    padding: 20px;
  }
`;

// Seção para formulário e lista de produtos
export const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 8px;
  background: #f8f9fa;
  border: solid 1px #ddd;

  @media (max-width: 768px) {
    flex-direction: column;
    
  }
`;

// Container dos botões de filtro
export const ToggleButtonContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
  gap: 10px;

 
`;

// Botão de filtro alternado
export const ToggleButton = styled.button<{ active: boolean }>`
  display: block;
  padding: 8px 16px;
  background-color: ${({ active }) => (active ? '#007bff' : '#ffffff')};
  color: ${({ active }) => (active ? '#fff' : '#007bff')};
  border: solid 1px #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
  gap: 10px;

  @media (max-width: 768px) {
  display: flex;
  padding: 7px 8px;
  font-size: 14px;
  }

  &:not(:last-child) {

  }


  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#e2e6ea')};
    transform: translateY(-1px);
  }

  &:active {
    background-color: ${({ active }) => (active ? '#004494' : '#dae0e5')};
    transform: translateY(0);
  }

   
`;


// Título da seção
export const SectionTitle = styled.h2`
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 700;
  color: #333;

  @media (max-width: 768px) {
    font-size: 18px;
    text-align: center;
  }
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
  font-weight: 500;
  color: #555;

  @media (max-width: 768px) {
  
    font-size: 0px;

  }


`;

// Campo de entrada de texto
export const Input = styled.input`
  margin-bottom: 12px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  
`;


// Selecionar opções
export const Select = styled.select`
  margin-bottom: 12px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
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

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CardButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin-right: 6px;
  transition: color 0.3s ease;

  & > *:not(:last-child) {
    margin-right: 6px;
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

export const ProductContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  padding: 5px;
  box-sizing: border-box;


  @media (max-width: 768px) {
    width: 100%;
    padding: 1.1rem;
  }
`;


export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); 
  margin-top: 10px;
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 8px;
  }
`;

// Estilo da imagem do produto
export const Image = styled.img`
  width: 120px;
  height: 120px; /* Tamanho fixo para evitar distorção */
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 120px; 
    height: 120px; /* Tamanho fixo para evitar distorção */
    object-fit: cover;

  }
`;

// Nome do produto no cartão
export const ProductName = styled.h3`
  font-size: 14px;
  margin: 6px 0 4px;
  font-weight: 700;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }

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
  margin-right: -1px;

  &:hover {
    color: #c82333;
  }
`;

// Estilização do modal em si
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Conteúdo do modal, centrado na tela
export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

// Cabeçalho do modal
export const ModalHeader = styled.div`
  margin-bottom: 15px;
  font-size: 1.25rem;
  font-weight: bold;
`;


export const FlavorList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-width: 400px; /* Ajuste a largura máxima conforme necessário */
  background-color: #f9f9f9; /* Cor de fundo */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 12px;
`;

// Item de sabor
export const FlavorItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd; /* Linha divisória */
  
  &:last-child {
    border-bottom: none; /* Remove a linha da última item */
  }

  &:hover {
    background-color: #f1f1f1; /* Efeito hover */
  }
`;

// Botão para remover sabor
export const RemoveFlavorButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545; /* Cor de fundo do botão de remover */
  color: white;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #c82333; /* Efeito hover do botão de remover */
  }
`;

export const FlavorModal = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Garante que o modal fique acima dos outros elementos */

`

export const FlavorModalContent = styled.div`

  background-color: white; /* Fundo branco para o conteúdo */
  padding: 20px;
  border-radius: 8px; /* Bordas arredondadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra */
  width: 400px; /* Largura fixa */
  max-width: 90%; /* Responsividade */

`
export const CloseButton = styled.button`

   background-color: #f44336; /* Vermelho */
  color: white; /* Texto branco */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #d32f2f; /* Cor mais escura no hover */
  }
`

export const Title = styled.h2`
  font-size: 24px;
  color: #4a4a4a; /* Cor do texto */
  margin-bottom: 20px; /* Espaço abaixo do título */
  text-align: center; /* Centraliza o título */
`;

export const OpenFlavorButton = styled.button`
 background-color: #f0f0f0; /* Fundo cinza claro */
  color: #333; /* Cor do texto escura para contraste */
  border: 1px solid #ccc; /* Borda cinza clara */
  padding: 8px 10px; /* Espaçamento interno */
  border-radius: 8px; /* Bordas arredondadas */
  font-size: 12px; /* Tamanho da fonte */
  cursor: pointer; /* Cursor pointer ao passar o mouse */
  transition: background-color 0.3s, border-color 0.3s; /* Transições suaves para hover */

  &:hover {
    background-color: #e0e0e0; /* Fundo levemente mais escuro ao passar o mouse */
    border-color: #bbb; /* Borda levemente mais escura ao passar o mouse */
  }

  &:focus {
    outline: none; /* Remove o contorno padrão do botão */
  }
`;