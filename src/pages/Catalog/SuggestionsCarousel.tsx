import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { Product } from './Product'; // Ajuste o caminho conforme necessário
import {
  SuggestionCard,
  SuggestionImage,
  SuggestionDetails,
  SuggestionName,
  SuggestionPrice,
  AddIcon,
  SliderContainer
} from './StyledCarroussel'; // Ajuste o caminho conforme necessário

interface CarouselProps {
  suggestions: Product[];
  onAddToCart: (product: Product) => void;
}

const SuggestionsCarousel: React.FC<CarouselProps> = ({ suggestions, onAddToCart }) => {
  const settings = {
    slidesToShow: 2, // Mostra 2 slides por vez
    slidesToScroll: 1, // Move 1 slide por vez
    infinite: true, // Torna o slider infinito
    centerMode: false, // Desativa o modo centralizado para garantir alinhamento
    centerPadding: '8px', // Adiciona espaçamento ao redor dos slides
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,

        },
      },
    ],
  };

  return (
      <Slider {...settings}>
        {suggestions.map((product: Product) => (
          <SuggestionCard key={product.id}>
            <SuggestionImage src={product.imageUrl} alt={product.productName} />
            <SuggestionDetails>
              <SuggestionName>{product.productName}</SuggestionName>
              {product.bulk ? (
                  <SuggestionPrice>Preço (KG): R${product.productPrice.toFixed(2)}</SuggestionPrice>
              ) : (
                <SuggestionPrice>Preço (UN): R${product.productPrice.toFixed(2)}</SuggestionPrice>
              )}
              <AddIcon onClick={() => onAddToCart(product)}>+</AddIcon>
            </SuggestionDetails>
          </SuggestionCard>
        ))}
      </Slider>
  );
};

export default SuggestionsCarousel;
