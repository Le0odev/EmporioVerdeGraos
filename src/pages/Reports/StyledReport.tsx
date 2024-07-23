import styled from 'styled-components';

const colors = {
  primary: '#4CAF50',
  primaryDark: '#388E3C',
  background: '#f9f9f9',
  text: '#333',
  white: '#FFFFFF',
  shadow: 'rgba(0, 0, 0, 0.1)',
  lightGray: '#f1f1f1',
  hoverGray: '#e0e0e0',
};

const fonts = {
  main: 'Arial, sans-serif',
};

interface ButtonProps {
  active: boolean;
}

export const Container = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, ${colors.white} 0%, ${colors.lightGray} 100%);
  border-radius: 15px;
  box-shadow: 0 6px 12px ${colors.shadow};
  font-family: ${fonts.main};
  max-width: 800px;
  margin: 20px auto;
  transition: all 0.3s ease;

  
`;

export const Title = styled.h1`
  text-align: center;
  color: ${colors.primaryDark};
  font-size: 2em;
  margin-bottom: 20px;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    color: ${colors.primary};
    transform: translateY(-5px);
  }
`;

export const SalesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 300px;
  overflow-y: auto;
`;

export const SalesItem = styled.div`
  background-color: ${colors.white};
  padding: 15px;
  margin: 5px 0;
  width: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 8px ${colors.shadow};
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px ${colors.shadow};
    background-color: ${colors.hoverGray};
    cursor:pointer;
  }

  .date {
    font-weight: bold;
    color: ${colors.primaryDark};
  }

  .total {
    color: ${colors.primary};
    font-size: 1.1em;
    margin-top: 5px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

export const FilterLabel = styled.label`
  margin-bottom: 8px;
  color: ${colors.text};
  font-weight: bold;
`;

export const FilterInput = styled.input`
  padding: 8px;
  margin-right: 8px;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 5px ${colors.primary};
    outline: none;
  }
`;

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => (props.active ? colors.primary : colors.lightGray)};
  color: ${colors.white};
  padding: 11px 19px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin: 3px;

  &:hover {
    background-color: ${(props) => (props.active ? colors.primaryDark : colors.hoverGray)};
    transform: translateY(-2px);
  }

  
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

export const PaginationButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${colors.primaryDark};
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px ${colors.primary};
  }
`;

export const TotalContainer = styled.div`
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
  font-size: 1.8rem;
  color: ${colors.primaryDark};
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }
`;
