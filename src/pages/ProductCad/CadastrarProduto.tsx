import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';
import {
  ProductContainer,
  Section,
  SectionTitle,
  Form,
  Label,
  Input,
  Select,
  Button,
  H1,
  Card,
  CardList,
  CardItem,
  CardButton,
  CardInput,
  SearchButtonIcon,
  ProductPrice,
  ProductName,
  EditIcon,
  DeleteIcon
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
}

const CadastrarProduto: React.FC = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
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
      categoryId: categoriaSelecionada
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
      }

      // Limpar os campos após o cadastro ou atualização
      setNome('');
      setPreco('');
      setDescricao('');
      setCodigoBarras('');
      setCategoriaSelecionada('');
    } catch (error) {
      console.error('Erro ao cadastrar ou atualizar produto:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchProdutos = async (term: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/products/search?productName=${term}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && Array.isArray(response.data)) {
        setProdutos(response.data);
      } else {
        console.error('A resposta da API não é um array:', response.data);
        setProdutos([]);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setProdutos([]); // Limpa a lista em caso de erro
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const debounceSearch = setTimeout(() => {
        searchProdutos(searchTerm);
      }, 300); // Atraso de 300ms para evitar chamadas excessivas

      return () => clearTimeout(debounceSearch); // Limpar timeout se o componente desmontar ou searchTerm mudar
    } else {
      setProdutos([]); // Limpar lista se não houver termo de pesquisa
    }
  }, [searchTerm]);

  const handleEdit = (produto: Produto) => {
    // Lógica para edição
    setNome(produto.productName);
    setPreco(produto.productPrice.toString());
    setDescricao(produto.productDescription);
    setCodigoBarras(produto.codeBar);
    setCategoriaSelecionada(produto.categoryId);
    // Armazenar o ID do produto sendo editado
    setEditId(produto.id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProdutos(produtos.filter(produto => produto.id !== id));
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
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
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
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
                    <ProductName>{produto.productName}</ProductName> - <ProductPrice>{produto.productPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ProductPrice>
                    <EditIcon onClick={() => handleEdit(produto)}><FaEdit /></EditIcon>
                    <DeleteIcon onClick={() => handleDelete(produto.id)}><FaTrashAlt /></DeleteIcon>
                  </CardItem>
                ))
              ) : (
                <p>Nenhum produto encontrado</p>
              )}
            </CardList>
          </Card>
        </Section>
      </ProductContainer>
    </>
  );
};

export default CadastrarProduto;
