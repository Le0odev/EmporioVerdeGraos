import styled from 'styled-components';
import { FaExclamationTriangle, FaCartPlus } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 16px;
  border: 1px solid #ddd; 
  border-radius: 8px;
  background-color: #f8f8f8; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 16px;
  color: #333;
  margin-top:10px;
  margin-bottom: 12px;
  border-bottom: 2px solid #ddd;
  padding-bottom: 4px;
`;

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding: 0 8px;
`;

export const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #e0e0e0; 
  border-radius: 4px;
  background-color: #fff; 
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
    transform: translateY(-1px);
  }
`;

export const ProductText = styled.p`
  font-size: 13px;
  margin: 0;
  font-weight: 600;
  color: #444;

  span {
    font-weight: 400;
    color: #666;
  }
`;

export const AttentionIcon = styled(FaExclamationTriangle)`
  font-size: 14px;
  color: #e67e22;
`;

export const OrderIcon = styled(FaCartPlus)`
  font-size: 14px;
  color: #27ae60;
`;

export const NoProductsText = styled.p`
  font-size: 12px;
  color: #777;
  text-align: center;
  padding: 16px 0;
`;

export const AddButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #218838;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const SubButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: #0069d9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const SelectCategory = styled.select`
  padding: 8px;
  font-size: 0.9rem;
  border: 1px solid #ccc; 
  border-radius: 4px;
  width: 100%;
  max-width: 250px;
  margin-bottom: 16px;
  cursor: pointer;

  option {
    font-size: 0.9rem;
  }
`;

export const ContainerButton = styled.div`
  margin-top: 14px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;
