// Catalog.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import WeightModal from './WeightModal';
import QuestionModal from './QuestionModal';
import {
  CatalogContainer,
  SearchBar,
  FiltersContainer,
  FilterButton,
  ProductList,
  ProductCard,
  ProductImage,
  ProductName,
  ProductPrice,
  SearchContainer,
  SearchIcon,
  AddToCartButton
} from './StyledCatalog';
import { Category, Product } from './Product';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import HeaderCart from '../../components/Header/HeadrCart/HeaderCart';

const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [questionModalOpen, setQuestionModalOpen] = useState<boolean>(false);

  const { addToCart, getCartItemCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getCartItemCount();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/public/catalog/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        setError('Erro ao buscar categorias.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/public/catalog/search', {
          params: {
            productName: searchTerm,
            categoryId: selectedCategory,
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setError('Erro ao buscar produtos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product: Product) => {
    if (product.bulk) {
      setCurrentProduct(product);
      setModalOpen(true);
    } else {
      addToCart(product);
      setQuestionModalOpen(true);
    }
  };

  const handleModalSubmit = (weight: number) => {
    if (currentProduct) {
      addToCart(currentProduct, weight);
      setCurrentProduct(null);
      setModalOpen(false);
      setQuestionModalOpen(true);
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    setQuestionModalOpen(false);
  };

  return (
    <>
      <CatalogContainer>
        <HeaderCart handleGoToCart={handleGoToCart} />
        <SearchContainer>
          <SearchIcon>
            <FiSearch />
          </SearchIcon>
          <SearchBar
            type="text"
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <FiltersContainer>
          <FilterButton onClick={() => setSelectedCategory(null)}>Todos</FilterButton>
          {categories.map((category) => (
            <FilterButton
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.categoryName}
            </FilterButton>
          ))}
        </FiltersContainer>
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ProductList>
            {products.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage src={product.imageUrl} alt={product.productName} />
                <ProductName>{product.productName}</ProductName>
                <ProductPrice>R${product.productPrice.toFixed(2)}</ProductPrice>
                <AddToCartButton onClick={() => handleAddToCart(product)}>
                  Comprar
                </AddToCartButton>
              </ProductCard>
            ))}
          </ProductList>
        )}
      </CatalogContainer>
      <Footer />
      <WeightModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
      <QuestionModal 
        isOpen={questionModalOpen}
        onClose={() => setQuestionModalOpen(false)}
        onContinueShopping={handleContinueShopping}
        onGoToCart={handleGoToCart}
      />
    </>
  );
};

export default Catalog;