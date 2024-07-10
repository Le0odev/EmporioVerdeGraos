// Arquivo StyledReport.tsx

import styled from 'styled-components';

const colors = {
  primary: '#4CAF50',
  primaryDark: '#388E3C',
  background: '#f9f9f9',
  text: '#333',
  white: '#FFFFFF',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

const fonts = {
  main: 'Arial, sans-serif',
};

export const Container = styled.div`
  padding: 25px;
  background-color: ${colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 8px ${colors.shadow};
  font-family: ${fonts.main};
  max-width: 800px;
  margin: auto;
`;

export const Title = styled.h1`
  text-align: center;
  color: ${colors.primaryDark};
  font-size: 2.5em;
  margin-bottom: 20px;
`;

export const SalesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SalesItem = styled.li`
  padding: 15px;
  background-color: ${colors.white};
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid ${colors.text};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const FilterLabel = styled.label`
  margin-right: 10px;
  color: ${colors.text};
  font-weight: bold;
`;

export const FilterInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${colors.text};
  font-size: 1em;
  outline: none;

  &:focus {
    border-color: ${colors.primary};
  }
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${colors.primaryDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const TotalContainer = styled.div`
  background-color: ${colors.background};
  padding: 15px;
  border-top: 1px solid ${colors.text};
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  color: ${colors.primaryDark};
  margin-top: 20px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PaginationButton = styled(Button)`
  margin: 0 5px;
`;
