import styled from "styled-components";

const colors = {
  primary: '#2d3748',
  secondary: '#f7fafc',
  accent: '#38a169',
  text: '#1a202c',
  lightText: '#718096',
  border: '#ddd',
  shadow: 'rgba(0, 0, 0, 0.1)',
  background: '#edf2f7',
  headerBackground: '#38a169',
  filterButtonBackground: '#2d3748',
  selectedFilterBackground: '#38a169',
};

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 0.6rem 2.5rem;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 14px;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.6rem 2rem;
  }
`;

export const SearchIcon = styled.i`
  position: absolute;
  left: 13px;
  top: 55%;
  transform: translateY(-50%);
  color: ${colors.lightText};
  font-size: 17px;

  @media (max-width: 768px) {
    font-size: 1rem;
    left: 12px;
  }
`;