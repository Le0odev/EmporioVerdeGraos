import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import WeightModal from './ModalsCatalog/WeightModal';
import QuestionModal from './ModalsCatalog/QuestionModal';
import FlavorModal from './ModalsCatalog/FlavorModal'; 
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
import HeaderCart from '../../components/Header/HeadrCart/HeaderCart';
import ProductDescriptionModal from './ModalsCatalog/ProducDescriptionModal';

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
  const [expandedProduct, setExpandedProduct] = useState<Product | null>(null);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState<boolean>(false);
  const [flavorModalOpen, setFlavorModalOpen] = useState<boolean>(false);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const { addToCart, getCartItemCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getCartItemCount();

  const handleToggleDescription = (product: Product) => {
    setExpandedProduct(expandedProduct?.id === product.id ? null : product);
  };

  // Fetching categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://systemallback-end-production.up.railway.app/public/catalog/categories');
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

  // Fetching products based on search and category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://systemallback-end-production.up.railway.app/public/catalog/search', {
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

  // Handling adding to cart
  const handleAddToCart = (product: Product) => {
    setCurrentProduct(product); // Set current product before opening modal
    if (product.bulk) {
      setModalOpen(true);
    } else if (product.flavors && product.flavors.length > 0) {
      setFlavorModalOpen(true); // Open flavor selection modal
    } else {
      addToCart(product); // Directly add to cart
      setQuestionModalOpen(true);
       
    }
  };

  // Handling weight modal submission
  const handleModalSubmit = (weight: number) => {
    if (currentProduct) {
      addToCart(currentProduct, weight); // Add to cart with weight
      setCurrentProduct(null);
      setModalOpen(false);
      setQuestionModalOpen(true);
    }
  };

  
const handleFlavorSelect = (flavor: string) => {
  setSelectedFlavor(flavor); // Armazena o sabor selecionado
  if (currentProduct) {
       // @ts-ignore
    addToCart(currentProduct, 1, flavor); // Passa 1 como peso padrão para sabor
    setQuestionModalOpen(true);
  }
};

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    setQuestionModalOpen(false);
  };

  const handleOpenDescriptionModal = (product: Product) => {
    setCurrentProduct(product);
    setDescriptionModalOpen(true);
  };

  const handleCloseDescriptionModal = () => {
    setDescriptionModalOpen(false);
  };

  return (
    <>
      <HeaderCart handleGoToCart={handleGoToCart} />

      <CatalogContainer>
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
          <p>Carregando....</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ProductList>
            {products.map((product) => (
              <ProductCard key={product.id} onClick={() => handleOpenDescriptionModal(product)}>
                <ProductImage src={product.imageUrl} alt={product.productName} />
                <ProductName>{product.productName}</ProductName>
                <ProductPrice>R${product.productPrice.toFixed(2)}</ProductPrice>
                <AddToCartButton onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                  Comprar
                </AddToCartButton>
              </ProductCard>
            ))}
          </ProductList>
        )}
      </CatalogContainer>

      <ProductDescriptionModal
        product={currentProduct}
        isOpen={descriptionModalOpen}
        onClose={handleCloseDescriptionModal}
        onBuy={handleAddToCart}
      />
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
      <FlavorModal
        isOpen={flavorModalOpen}
        onClose={() => setFlavorModalOpen(false)}
        flavors={currentProduct?.flavors || []} // Pass flavors from current product
        onSelectFlavor={handleFlavorSelect} // Handle flavor selection
      />
    </>
  );
};

export default Catalog;
