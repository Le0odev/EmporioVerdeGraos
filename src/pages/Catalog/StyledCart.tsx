// StyledCart.ts
import styled from 'styled-components';

export const CartContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
  max-width: 800px;
  margin: 1rem auto;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
`;

export const CartItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
`;

export const CartItemDetails = styled.div`
  flex: 1;
`;

export const CartItemName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

export const CartItemPrice = styled.p`
  font-size: 1rem;
  color: #555;
`;

export const RemoveButton = styled.button`
  background-color: #ff4d4d;
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e60000;
  }
`;

export const CartItemQuantity = styled.p`
  font-size: 1rem;
  color: #333;
  margin: 0;
  margin-top: 0.5rem;
`;
