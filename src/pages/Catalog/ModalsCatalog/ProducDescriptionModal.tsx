import React, { useState } from 'react';
import { ModalContainer, ModalContent, CloseButton, BuyButton, ProductTitle, ProductDescription, ProductWeight, FlavorSelectorWrapper, FlavorTitle, FlavorLabel, FlavorInput } from '../StyledModals/StyledModal';
import { Product } from '../Product';
import { FaTimes } from 'react-icons/fa'; // Importando o ícone de fechamento

interface ProductDescriptionModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: (product: Product, flavor?: string) => void; // Mantém a função onBuy com o sabor
}

const ProductDescriptionModal: React.FC<ProductDescriptionModalProps> = ({ product, isOpen, onClose, onBuy }) => {
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null); // Estado para o sabor selecionado

  if (!product || !isOpen) {
    return null;
  }

  // Sabores disponíveis para o produto (se houver)
  const availableFlavors = product.flavors || []; // Assumimos que 'flavors' está disponível no 'product'

  const handleBuyClick = () => {
    onBuy(product, selectedFlavor ?? undefined); // Passa o sabor selecionado ou undefined se for null
    onClose();
  };

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FaTimes /> {/* Ícone de fechar */}
        </CloseButton>
        
        <ProductTitle>{product.productName}</ProductTitle>
        <ProductDescription>Unidade: {product.productDescription}</ProductDescription>

        {product.bulk && <ProductWeight>Peso: {product.bulk}</ProductWeight>}
        
     
      <BuyButton onClick={handleBuyClick} >
        Comprar
      </BuyButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default ProductDescriptionModal;
