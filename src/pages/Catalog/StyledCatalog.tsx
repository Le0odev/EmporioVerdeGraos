import { darken } from 'polished';
import styled from 'styled-components';

const colors = {
  primary: '#2d3748',
  secondary: '#f7fafc',
  accent: '#38a169',
  text: '#1a202c',
  lightText: '#718096',
  border: '#e2e8f0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  background: '#edf2f7',
  headerBackground: '#38a169',
  filterButtonBackground: '#2d3748',
  selectedFilterBackground: '#38a169',
};

export const Header = styled.header`
  background: ${colors.headerBackground};
  color: ${colors.secondary};
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px ${colors.shadow};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  border-radius: 0 0 16px 16px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

export const CatalogContainer = styled.div`
  margin: 10px;
  margin-top: 4.5rem;
  background-color: ${colors.background};
  padding: 2rem;
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 8px ${colors.shadow}; 
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.25rem; // Aumentei um pouco o tamanho da fonte
  font-weight: bold;
  color: ${colors.secondary}; // Mudança para um contraste maior com o fundo
  text-align: center;
  margin: 0;
  text-shadow: 1px 1px ${colors.shadow}; // Pequeno efeito de sombra no texto

  @media (max-width: 768px) {
    font-size: 1.45rem; // Ajuste para telas menores
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${colors.secondary};
  cursor: pointer;
  font-size: 2rem;
  transition: color 0.3s ease, transform 0.3s ease;

   svg {
    font-size: 24px;
  }

  span {
    position: absolute;
    top: 8px; // Ajuste conforme necessário
    right: 8px; // Ajuste conforme necessário
    background: red;
    color: white;
    border-radius: 50%;
    padding: 1px 5px;
    font-size: 13px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    color: ${darken(0.1, colors.secondary)};
  }

  @media (max-width: 768px) {
    font-size: 1.55rem;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem;
  border: 1px solid ${colors.border};
  border-radius: 60px;
  font-size: 1rem;
  background-color: ${colors.secondary};
  box-shadow: 0 2px 4px ${colors.shadow};
  transition: box-shadow 0.3s ease, border-color 0.3s ease;

  &:focus {
    box-shadow: 0 0 8px ${colors.accent};
    outline: none;
    border-color: ${colors.accent};
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.6rem 2rem;
  }
`;

export const SearchIcon = styled.i`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${colors.lightText};
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    left: 12px;
  }
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: center;
  padding-bottom: 8px;
`;

export const FilterButton = styled.button<{ selected?: boolean }>`
  background-color: ${props => props.selected ? colors.selectedFilterBackground : colors.filterButtonBackground};
  color: ${colors.secondary}; 
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${darken(0.1, colors.accent)};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
  }
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 0;
  max-width: 100%; 
  margin: 0 auto; 
  height: auto; 
  box-sizing: border-box;

   @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ProductCard = styled.div`
  background-color: ${colors.secondary};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: 0 4px 8px ${colors.shadow};
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.25rem; // Aumentei um pouco o padding
  text-align: center;
  position: relative;


  &:hover {
    box-shadow: 0 6px 12px ${colors.shadow};
    transform: translateY(-6px);
    cursor: pointer;
  }

  @media (max-width: 768px) {
    box-shadow: 0 2px 4px ${colors.shadow};
    padding: 1rem; 
  }
`;

export const AddToCartButton = styled.button`
  background-color: ${colors.accent};
  color: ${colors.secondary};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${darken(0.1, colors.accent)};
    transform: translateY(-3px) scale(1.05); // Corrigi a transformação para melhor efeito
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 4px ${colors.accent};
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.5rem 1rem;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  object-fit: cover;
  background-color: ${colors.background}

  @media (max-width: 768px) {
    object-fit: cover;
  }
`;

export const ProductName = styled.h3`
  font-size: 1rem;
  margin: 0.5rem 0;
  color: ${colors.text};
  font-weight: 600;
  border-top: 1px solid ${colors.border};

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: ${colors.accent};
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const LogoImage = styled.img`
  width: 3rem;
  height: auto;
  margin-right: 0.75rem;
  object-fit: contain;
  border-radius: 50%; // Tornei a logo circular

  @media (max-width: 768px) {
    width: 2.5rem;
  }
`;

