// ProductDescriptionModal.tsx
import React from 'react';
import { ModalContainer, ModalContent, CloseButton, BuyButton } from '../StyledModals/StyledModal'
import { Product } from '../Product';

interface ProductDescriptionModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: (product: Product) => void;  // Atualizando para aceitar um produto
}

const ProductDescriptionModal: React.FC<ProductDescriptionModalProps> = ({ product, isOpen, onClose, onBuy}) => {
  if (!product || !isOpen) {
    return null;
  }


  const handleBuyClick = () => {
    onBuy(product); // Chama a função de compra com o produto atual
    onClose(); // Fecha o modal após a compra
  };


  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        <h2>{product.productName}</h2>
        <p>{product.productDescription}</p>
        {product.bulk && <p>Peso: {product.bulk}</p>}
        <BuyButton onClick={handleBuyClick}>Comprar</BuyButton>
        </ModalContent>
    </ModalContainer>
  );
};

export default ProductDescriptionModal;
