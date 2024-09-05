import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useAuth } from '../Login/authContext';
import {
  VendaContainer,
  SearchSection,
  VendaSection,
  Form,
  Label,
  Input,
  ProductGrid,
  ProductImage,
  ProductName,
  ProductPrice,
  Button,
  EmptyCartMessage,
  CartList,
  CartItem,
  CartItemDetails,
  CartItemName,
  CartItemPrice,
  QuantityControl, 
  TrashIcon,
  GranelInput,
  SubtotalContainer,
  SubtotalLabel,
  SubtotalAmount,
  CheckoutSection,
  CheckoutButton,
  ModalWrapper,
  ModalContent,
  ProductCard2,
  PaymentButtonsContainer,
  PaymentButton,
  AlertMessage,
  CartActions,
  LabelPeso,
  LabelPrice,
  PriceDiv,
  DecrementButton,
  QuantityDisplay,
  IncrementButton,
} from './StyledVenda';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';
import { SearchBar, SearchContainer, SearchIcon } from '../../components/StyledSearch';
import { FiSearch } from 'react-icons/fi';


interface Produto {
  id: number;
  productName: string;
  productPrice: number;
  quantidade: number | null;
  peso?: number | null;
  bulk: boolean;
  imageUrl: string;
  productQuantity: number;
  estoquePeso: number;
}

interface ErrorResponse {
  message: string;
}

const CriarVenda: React.FC = () => {
  const { token } = useAuth();
  const [searchTermByName, setSearchTermByName] = useState<string>('');
  const [searchTermByCodeBar, setSearchTermByCodeBar] = useState<string>('');
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [autoAddFeedback, setAutoAddFeedback] = useState<string>('');
  const [codigoBarras, setCodigoBarras] = useState<string>('');
  const [desconto, setDesconto] = useState<number>(0);
  const [formaDePagamento, setFormaDePagamento] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para controlar o modal
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false); // Estado para controlar o modal de impressão
  const togglePrintModal = () => setShowPrintModal(!showPrintModal);

  const toggleModal = () => setShowModal(!showModal); 


  const searchProdutosByCodeBar = async (codeBar: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/products/search/codebar?codeBar=${codeBar}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const produtoEncontrado = response.data[0];

      if (produtoEncontrado) {
        addToCart(produtoEncontrado);

        setAutoAddFeedback(`Produto "${produtoEncontrado.productName}" adicionado automaticamente.`);
        setSearchTermByCodeBar('');
        setAutoAddFeedback('');
        
        
      } else {
        setAutoAddFeedback('Produto não encontrado.');
      }

    } catch (error) {
      console.error('Erro ao buscar produtos por código de barras:', error);
      setAutoAddFeedback('Erro ao buscar produto. Tente novamente.');
    }
  };

  const searchProdutosByName = async (term: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/products/search?productName=${term}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      });

      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setProdutos([]);
    }
  };

  const addToCart = (produto: Produto) => {
    const itemExistente = carrinho.find(item => item.id === produto.id);
    if (itemExistente) {
      const novoCarrinho = carrinho.map(item =>
        item.id === produto.id ? { ...item, quantidade: (item.quantidade || 0) + 1 } : item
      );
      setCarrinho(novoCarrinho);

    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
    setCodigoBarras('');
  };

  const updateQuantity = (id: number, quantidade: number | null) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map(item =>
        item.id === id ? { ...item, quantidade: quantidade } : item
      ).filter(item => item.quantidade !== undefined && item.quantidade !== null && item.quantidade > 0)
    );
  };

  const updateWeight = (id: number, peso: number | null) => {
    setCarrinho((prevCarrinho) =>
      prevCarrinho.map(item =>
        item.id === id ? { ...item, peso: peso } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCarrinho((prevCarrinho) => prevCarrinho.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    try {
      if (!formaDePagamento) {
        toast.warning('Por favor, preencha a forma de pagamento antes de finalizar a venda.');
        return;
      }
  
      const vendaItems = carrinho.map((item) => ({
        productId: item.id,
        quantity: item.bulk ? null : item.quantidade,
        weight: item.bulk ? item.peso : null,
        isBulk: item.bulk
      }));
  
      const saleRequest = {
        itemsSale: vendaItems,
        discount: desconto,
        methodPayment: formaDePagamento
      };
  
      const response = await axios.post('http://localhost:8080/sales/create', saleRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Resposta da API após checkout:', response.data);
  
      // Limpar carrinho e outros estados após checkout
      setCarrinho([]);
      setShowPrintModal(true); // Abrir modal de impressão após o checkout
      toggleModal();
      setAutoAddFeedback('');
      setSearchTermByName('');
      setDesconto(0);
      toast.success('Venda finalizada com sucesso.');
  
      // Chamar a função de impressão apenas após a venda ser finalizada com sucesso
      handlePrintReceipt();
  
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

  useEffect(() => {
    if (carrinho.length === 0) {
      setDesconto(0);
    }
  }, [carrinho]);


  const calcularSubtotal = () => {
    let subtotal = 0;
  
    carrinho.forEach((item) => {
      if (!item.bulk) {
        subtotal += item.productPrice * (item.quantidade || 0);
      } else {
        subtotal += item.productPrice * (item.peso || 0) / 1000;
      }
    });
  
    const descontoPercentual = desconto || 0;
    const subtotalComDesconto = subtotal - (subtotal * (descontoPercentual / 100));
  
    return { subtotal, subtotalComDesconto };
  };
  

  const handleSearchByNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProdutosByName(searchTermByName);
  };

  const handleSearchByCodeBarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProdutosByCodeBar(searchTermByCodeBar);
  };


  const handlePrintReceipt = () => {
    // Criar uma nova instância do jsPDF
    const doc = new jsPDF({
      orientation: 'portrait', // Orientação do documento (retrato)
      unit: 'mm', // Unidade de medida (milímetros)
      format: [80, 297] // Formato do papel (80mm de largura, 297mm de altura para rolo)
    });
  
    // Configurar o cabeçalho do cupom
    const dataHora = new Date().toLocaleString('pt-BR');
    const nomeEmpresa = 'Empório Verde Grãos';
    const cnpjEmpresa = '81.991.676/1777';
    const enderecoEmpresa = 'Centro, Abreu e Lima';
    const telefoneEmpresa = '(81) 9 9167-6177';
  
    // Título e informações da empresa centralizados
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Cupom de Compra', 40, 10, { align: 'center' });
  
    doc.setFont('helvetica', 'normal');
    doc.text(`${nomeEmpresa}`, 10, 20);
    doc.text(`CNPJ: ${cnpjEmpresa}`, 10, 25);
    doc.text(`Endereço: ${enderecoEmpresa}`, 10, 30);
    doc.text(`Telefone: ${telefoneEmpresa}`, 10, 35);
    doc.text(`Data e Hora: ${dataHora}`, 10, 40);
  
    // Linha separadora
    doc.setLineWidth(0.5);
    doc.line(10, 45, 70, 45);
  
    // Adicionar itens do carrinho
    const startY = 50;
    let currentY = startY;
    const lineHeight = 4.5; // Aumente o espaçamento entre as linhas aqui
  
    carrinho.forEach((item, index) => {
      const line1 = `${item.productName}`;
      const line2 = `Preço: ${item.productPrice.toFixed(2)}`;
      const line3 = item.bulk ? `Peso: ${item.peso}g` : `Quantidade: ${item.quantidade}`;
      const line4 = `Subtotal: R$ ${item.bulk ? (item.productPrice * (item.peso || 0) / 1000).toFixed(2) : (item.productPrice * (item.quantidade || 0)).toFixed(2)}`;
  
      doc.setFontSize(10);
      doc.text(line1, 10, currentY);
      doc.text(line2, 10, currentY + lineHeight);
      doc.text(line3, 10, currentY + lineHeight * 2);
      doc.text(line4, 10, currentY + lineHeight * 3);
  
      // Adicionar linha divisória após cada item
      doc.line(10, currentY + lineHeight * 4, 70, currentY + lineHeight * 4);
  
      currentY += lineHeight * 4; // Ajuste o multiplicador conforme necessário para o espaçamento entre os itens
    });
  
    // Espaçamento entre os itens do carrinho e o subtotal
    currentY += lineHeight;
  
    const { subtotal, subtotalComDesconto } = calcularSubtotal();
    doc.setFontSize(12);
    doc.text(`Subtotal: R$ ${subtotal.toFixed(2)}`, 10, currentY + lineHeight);
    doc.text(`Desconto: R$ ${(subtotal - subtotalComDesconto).toFixed(2)}`, 10, currentY + lineHeight * 2);
    doc.text(`Total: R$ ${subtotalComDesconto.toFixed(2)}`, 10, currentY + lineHeight * 3);
    doc.text(`Pagamento: ${formaDePagamento}`, 10, currentY + lineHeight * 4);
  
    // Espaçamento entre o total e a forma de pagamento
    currentY += lineHeight * 5;
  
    // Adicionar total
    doc.text(`Total: R$ ${subtotalComDesconto.toFixed(2)}`, 10, currentY + lineHeight * 0.5);
    doc.line(10, currentY + lineHeight, 70, currentY + lineHeight);
  
    // Linha separadora final
    doc.line(10, currentY + lineHeight * 2, 70, currentY + lineHeight * 2);
  
    // Salvar o PDF e abrir a impressão
    const pdfBlob = doc.output('blob') as Blob;
    printPDF(pdfBlob);
  };

  const printPDF = (pdfBlob: Blob) => {
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const printWindow = window.open(pdfUrl);
    
    if (!printWindow) {
        alert('Não foi possível abrir a janela de impressão. Verifique se as configurações do navegador permitem abrir novas janelas.');
        return;
    }

    printWindow.onload = () => {
        setTimeout(() => {
            printWindow.print();
            URL.revokeObjectURL(pdfUrl);
        }, 1000); // Aguarde 1 segundo para garantir que o PDF seja carregado antes da impressão
    };
  };

  


  useEffect(() => {
    if (searchTermByName) {
      const debounceSearch = setTimeout(() => {
        searchProdutosByName(searchTermByName);
      }, 300);

      return () => clearTimeout(debounceSearch);
    } else {
      setProdutos([]);
    }
  }, [searchTermByName]);

  const { subtotal, subtotalComDesconto } = calcularSubtotal();

  return (
    <VendaContainer>
      <SearchSection>
        <Form onSubmit={handleSearchByCodeBarSubmit}>
          <Label htmlFor='searchCodeBar'>Procure um produto:</Label>
          <Input
            type='text'
            placeholder='Insira o código de barras'
            id='searchCodeBar'
            value={searchTermByCodeBar}
            onChange={(e) => setSearchTermByCodeBar(e.target.value)}
          />
        </Form>
        <Form onSubmit={handleSearchByNameSubmit}>
        <SearchContainer>
            <SearchIcon>
            <FiSearch />
           </SearchIcon>
            <SearchBar
            type="text"
            placeholder="Buscar produtos..."
            value={searchTermByName}
            onChange={(e) => setSearchTermByName(e.target.value)}
          />
           </SearchContainer>
          <Button type="submit">Pesquisar</Button>
        </Form>
        {autoAddFeedback && <AlertMessage >{autoAddFeedback}</AlertMessage>}
        <ProductGrid>
          {produtos.map((produto) => (
            <ProductCard2 key={produto.id} onClick={() => addToCart(produto)}>
              <ProductImage src={produto.imageUrl} alt={produto.productName} />
              <ProductName>{produto.productName}</ProductName>
              <ProductPrice>{produto.productPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</ProductPrice>
              <Button type="button">Adicionar</Button>
            </ProductCard2>
          ))}
        </ProductGrid>
      </SearchSection>
      <VendaSection>
        <Label >Checkout</Label>
        <CartList>
          {carrinho.length === 0 ? (
            <EmptyCartMessage>Seu carrinho está vazio.</EmptyCartMessage>
          ) : (
            carrinho.map((item) => (
              <CartItem key={item.id}>
                <CartItemDetails>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ProductImage src={item.imageUrl} alt={item.productName} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    <div>
                      <CartItemName>{item.productName}</CartItemName>
                      
                      {item.bulk ? (
                        <div>
                          <LabelPeso>Disponivel: {item.estoquePeso}KG</LabelPeso>
                          <PriceDiv >R${item.productPrice.toFixed(2)} </PriceDiv>
                          <GranelInput
                            placeholder='Gramas:'
                            type="number"
                            id={`weight_${item.id}`}
                            value={item.peso || ''}
                            onChange={(e) => updateWeight(item.id, parseFloat(e.target.value))}
                          />
                          <CartItemPrice>
                            Subtotal: {(item.productPrice * (item.peso || 0) / 1000).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </CartItemPrice>
                        </div>
                      ) : (
                        
                        <div>
                          <LabelPeso>Disponível: {item.productQuantity}UN</LabelPeso>
                          <PriceDiv >
                            R$: {item.productPrice.toFixed(2)}
                          </PriceDiv>
                          <QuantityControl>
                            <DecrementButton onClick={() => updateQuantity(item.id, (item.quantidade || 0) - 1)}>
                              <FaMinus />
                            </DecrementButton>
                            <QuantityDisplay>{item.quantidade}</QuantityDisplay>
                            <IncrementButton onClick={() => updateQuantity(item.id, (item.quantidade || 0) + 1)}>
                              <FaPlus />
                            </IncrementButton>
                          </QuantityControl>
                          <CartItemPrice>
                            Subtotal: {(item.productPrice * (item.quantidade || 0)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </CartItemPrice>
                        </div>
                      )}
                    </div>
                  </div>
                  <CartActions>
                    <TrashIcon onClick={() => removeFromCart(item.id)} />
                  </CartActions>
                </CartItemDetails>
              </CartItem>
            ))
          )}
        </CartList>
        {carrinho.length > 0 && (
          <CheckoutSection>
              <Form>
                <Label htmlFor='desconto'>Desconto (%):</Label>
                <Input
                  placeholder='Insira o desconto...'
                  type='number'
                  id='desconto'
                  value={desconto || ''}
                  onChange={(e) => setDesconto(parseFloat(e.target.value))}
                />
              </Form>
              <PaymentButtonsContainer>
                <PaymentButton onClick={() => setFormaDePagamento('Cartão')} selected={formaDePagamento === 'Cartão'}>
                  Cartão
                </PaymentButton>
                <PaymentButton onClick={() => setFormaDePagamento('Dinheiro')} selected={formaDePagamento === 'Dinheiro'}>
                  Dinheiro
                </PaymentButton>
                <PaymentButton onClick={() => setFormaDePagamento('PIX')} selected={formaDePagamento === 'PIX'}>
                  PIX
                </PaymentButton>
              </PaymentButtonsContainer>
              <SubtotalContainer>
                <SubtotalLabel>Subtotal:</SubtotalLabel>
                <SubtotalAmount>R$ {subtotalComDesconto.toFixed(2)}</SubtotalAmount>
              </SubtotalContainer>
              <CheckoutButton onClick={() => setShowModal(true)}>Finalizar Venda</CheckoutButton>
            </CheckoutSection>
        )}
      </VendaSection>
      {showModal && (
        <ModalWrapper>
          <ModalContent>
            <h2>Deseja finalizar a venda?</h2>
            <div>
              <Button onClick={handleCheckout}>Confirmar</Button>
              <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            </div>
          </ModalContent>
        </ModalWrapper>
      )}
    </VendaContainer>
  );
};

export { CriarVenda };