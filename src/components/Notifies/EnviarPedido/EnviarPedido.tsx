import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../pages/Login/authContext';
import {
  Container,
  Title,
  FormGroup,
  Label,
  Input,
  Select,
  ProductList,
  ProductItem,
  ProductText,
  QuantityInput,
  Button,
  ErrorMessage,
  SuccessMessage,
  AddButton,
  ProductTextSpan, // Adicione este import
} from './StyledPedidos';
import { ContainerButton } from '../GerenciarProdutos/StyledList';

interface Produto {
  id: number;
  productName: string;
  productQuantity: number;
  estoquePeso: number;
  stockAlertLimit: number;
  bulk: boolean;
  categoryId: number;
}

const EnviarPedido: React.FC = () => {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [distribuidor, setDistribuidor] = useState('');
  const [quantidade, setQuantidade] = useState<{ [key: number]: string }>({});
  const [emAtencao, setEmAtencao] = useState<{ [key: number]: boolean }>({});
  const [novoProduto, setNovoProduto] = useState<Partial<Produto>>({});
  const [mostrarAdicionarProduto, setMostrarAdicionarProduto] = useState(false); // Novo estado para controlar a exibição do formulário
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/category', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, [token]);

  useEffect(() => {
    if (categoriaSelecionada !== null) {
      const fetchProdutos = async () => {
        try {
          const response = await axios.get('http://localhost:8080/products/all', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const produtosFiltrados = response.data.filter((produto: Produto) => {
            if (produto.categoryId !== categoriaSelecionada) {
              return false;
            }
            if (produto.bulk) {
              return produto.estoquePeso === 0 || (produto.estoquePeso > 0 && produto.estoquePeso <= produto.stockAlertLimit);
            } else {
              return produto.productQuantity === 0 || (produto.productQuantity > 0 && produto.productQuantity <= produto.stockAlertLimit);
            }
          });
  
          setProdutos(produtosFiltrados);
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
        }
      };
  
      fetchProdutos();
    } else {
      setProdutos([]);
    }
  }, [categoriaSelecionada, token]);

  const handleAddProduct = () => {
    if (!novoProduto.productName || novoProduto.bulk === undefined || (novoProduto.bulk && novoProduto.estoquePeso === undefined) || (!novoProduto.bulk && novoProduto.productQuantity === undefined)) {
      setError('Preencha todos os campos do novo produto.');
      return;
    }

    const novoProdutoComId = {
      ...novoProduto,
      id: Date.now(), // Usando timestamp como id temporário
    } as Produto;

    setProdutos(prev => [...prev, novoProdutoComId]);
    setNovoProduto({});
    setMostrarAdicionarProduto(false); // Ocultar o formulário após adicionar o produto
    setError('');
    setSuccess('Produto adicionado com sucesso!');
  };

  const handleSubmit = () => {
    if (!distribuidor || Object.keys(quantidade).length === 0) {
      setError('Preencha todos os campos e selecione ao menos um produto.');
      return;
    }

    const messageLines = [`Pedido para o distribuidor: ${distribuidor}`];
    produtos.forEach(produto => {
      const qty = quantidade[produto.id];
      const attention = emAtencao[produto.id] ? ' (em atenção)' : '';
      if (qty) {
        const quantidadeFormatada = produto.bulk ? `${parseFloat(qty).toFixed(2)} KG` : `${qty} unidade(s)`;
        messageLines.push(`${produto.productName} - Quantidade: ${quantidadeFormatada}${attention}`);
      }
    });

    const message = messageLines.join('\n');
    const encodedMessage = encodeURIComponent(message);
    const numeroWhatsApp = '5581995773288'; // Substitua pelo número desejado
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodedMessage}`;

    window.open(url, '_blank');

    setDistribuidor('');
    setQuantidade({});
    setEmAtencao({});
    setCategoriaSelecionada(null);
    setProdutos([]);
    setError('');
    setSuccess('Pedido enviado com sucesso!');
  };

  return (
    <Container>
      <Title>Enviar Pedido</Title>
      <FormGroup>
        <Label>Distribuidor</Label>
        <Input
          type="text"
          placeholder="Nome do distribuidor"
          value={distribuidor}
          onChange={(e) => setDistribuidor(e.target.value)}
          required 
        />
      </FormGroup>
      <FormGroup>
        <Label>Selecionar Categoria</Label>
        <Select onChange={(e) => setCategoriaSelecionada(Number(e.target.value))}>
          <option value="">Selecione uma categoria</option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.categoryName}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
      <Label>Adicionar Novo Produto</Label>
      <AddButton onClick={() => setMostrarAdicionarProduto(prev => !prev)}>
           <span className="icon">+</span>
        </AddButton>
        {mostrarAdicionarProduto && (
          <>
            <Select
              onChange={(e) => setNovoProduto(prev => ({ ...prev, bulk: e.target.value === 'bulk' }))}
            >
              <option value="">Selecione o tipo</option>
              <option value="bulk">Granel</option>
              <option value="unit">Unidade</option>
            </Select>
            <Input
              type="text"
              placeholder="Nome do produto"
              value={novoProduto.productName || ''}
              onChange={(e) => setNovoProduto(prev => ({ ...prev, productName: e.target.value }))}
            />
            <Input
              type="number"
              placeholder="Peso (KG)"
              value={novoProduto.bulk ? novoProduto.estoquePeso || '' : ''}
              onChange={(e) => setNovoProduto(prev => ({ ...prev, estoquePeso: parseFloat(e.target.value) }))}
              disabled={!novoProduto.bulk}
            />
            <Input
              type="number"
              placeholder="Quantidade"
              value={!novoProduto.bulk ? novoProduto.productQuantity || '' : ''}
              onChange={(e) => setNovoProduto(prev => ({ ...prev, productQuantity: parseInt(e.target.value) }))}
              disabled={novoProduto.bulk}
            />
            <Button onClick={handleAddProduct}>Adicionar Produto</Button>
          </>
        )}
      </FormGroup>

      <FormGroup>
        <Label>Selecionar Produtos e Quantidades</Label>
        <ProductList>
          {produtos.map(produto => (
            <ProductItem key={produto.id}>
              <ProductText>
                {produto.productName} 
                <ProductTextSpan>
                  {produto.bulk ? ` -- ${produto.estoquePeso} KG` : ` -- ${produto.productQuantity} unidade(s)`}
                </ProductTextSpan>
              </ProductText>
              <QuantityInput
                type="number"
                placeholder="Quantidade"
                value={quantidade[produto.id] || ''}
                onChange={(e) => setQuantidade(prev => ({
                  ...prev,
                  [produto.id]: e.target.value
                }))}
              />
            </ProductItem>
          ))}
        </ProductList>
      </FormGroup>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <ContainerButton>
        <Button onClick={handleSubmit}>Enviar Pedido</Button>
        <Button className="secondary" onClick={() => window.history.back()}>Voltar</Button>
      </ContainerButton>
    </Container>
  );
};

export default EnviarPedido;
