import { darken } from "polished";
import styled from "styled-components";

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


export const Title = styled.h1`
  font-size: 2.25rem; // Aumentei um pouco o tamanho da fonte
  font-weight: bold;
  color: ${colors.secondary}; // contraste maior com o fundo
  text-align: center;
  margin: 0;
  text-shadow: 1px 1px ${colors.shadow}; // efeito de sombra no texto

  @media (max-width: 768px) {
    font-size: 1.4rem; //telas menores
  }
`;

export const IconButton = styled.button`
  margin-top: 1px;
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
    top: 13px; // Ajuste conforme necessário
    right: 11px; // Ajuste conforme necessário
    background: red;
    color: white;
    border-radius: 50%;
    padding: 1.5px 6px;
    font-size: 12px;
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

export const LogoImage = styled.img`
  width: 3rem;
  height: auto;
  object-fit: contain;
  border-radius: 50%; // Tornei a logo circular


  @media (max-width: 768px) {
    width: 2.2rem;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  margin-top: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  color: #f7fafc;
`;