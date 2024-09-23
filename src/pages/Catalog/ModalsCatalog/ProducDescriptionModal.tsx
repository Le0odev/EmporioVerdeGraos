import React, { useState } from 'react';
import { ModalContainer, ModalContent, CloseButton, BuyButton } from '../StyledModals/StyledModal';
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
        
        <h2>{product.productName}</h2>
        <p>{product.productDescription}</p>
        {product.bulk && <p>Peso: {product.bulk}</p>}
        
        {/* Renderiza o seletor de sabor apenas se houver sabores disponíveis */}
        {availableFlavors.length > 0 && (
          <div>
            <h4>Escolha um sabor:</h4>
            {availableFlavors.map(flavor => (
              <label key={flavor}>
                <input
                  type="radio"
                  name="flavor"
                  value={flavor}
                  checked={selectedFlavor === flavor}
                  onChange={() => setSelectedFlavor(flavor)} // Atualiza o sabor selecionado
                />
                {flavor}
              </label>
            ))}
          </div>
        )}

        <BuyButton onClick={handleBuyClick}>
          Comprar
        </BuyButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default ProductDescriptionModal;
