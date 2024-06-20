import styled from 'styled-components';

export const VendaContainer = styled.div`
  display: flex;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
  height: 90vh;
`;

export const SearchSection = styled.div`
  flex: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
`;

export const VendaSection = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  color: #555;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 1rem 0;
  overflow-y: auto;
`;

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ProductName = styled.span`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ProductPrice = styled.span`
  color: #007bff;
  margin-bottom: 1rem;
`;

export const CartList = styled.ul`
  list-style-type: none;
  padding: 0;
  flex: 1;
  overflow-y: auto;
`;

export const CartItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const CartItemDetails = styled.div`
  flex: 1;
`;

export const CartActions = styled.div`
  display: flex;
  align-items: center;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  span {
    margin: 0 0.5rem;
  }

  svg {
    cursor: pointer;
    color: #007bff;
  }
`;

export const CheckoutButton = styled(Button)`
  margin-top: 1rem;
`;

export const GranelInput = styled(Input)`
  margin-top: 8px;
`;

export const SubtotalContainer = styled.div`
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 1rem;
`;

export const SubtotalLabel = styled.h3`
  margin-bottom: 1rem;
  color: #555;
`;

export const SubtotalAmount = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
`;

export const EmptyCartMessage = styled.p`
  margin-top: 2rem;
  text-align: center;
  color: #777;
`;

export const CheckoutSection = styled.div`
  padding: 1rem;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 1.5rem;
`;
