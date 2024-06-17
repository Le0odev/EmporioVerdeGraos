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
  width: 48%;
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
  padding: 5px;
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
  margin-bottom: 20px;
  background-color: #333;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  margin: 0;
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
  list-style-type: none;
  padding: 0;
  margin: -4px;
  padding: 0;
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

export const CardButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CardInput = styled(Input)`
  width: 400px;
  height: 40px;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
 width: calc(100% - 24px);
  margin-right: 1rem;
  


   &:hover {
    
  }
`;

export const SearchButtonIcon = styled.span`
  margin-right: 5px;
`;

export const CategoryName = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
`;

export const EditIcon = styled(FaEdit)`
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;

  &:hover {
    color: #0056b3;
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;

  &:hover {
    color: red;
  }
`;

export const CardButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

