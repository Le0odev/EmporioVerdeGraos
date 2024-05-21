// src/components/StyledComponents.ts
import styled from 'styled-components';

export const ProductContainer = styled.div`
  margin: 24px;
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  border: double 1.5px #333;
  border-radius: 6px;
  
`;

export const Section = styled.div`
  margin: 20px;
  max-width: 890px;
  flex: 1;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h1`
  margin: 15px;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  margin: 15px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
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
