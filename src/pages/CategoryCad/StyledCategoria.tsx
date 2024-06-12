import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';

export const CategoriaContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Section = styled.section`
  width: 48%;
`;

export const SectionTitle = styled.h2`
  margin-bottom: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

export const Button = styled.button`
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const H1 = styled.h1`
  margin-bottom: 20px;
`;

export const Card = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
`;

export const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const CardItem = styled.li`
  margin-bottom: 10px;
`;

export const CardButton = styled(Button)`
  display: flex;
  align-items: center;
`;

export const CardInput = styled(Input)`
  margin-right: 10px;
`;

export const SearchButtonIcon = styled.span`
  margin-right: 5px;
`;

export const CategoryName = styled.span`
  font-weight: bold;
`;

export const EditIcon = styled(FaEdit)`
  margin-right: 5px;
`;

export const DeleteIcon = styled(FaTrashAlt)`
  margin-right: 5px;
`;
