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
  CardButton,
  ProductGrid,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalButton,
  CancelButton,
  FlexContainer
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
  productQuantity?: number;
  estoquePeso?: number;
  stockAlertLimit: number;
  
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
        await axios.put(`http://localhost:8080/products/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProdutos(produtos.map(produto => produto.id === editId ? { ...produto, ...data } : produto));
        setEditId(null);
      } else {
        await axios.post('http://localhost:8080/products/cadastrar', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProdutos([...produtos, data as Produto]);
      }

      resetForm();
    } catch (error) {
      console.error('Erro ao cadastrar ou atualizar produto:', error);
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
                <CheckboxContainer>
                <CheckboxLabel htmlFor="isBulk">Produto a granel?</CheckboxLabel>
                <CheckboxInput
                  type="checkbox"
                  id="isBulk"
                  checked={isBulk}
                  onChange={(e) => setIsBulk(e.target.checked)}
                />
              </CheckboxContainer>
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
                {editId ? 'Atualizar Produto' : 'Cadastrar Produto'}
              </Button>
            </Form>
          </Section>
        ) : (
          <Section>
            <SectionTitle>Lista de Produtos</SectionTitle>
            <SearchInput
              type="text"
              placeholder="Buscar por nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
