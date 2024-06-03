import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ProductContainer,
  Section,
  SectionTitle,
  Form,
  Label,
  Input,
  Select,
  Button,
  H1
} from './StyledProdutos';
import { useAuth } from '../Login/authContext';

interface Categoria {
  id: string;
  categoryName: string;
}



const CadastrarProduto: React.FC = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categorias', {
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
      productPrice: preco,
      productDescription: descricao,
      codeBar: codigoBarras,
      categoryId: categoriaSelecionada
    };

    console.log('Token usado na requisição:', token);

    try {
      const response = await axios.post('http://localhost:8080/products/cadastrar', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Produto cadastrado com sucesso:', response.data);

      // Limpar os campos após o cadastro
      setNome('');
      setPreco('');
      setDescricao('');
      setCodigoBarras('');
      setCategoriaSelecionada('');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <>
      <H1>Gerenciamento de produtos:</H1>
      <ProductContainer>
        <Section className="product-section">
          <SectionTitle>Cadastrar Produto</SectionTitle>
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
              required
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>{categoria.categoryName}</option>
              ))}
            </Select>
            <Button type="submit">Cadastrar</Button>
          </Form>
        </Section>
        <Section className="search-section">
          <SectionTitle>Verificar existência do produto</SectionTitle>
          {/* Conteúdo da seção de pesquisa */}
        </Section>
      </ProductContainer>
    </>
  );
};

export default CadastrarProduto;
