import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ProductContainer,
  ContainerWrapper,
  Section,
  SectionTitle,
  Form,
  Label,
  Input,
  Select,
  Button,
  Card,
  CardList,
  CardItem,
  ProductPrice,
  ProductName,
  EditIcon,
  DeleteIcon,
  ToggleButtonContainer,
  ToggleButton,
  SearchInput,
  IconContainer,
  Image,
  CheckboxLabel,
  CheckboxContainer,
  CheckboxInput,
  CardButton
} from './StyledProdutos';
import { useAuth } from '../Login/authContext';

interface Categoria {
  id: string;
  categoryName: string;
}

interface Produto {
  id: string;
  productName: string;
  productPrice: number;
  productDescription: string;
  codeBar: string;
  categoryId: string;
  bulk: boolean;
  imageUrl: string;
}

const CadastrarProduto: React.FC = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [isBulk, setIsBulk] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isCadastroVisible, setIsCadastroVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const { token } = useAuth();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/category', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao obter categorias', error);
      }
    };

    fetchCategorias();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      productName: nome,
      productPrice: parseFloat(preco),
      productDescription: descricao,
      codeBar: codigoBarras,
      categoryId: categoriaSelecionada,
      bulk: isBulk,
      imageUrl: imageUrl
    };

    try {
      if (editId) {
        // Atualizar produto existente
        await axios.put(`http://localhost:8080/products/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Atualizar lista de produtos
        setProdutos(produtos.map(produto => produto.id === editId ? { ...produto, ...data } : produto));
        setEditId(null);
      } else {
        // Criar novo produto
        await axios.post('http://localhost:8080/products/cadastrar', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Atualizar a lista de produtos
        setProdutos([...produtos, data as Produto]);
      }

      // Limpar os campos após o cadastro ou atualização
      setNome('');
      setPreco('');
      setDescricao('');
      setCodigoBarras('');
      setCategoriaSelecionada('');
      setIsBulk(false);
      setImageUrl('');
    } catch (error) {
      console.error('Erro ao cadastrar ou atualizar produto:', error);
    }
  };

  const handleEdit = (produto: Produto) => {
    setNome(produto.productName);
    setPreco(produto.productPrice.toString());
    setDescricao(produto.productDescription);
    setCodigoBarras(produto.codeBar);
    setCategoriaSelecionada(produto.categoryId);
    setIsBulk(produto.bulk);
    setEditId(produto.id);
    setImageUrl(produto.imageUrl);

    setIsCadastroVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/products/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProdutos(produtos.filter(produto => produto.id !== id));
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };
  
  
  

  return (
    <>
      <H1>Gerenciamento de produtos:</H1>
      <ProductContainer>
        <Section className="product-section">
          <SectionTitle>{editId ? 'Atualizar Produto' : 'Cadastrar Produto'}</SectionTitle>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="nome">Nome do Produto</Label>
            <Input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <Label htmlFor="codigoBarras">Código de barras</Label>
            <Input
              type="text"
              id="codigoBarras"
              value={codigoBarras}
              onChange={(e) => setCodigoBarras(e.target.value)}
              required
            />
            <Label htmlFor="preco">Preço</Label>
            <Input
              type="number"
              id="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
            <Label htmlFor="descricao">Imagem URL</Label>
            <Input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <Label htmlFor="categoria">Categoria</Label>
            <Select
              id="categoria"
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>{categoria.categoryName}</option>
              ))}
            </Select>
            <CheckboxContainer>
              <CheckboxLabel htmlFor="isBulk">Produto a granel?</CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                id="isBulk"
                checked={isBulk}
                onChange={(e) => setIsBulk(e.target.checked)} // Atualiza o estado do checkbox
              />
            </CheckboxContainer>
            <Button type="submit">{editId ? 'Atualizar' : 'Cadastrar'}</Button>
          </Form>
        </Section>
        <Section className="search-section">
          <SectionTitle>Verificar existência do produto</SectionTitle>
          <Form onSubmit={(e) => { e.preventDefault(); searchProdutos(searchTerm); }}>
            <Label htmlFor="search">Pesquisar produto:</Label>
            <CardInput
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <CardButton type="submit">
              <SearchButtonIcon><FaSearch /></SearchButtonIcon>
              Pesquisar
            </CardButton>
          </Form>
          <Card>
            <CardList>
              {produtos.length > 0 ? (
                produtos.map((produto) => (
                  <CardItem key={produto.id}>
                    <div>
                      <ProductName>{produto.productName}</ProductName> - <ProductPrice>{produto.productPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ProductPrice>
                    </div>
                    <IconContainer>
                      <EditIcon onClick={() => handleEdit(produto)} />
                      <DeleteIcon onClick={() => handleDelete(produto.id)} />
                    </IconContainer>
                  </CardItem>
                ))}
              </CardList>
            </Section>
          )}
        </div>
      </ContainerWrapper>
    </ProductContainer>
  );
};

export default CadastrarProduto;