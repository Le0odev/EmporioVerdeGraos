import styled from 'styled-components';
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 14px;
`;

export const Section = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 16px;
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 32px);
`;

export const SectionTitle = styled.h2`
  margin-bottom: 16px;
  font-size: 20px;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Label = styled.label`
  font-weight: bold;
  color: #555;
  font-size: 14px;
`;

export const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 10px;
  text-align: center;
`;

export const Card = styled.div`
  max-width: 100%;
`;

export const ProductName = styled.h3`
  font-size: 16px;
  margin: 6px 0;
`;

export const ProductPrice = styled.p`
  font-size: 14px;
  color: #007bff;
`;

export const EditIcon = styled(FaEdit)`
  color: #28a745;
  margin-right: auto;
`;

export const DeleteIcon = styled(FaTrashAlt)`
  color: #dc3545;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

export const ToggleButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  height: 25%;
  width: 25%;
  padding: 4px 16px;
  background: ${(props) => (props.active ? '#007bff' : '#f1f1f1')};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  border: none;
  border-radius: 30%;
  cursor: pointer;
  flex: 1;
  font-size: 14px;
  
  &:hover {
    background: ${(props) => (props.active ? '#0056b3' : '#ddd')};
  }
`;

export const Image = styled.img`
  max-width: 60px;
  height: auto;
  border-radius: 4px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckboxLabel = styled(Label)`
  margin-right: 8px;
  font-size: 16px;
`;

export const CheckboxInput = styled.input`
  margin-right: 4px;
`;

export const CardButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  margin: 0 4px;
  transition: color 0.3s;
  
  &:hover {
    color: #007bff;
  }

  svg {
    font-size: 18px;
  }
`;

// Ajuste do campo de pesquisa
export const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 12px;
  box-sizing: border-box;
`;


