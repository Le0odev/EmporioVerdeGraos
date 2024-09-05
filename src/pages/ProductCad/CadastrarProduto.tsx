import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';


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
  CardItem,
  ProductPrice,
  ProductName,
  EditIcon,
  DeleteIcon,
  ToggleButtonContainer,
  ToggleButton,
  IconContainer,
  Image,
  CardButton,
  ProductGrid,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalButton,
  CancelButton,
  FlexContainer,
  CheckboxWrapper,
  CheckboxStyled,
  CheckboxIcon,
  
} from './StyledProdutos';
import { useAuth } from '../Login/authContext';
import { FaCheck, FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { SearchBar, SearchContainer, SearchIcon } from '../../components/StyledSearch';

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
  productQuantity?: number;
  estoquePeso?: number;
  stockAlertLimit: number;

}

interface ErrorResponse {
  message: string;
  // Adicione outras propriedades conforme a resposta de erro da sua API
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
  const [estoque, setEstoque] = useState('');
  const [estoquePeso, setEstoquePeso] = useState('');
  const [stockAlertLimit, setStockAlertLimit] = useState('');
  const [isCadastroVisible, setIsCadastroVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoAExcluir, setProdutoAExcluir] = useState<Produto | null>(null);

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
      if (searchTerm.trim()) { 
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
      } else {
        setProdutos([]); 
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
      imageUrl: imageUrl,
      productQuantity: isBulk ? undefined : parseFloat(estoque),
      estoquePeso: isBulk ? parseFloat(estoquePeso) : undefined,
      stockAlertLimit: parseFloat(stockAlertLimit)
    };
  
    try {
      if (editId) {
        // Atualização de produto
        await axios.put(`http://localhost:8080/products/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProdutos(produtos.map(produto => produto.id === editId ? { ...produto, ...data } : produto));
        setEditId(null);
        toast.success('Produto atualizado com sucesso!');
      } else {
        // Criação de produto
        await axios.post('http://localhost:8080/products/cadastrar', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProdutos([...produtos, data as Produto]);
        toast.success('Produto cadastrado com sucesso!');
      }
      
      resetForm();
    } catch (error) {
      console.error('Erro ao realizar checkout:', error);
      
      if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          console.log('Status do erro:', axiosError.response?.status);
          console.log('Dados do erro:', axiosError.response?.data);
  
          let errorMessage = 'Erro ao finalizar a venda. Por favor, tente novamente mais tarde.';
  
          if (axiosError.response?.data?.message) {
              errorMessage = axiosError.response.data.message;
          }
  
          toast.error(errorMessage);
      } else {
          toast.error('Erro desconhecido ao finalizar a venda. Por favor, tente novamente mais tarde.');
      }
    }
  };
  

  const resetForm = () => {
    setNome('');
    setPreco('');
    setDescricao('');
    setCodigoBarras('');
    setCategoriaSelecionada('');
    setIsBulk(false);
    setImageUrl('');
    setEstoque('');
    setEstoquePeso('');
    setStockAlertLimit('');
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
    setEstoque(produto.productQuantity ? produto.productQuantity.toString() : '');
    setEstoquePeso(produto.estoquePeso ? produto.estoquePeso.toString() : '');
    setStockAlertLimit(produto.stockAlertLimit.toString()); 

    setIsCadastroVisible(true);
    
  };

  const handleDelete = (produto: Produto) => {
    setProdutoAExcluir(produto);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!produtoAExcluir) return;

    try {
      await axios.delete(`http://localhost:8080/products/delete/${produtoAExcluir.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProdutos(produtos.filter(produto => produto.id !== produtoAExcluir.id));
      setIsModalOpen(false);
      setProdutoAExcluir(null);
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setProdutoAExcluir(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const toggleCheckbox = () => {
    setIsBulk(prev => !prev);
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

        {isCadastroVisible ? (
          <Section>
            <SectionTitle>{editId ? 'Atualizar Produto' : 'Cadastrar Produto'}</SectionTitle>
            <Form onSubmit={handleSubmit}>
              <Label htmlFor="nome">Nome do Produto</Label>
              <Input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome do produto"
                required
              />
              <Label htmlFor="codigoBarras">Código de Barras</Label>
              <Input
                type="text"
                id="codigoBarras"
                value={codigoBarras}
                onChange={(e) => setCodigoBarras(e.target.value)}
                placeholder="Digite o código de barras"
              />
               <FlexContainer>
                <div>
                  <Label htmlFor="preco">Preço</Label>
                  <Input
                    type="number"
                    id="preco"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    placeholder="Digite o preço"
                    required
                  />
                </div>
                <div>

                  <CheckboxWrapper onClick={toggleCheckbox}>
                  <Label htmlFor='checkbox'>Produto a granel? Cheque abaixo</Label>
                  {isBulk ? (
                    <FaCheckSquare color="#28a745" />
                  ) : (
                    <FaRegSquare color="#444" />
                  )}
                </CheckboxWrapper>
              </div>
            </FlexContainer>
              <Label htmlFor="imageUrl">Imagem URL</Label>
              <Input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Cole a URL da imagem"
              />
              <FlexContainer>
                <div>
                  <Label htmlFor="estoque">Estoque</Label>
                  <Input
                    type="number"
                    id="estoque"
                    value={isBulk ? estoquePeso : estoque}
                    onChange={(e) => isBulk ? setEstoquePeso(e.target.value) : setEstoque(e.target.value)}
                    placeholder={isBulk ? "Digite o peso em kg" : "Digite a quantidade em estoque"}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stockAlertLimit">Limite de estoque</Label>
                  <Input
                    type="number"
                    id="stockAlertLimit"
                    value={stockAlertLimit}
                    onChange={(e) => setStockAlertLimit(e.target.value)}
                    placeholder="Digite o limite de estoque"
                    required
                  />
                </div>
            </FlexContainer>
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
            <Button type="submit">
                {editId ? 'Atualizar Produto'  : 'Cadastrar Produto'}
              </Button>
            </Form>
          </Section>
        ) : (
          <Section>
            <SectionTitle>Lista de Produtos</SectionTitle>
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
            <ProductGrid>
              {produtos.map((produto) => (
                <Card key={produto.id}>
                  <Image src={produto.imageUrl} alt={produto.productName} />
                  <CardItem>
                    <ProductName>{produto.productName}</ProductName>
                    <ProductPrice>{formatPrice(produto.productPrice)}</ProductPrice>
                  </CardItem>
                  <CardButton>
                  <EditIcon style={{ marginRight: '8px' }} onClick={() => handleEdit(produto)} />
                  <DeleteIcon onClick={() => handleDelete(produto)} />
                  </CardButton>
                </Card>
              ))}
            </ProductGrid>
          </Section>
        )}

        {isModalOpen && (
          <Modal>
            <ModalContent>
              <ModalHeader>Confirmar Exclusão</ModalHeader>
              <p>Tem certeza de que deseja excluir este produto?</p>
              <h3 style={{marginTop: "10px"}}><strong>"{produtoAExcluir?.productName}"</strong></h3>
              <ModalFooter>
                <ModalButton onClick={confirmDelete}>Confirmar</ModalButton>
                <CancelButton onClick={cancelDelete}>Cancelar</CancelButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </ContainerWrapper>
    </ProductContainer>
  );
};

export default CadastrarProduto;
