import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';
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

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/search?productName=${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, [searchTerm, token]);

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

  return (
    <ProductContainer>
      <ContainerWrapper>
        <ToggleButtonContainer>
          <ToggleButton 
            onClick={() => setIsCadastroVisible(true)} 
            active={isCadastroVisible}
          >
            CADASTRO DE PRODUTOS
          </ToggleButton>
          <ToggleButton 
            onClick={() => setIsCadastroVisible(false)} 
            active={!isCadastroVisible}
          >
            PRODUTOS
          </ToggleButton>
        </ToggleButtonContainer>

        <div style={{ display: 'flex' }}>
          {isCadastroVisible && (
            <Section style={{ flex: 1 }}>
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
                <Label htmlFor="codigoBarras">Código de Barras</Label>
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
                <Label htmlFor="imageUrl">Imagem URL</Label>
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
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.categoryName}
                    </option>
                  ))}
                </Select>
                <CheckboxContainer>
                  <CheckboxLabel htmlFor="isBulk">Produto a granel?</CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    id="isBulk"
                    checked={isBulk}
                    onChange={(e) => setIsBulk(e.target.checked)}
                  />
                </CheckboxContainer>
                <Button type="submit">{editId ? 'Atualizar' : 'Cadastrar'}</Button>
              </Form>
            </Section>
          )}

          {!isCadastroVisible && (
            <Section style={{ flex: 1 }}>
              <SectionTitle>Produtos</SectionTitle>
              <Form onSubmit={(e) => { e.preventDefault(); setSearchTerm(searchTerm); }}>
                <Label htmlFor="search">Pesquisar produto:</Label>
                <SearchInput
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Digite o nome do produto"
                />
              </Form>
              <CardList>
                {produtos.map((produto) => (
                  <CardItem key={produto.id}>
                    <Card>
                      {produto.imageUrl && <Image src={produto.imageUrl} alt={produto.productName} />}
                      <ProductName>{produto.productName}</ProductName>
                      <ProductPrice>R${produto.productPrice.toFixed(2)}</ProductPrice>
                      <IconContainer>
                        <CardButton onClick={() => handleEdit(produto)}>
                          <EditIcon />
                        </CardButton>
                        <CardButton onClick={() => handleDelete(produto.id)}>
                          <DeleteIcon />
                        </CardButton>
                      </IconContainer>
                    </Card>
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
