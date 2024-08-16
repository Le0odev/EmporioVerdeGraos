import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext'; // Importa o contexto do carrinho
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
  Header,
  Title,
  IconButton,
  SearchContainer,
  SearchIcon,
  LogoImage,
  AddToCartButton
} from './StyledCatalog';
import { Category, Product } from './Product'; // Corrigi o caminho do import
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Para redirecionamento
import { Footer } from '../../components/Footer/Footer';


const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { addToCart } = useCart(); // Usa o contexto do carrinho
  const navigate = useNavigate(); // Hook para redirecionamento
  const { getCartItemCount } = useCart();
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
    addToCart(product); // Adiciona ao carrinho
  };

  const handleGoToCart = () => {
    navigate('/cart'); // Redireciona para a página do carrinho
  };

  return (
    <>
    <CatalogContainer>
      <Header>
        <LogoImage src="/src/assets/logo.png" alt="Company Logo" />
        <Title>Empório Verde Grãos</Title>
        <IconButton>
          <FiShoppingCart onClick={handleGoToCart}/>
          {itemCount > 0 && (
            <span>{itemCount}</span> // Adiciona o contador aqui
          )}
        </IconButton>
      </Header>
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
    </>
  );

};

export default Catalog;
