import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
 

  
`;

export const Form = styled.form`
 
  width: 55%;
  padding: 2.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #555;
`;

export const Title = styled.h2`

  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ccc;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: #f7f7f7;
`;

export const Input = styled.input`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #f7f7f7;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #f7f7f7;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccc;
    color: #333;
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 0.5rem;
  color: #f00;
`;


export const H2 = styled.h1`
  
  color: #f7f7f7;
  padding: 20px;
  border-radius: 6px;
  margin: 0;
`;
