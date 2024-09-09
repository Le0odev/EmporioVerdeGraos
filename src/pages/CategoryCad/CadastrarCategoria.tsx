import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import {
  CategoriaContainer,
  Section,
  SectionTitle,
  Form,
  Label,
  Input,
  Button,
  H1,
  Card,
  CardList,
  CardItem,
  CardButton,
  CardInput,
  SearchButtonIcon,
  CategoryName,
  EditIcon,
  DeleteIcon,
  PaginationContainer,
  PaginationButton,
  SearchContainer,
} from './StyledCategoria';
import { useAuth } from '../Login/authContext';

interface Categoria {
  id: string;
  categoryName: string;
  categoryDescription: string;
}

const CadastrarCategoria: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { token } = useAuth();

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('https://systemallback-end-production.up.railway.app/category/pages', {
        params: { page: currentPage, size: pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategorias(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Erro ao obter categorias', error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, [currentPage, pageSize, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { categoryName: nome, categoryDescription: descricao };

    try {
      if (editId) {
        await axios.put(`https://systemallback-end-production.up.railway.app/category/${editId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategorias(categorias.map(categoria => categoria.id === editId ? { ...categoria, ...data } : categoria));
        setEditId(null);
      } else {
        const response = await axios.post('https://systemallback-end-production.up.railway.app/category/cadastrar', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategorias([...categorias, response.data]);
      }
      setNome('');
      setDescricao('');
    } catch (error) {
      console.error('Erro ao cadastrar ou atualizar categoria:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchCategorias = async (term: string) => {
    try {
      const response = await axios.get(`https://systemallback-end-production.up.railway.app/category/search?categoryName=${term}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setCategorias([]);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const debounceSearch = setTimeout(() => {
        searchCategorias(searchTerm);
      }, 300);
      return () => clearTimeout(debounceSearch);
    } else {
      fetchCategorias();
    }
  }, [searchTerm, token]);

  const handleEdit = (categoria: Categoria) => {
    setNome(categoria.categoryName);
    setDescricao(categoria.categoryDescription);
    setEditId(categoria.id);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://systemallback-end-production.up.railway.app/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategorias(categorias.filter(categoria => categoria.id !== id));
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = Array.from(Array(totalPages).keys());
    return (
      <PaginationContainer>
        <PaginationButton onClick={handlePrevPage} disabled={currentPage === 0}>
          Anterior
        </PaginationButton>
        {pages.map(page => (
          <PaginationButton
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page + 1}
          </PaginationButton>
        ))}
        <PaginationButton
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        >
          Próximo
        </PaginationButton>
      </PaginationContainer>
    );
  };

  return (
    <>
      <CategoriaContainer>
        <Section>
          <SectionTitle>{editId ? 'Atualizar Categoria' : 'Cadastrar Categoria'}</SectionTitle>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="nome">Nome da Categoria</Label>
            <Input
              placeholder="Insira um nome..."
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <Label htmlFor="descricao">Descrição</Label>
            <Input
              placeholder="Insira uma descrição..."
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <Button type="submit">{editId ? 'Atualizar' : 'Cadastrar'}</Button>
          </Form>
        </Section>
        <Section>
          <SectionTitle>Pesquisar Categoria</SectionTitle>
          <Form onSubmit={(e) => { e.preventDefault(); searchCategorias(searchTerm); }}>
            <Label htmlFor="search">Pesquisar:</Label>
            <SearchContainer>
              <CardInput
                type="text"
                id="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Digite o nome da categoria"
              />
              <CardButton type="submit">
                <SearchButtonIcon>Buscar <FaSearch /></SearchButtonIcon>
              </CardButton>
            </SearchContainer>
          </Form>
          <Card>
            <CardList>
              {categorias.length > 0 ? (
                categorias.map((categoria) => (
                  <CardItem key={categoria.id}>
                    <div>
                      <CategoryName>{categoria.categoryName}</CategoryName> - {categoria.categoryDescription}
                    </div>
                    <div>
                      <EditIcon onClick={() => handleEdit(categoria)} />
                      <DeleteIcon onClick={() => handleDelete(categoria.id)} />
                    </div>
                  </CardItem>
                ))
              ) : (
                <p>Nenhuma categoria encontrada.</p>
              )}
            </CardList>
          </Card>
          {renderPagination()}
        </Section>
      </CategoriaContainer>
    </>
  );
};

export default CadastrarCategoria;
