import { darken, lighten, rgba } from "polished"
import styled from "styled-components"
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Se estiver usando react-icons, adicione as setas


const colors = {
  primary: "#2E7D32", // Um verde mais escuro e sofisticado
  secondary: "#ffffff",
  background: "#F5F7FA", // Um fundo ligeiramente mais frio
  text: "#1A202C", // Um cinza mais escuro para melhor contraste
  accent: "#43A047", // Um verde mais claro para acentos
  border: "#E2E8F0",
  shadow: "rgba(0, 0, 0, 0.08)",
  selectedFilterBackground: "#43A047",
  filterButtonBackground: "#ffffff",
  lightText: "#718096",
}

export const CatalogContainer = styled.div`
  margin: 10px auto;
  width: 100%;
  max-width: 1280px;
  background-color: ${colors.background};
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-sizing: border-box;
  border-radius: 16px;


  @media (max-width: 768px) {
    width: 94%;
    margin: 10px auto;
    height: 80%;
    padding: 1rem;
    gap: 1.5rem;
    background-color: ${colors.background};
    min-height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    border-radius: 16px;
    box-shadow: 0 4px 8px ${colors.shadow}; 
    box-sizing: border-box;

  }
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background-color: ${colors.primary};
  box-shadow: 0 2px 4px ${rgba(colors.shadow, 0.1)};
  padding: 1rem 2rem;
  margin: -2rem -2rem 0;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    margin: -1.5rem -1.5rem 0;
  }
`

export const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: ${colors.secondary};
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 8px ${rgba(colors.shadow, 0.08)};
  display: flex;
  align-items: center;
  transition: box-shadow 0.3s ease;

  &:focus-within {
    box-shadow: 0 4px 12px ${rgba(colors.shadow, 0.12)};
  }
`

export const SearchBar = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  color: ${colors.text};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${colors.lightText};
  }
`

export const SearchIcon = styled.i`
  color: ${colors.lightText};
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
`

export const FiltersWrapper = styled.div<{ showLeftArrow: boolean }>`
  position: relative;
  width: 100%;
  padding-left: ${(props) => (props.showLeftArrow ? "2rem" : "0")};
  padding-right: 2rem;
  margin: 0.5rem 0;
`

export const FiltersContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`

export const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #ffffff;
  border: 1px solid #E2E8F0;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  padding: 0;
  color: #718096;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #f8f9fa;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  svg {
    width: 12px;
    height: 12px;
  }
`

export const FilterButton = styled.button<{ selected?: boolean }>`
  background-color: ${(props) => (props.selected ? colors.selectedFilterBackground : colors.filterButtonBackground)};
  color: ${(props) => (props.selected ? colors.secondary : colors.text)};
  border: 1px solid ${(props) => (props.selected ? "transparent" : colors.border)};
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: ${(props) => (props.selected ? `0 2px 4px ${rgba(colors.primary, 0.2)}` : "none")};

  &:hover {
    background-color: ${(props) => (props.selected ? darken(0.05, colors.selectedFilterBackground) : lighten(0.05, colors.filterButtonBackground))};
    transform: translateY(-1px);
  }
`

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  background-color: ${colors.background};

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 0.75rem;
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1rem;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
    padding: 1.25rem;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const ProductCard = styled.div`
  background-color: ${colors.secondary};
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;
  border: 1px solid ${colors.border};
  padding: 0.5rem;

  &:hover {
    box-shadow: 0 4px 6px ${colors.shadow};
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
  }
`;

export const ProductImageContainer = styled.div`
  position: relative;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.background};
  aspect-ratio: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${colors.border};
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
  }
`;

export const ProductImage = styled.img`
  width: 75%;
  height: 75%;
  object-fit: contain;
  transition: transform 0.2s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    width: 70%;
    height: 70%;
  }
`;

export const ProductInfo = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  @media (max-width: 480px) {
    padding: 0.4rem;
  }
`;

export const ProductName = styled.h3`
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${colors.text};
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
  min-height: 2.2em;
  margin-top: 0.5rem;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
    line-height: 1.2;
  }
`;


export const ProductPrice = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${colors.primary};
  margin: 0;
  display: flex;
  align-items: center;
  

  @media (max-width: 768px) {
    
  }
`;

export const AddToCartButton = styled.button`
  width: 100%;
  background-color: ${colors.primary};
  color: ${colors.secondary};
  border: none;
  padding: 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-top: 0.25rem;

  &:hover {
    background-color: ${colors.accent};
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    font-size: 0.75rem;
  }
`;


export const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${colors.secondary};
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`

export const CartCount = styled.span`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background-color: ${colors.accent};
  color: ${colors.secondary};
  font-size: 0.75rem;
  font-weight: 700;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px ${rgba(colors.shadow, 0.2)};
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

export const LogoImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  box-shadow: 0 2px 4px ${rgba(colors.shadow, 0.2)};
`

export const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.secondary};
  margin: 0;
  text-shadow: 1px 1px 2px ${rgba(0, 0, 0, 0.1)};

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`

