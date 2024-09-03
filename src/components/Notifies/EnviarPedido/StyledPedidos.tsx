import styled from 'styled-components';
import { FaCartPlus } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 20px auto;
  margin-top: 0px;
`;

export const Title = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  margin-bottom: 10px;
  width: 100%;
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
`;

export const ProductItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProductText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  
`;

export const ProductTextSpan = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #999;
  
`;

export const QuantityInput = styled.input`
  width: 100px;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
`;

export const Button = styled.button`
  background-color: #27ae60;
  color: #ffffff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #229954;
  }

  &.secondary {
    background-color: #2980b9;
    &:hover {
      background-color: #2471a3;
    }
  }
`;

export const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
`;

export const SuccessMessage = styled.p`
  color: #2ecc71;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
`;


export const ContainerButton = styled.div `
  display: flex;
  gap: 15px;
`;

export const AddButton = styled.button`
  width: 43px;
  background-color: #28a745; 
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  gap: 8px;
  margin-bottom: 10px;

  &:hover {
    background-color: #218838; 
  }

  & .icon {
    font-size: 20px;
  }
`;