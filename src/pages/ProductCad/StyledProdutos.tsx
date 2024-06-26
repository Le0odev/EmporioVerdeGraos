import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

export const ProductContainer = styled.div`
  margin: 24px;
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  

`;

export const Section = styled.div`
  margin: 20px;
  max-width: 890px;
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  

`;

export const SectionTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const Form = styled.form`
  margin: 15px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
`;

export const Input = styled.input`
  width: calc(100% - 24px);
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Select = styled.select`
  width: calc(100% - 24px);
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const H1 = styled.h1`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  margin: 0;
`;

export const CardInput = styled.input`
  width: 400px;
  height: 40px;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  outline: none; /* Remove a borda ao focar */
  margin-right: 1rem;
`;

export const CardButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// Ícone de pesquisa
export const SearchIcon = styled.span`
  margin-right: 10px;
`;

// Ícone de lupa
export const SearchButtonIcon = styled.span`
  margin-right: 8px;
`;

export const Card = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  background-color: #5492a6;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);




`;

export const CardList = styled.ul`
  margin: -4px;
  padding: 0;
`;

export const CardItem = styled.li`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 18px;
  margin: 12px;
  padding: 12px;
  border-radius: 6px;
  background-color: #f9f9f9;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ccc;
  }
`;

export const ProductName = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

export const ProductPrice = styled.span`
  color: #007bff;
`;

export const EditIcon = styled(FaEdit)`
  color: #6c757d;
  cursor: pointer;
  font-size: 20px;
  margin-left: auto; /* Move para o canto direito */
  color: #007bff; 

  &:hover {
    font-size: 25px;
    color: #0056b3;
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  color: #6c757d;
  margin-right: 10px;
  cursor: pointer;
  color: red;

  &:hover {
    font-size: 20px;
    color: red;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const CheckboxLabel = styled.label`
  font-size: 20px;
  color: #555;
`;

export const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 8px;
`;
