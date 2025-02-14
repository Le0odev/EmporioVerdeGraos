import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Ícone de fechar
import { 
  ModalContainer, ModalContent, CloseButton, BuyButton, 
  ProductTitle, ProductPrice, ProductDescription, 
  ProductWeight, ProductImage, FlavorSelectorWrapper, FlavorTitle, 
  FlavorLabel, FlavorInput, ProductCategory
} from '../StyledModals/StyledModal';
import { Product } from '../Product';

interface ProductDescriptionModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: (product: Product, flavor?: string) => void;
}

const ProductDescriptionModal: React.FC<ProductDescriptionModalProps> = ({ product, isOpen, onClose, onBuy }) => {
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);

  if (!product || !isOpen) {
    return null;
  }

  const availableFlavors = product.flavors || [];
  const handleBuyClick = () => {
    onBuy(product, selectedFlavor ?? undefined);
    onClose();
  };


  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}><FaTimes /></CloseButton>
        
        {/* Imagem do produto */}
        {product.imageUrl && <ProductImage src={product.imageUrl} alt={product.productName} />}
        
        {/* Nome do produto */}
        <ProductTitle>{product.productName}</ProductTitle>
        
        <ProductDescription>{product.productDescription}</ProductDescription>

        {/* Preço */}
        <ProductPrice>R${product.productPrice.toFixed(2)}</ProductPrice>
              
        
        {/* Peso, se aplicável */}
        {product.bulk && <ProductWeight>Peso: {product.bulk}</ProductWeight>}
        
        {/* Sabores */}
        {availableFlavors.length > 0 && (
          <FlavorSelectorWrapper>
            <FlavorTitle>Escolha o sabor:</FlavorTitle>
            {availableFlavors.map((flavor) => (
              <FlavorLabel key={flavor}>
                <FlavorInput 
                  type="radio" 
                  name="flavor" 
                  value={flavor} 
                  checked={selectedFlavor === flavor} 
                  onChange={() => setSelectedFlavor(flavor)} 
                />
                {flavor}
              </FlavorLabel>
            ))}
          </FlavorSelectorWrapper>
        )}
        
        {/* Botão de compra */}
        <BuyButton onClick={handleBuyClick}>Comprar</BuyButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default ProductDescriptionModal;
