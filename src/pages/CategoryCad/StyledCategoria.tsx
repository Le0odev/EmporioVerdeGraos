import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

export const CategoriaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 24px;
  margin-top: 2.5rem;
`;

export const Section = styled.section`
  width: 58%;
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 15px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  margin-bottom: 8px;
  color: #555;
`;

export const Input = styled.input`
  padding: 12px;
  width: calc(100% - 24px);
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
  font-size: 32px;
  margin-bottom: 40px;
  background-color: #343a40;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Card = styled.div`
  width: 100%;
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  background-color: #eef2f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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

export const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const CardItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
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


export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* Espaçamento entre o campo e o botão */
`;

export const CardInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  outline: none;
`;

export const SearchButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SearchButtonIcon = styled.span`
  margin-right: 5px;
  font-size: 16px;
`;

export const CategoryName = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

export const EditIcon = styled(FaEdit)`
  cursor: pointer;
  font-size: 20px;
  margin-left: auto;
  margin-right: 10px;
  color: #007bff;

  &:hover {
    font-size: 22px;
    color: #0056b3;
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  cursor: pointer;
  font-size: 20px;
  color: red;

  &:hover {
    font-size: 22px;
    color: darkred;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageButton = styled.span<{ active?: boolean }>`
  padding: 8px;
  margin: 0 4px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${props => (props.active ? '#007bff' : '#ddd')};
  color: ${props => (props.active ? '#fff' : '#333')};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#ccc')};
  }
`;
