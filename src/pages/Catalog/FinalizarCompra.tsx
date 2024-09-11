import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import {
  CheckoutContainer,
  AddressSection,
  PaymentSection,
  SummarySection,
  CheckoutButton,
  InputField,
  PaymentOptionButton,
  AddressDetails,
  TotalPrice,
  CartItemSummary,
  FreightDetails,
} from './StyledCheckout';
import { useNavigate } from 'react-router-dom';
import HeaderCart from '../../components/Header/HeadrCart/HeaderCart';

type Region = 'Abreu e Lima' | 'Igarassu' | 'Paulista' | 'Outros';

// Função para obter o valor do frete por região
const getFreightByRegion = (region: Region): number => {
  const regionFreight: Record<Region, number> = {
    'Abreu e Lima': 7.0,
    'Igarassu': 12.0,
    'Paulista': 13.0,
    'Outros': 20.0,
  };
  return regionFreight[region] || 20.0; // Valor padrão para 'Outros'
};

// Função para determinar a região com base no CEP
const getRegionFromCep = (cep: string): Region => {
  if (cep.startsWith('535')) return 'Abreu e Lima';
  if (cep.startsWith('536')) return 'Igarassu';
  if (cep.startsWith('534')) return 'Paulista';
  return 'Outros'; // Default para regiões não mapeadas
};

const FinalizarCompra: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [changeAmount, setChangeAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [freight, setFreight] = useState<number>(0);
  const navigate = useNavigate();

  // Lida com a mudança do CEP e busca o endereço e região
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let newCep = e.target.value;
    
    // Remove qualquer hífen ou espaços do CEP digitado
    newCep = newCep.replace(/\D/g, '');
    
    setCep(newCep);
  
    if (newCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${newCep}/json/`);
        if (response.data && !response.data.erro) {
          // Preenche o campo de endereço
          setAddress(`${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`);
          
          // Determina a região e calcula o frete
          const region = getRegionFromCep(newCep);
          setFreight(getFreightByRegion(region));
        } else {
          setAddress('CEP inválido');
          setFreight(getFreightByRegion('Outros'));
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        setAddress('Erro ao buscar CEP');
        setFreight(getFreightByRegion('Outros'));
      }
    }
  };

  // Função para selecionar o método de pagamento
  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
  };

  // Função para finalizar o pedido
  const handleFinalizeOrder = () => {
    const errors: string[] = [];

    if (!cep) errors.push('CEP é obrigatório');
    if (!number) errors.push('Número é obrigatório');
    if (!paymentMethod) errors.push('Método de pagamento é obrigatório');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    // Formata a mensagem do pedido para envio via WhatsApp
    const orderMessage = `Pedido:\n${cartItems.map(item => `${item.productName} - Quantidade: ${item.quantity || item.weight} - Subtotal: R$${item.bulk ? (item.productPrice / 1000 * (item.weight || 0)).toFixed(2) : (item.productPrice * (item.quantity || 0)).toFixed(2)}`).join('\n')}
    \nEndereço: ${address}, ${number}, ${complement}
    \nMétodo de Pagamento: ${paymentMethod}${paymentMethod === 'Dinheiro' && changeAmount ? `\nTroco para: R$${changeAmount}` : ''}
    \nFrete: R$${freight.toFixed(2)}
    \nTotal: R$${(cartItems.reduce((total, item) => total + (item.bulk ? (item.productPrice / 1000) * item.weight! : item.productPrice * item.quantity!), 0) + freight).toFixed(2)}
    `;

    // Envia o pedido via WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5551999999999&text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
  };

  // Função para retornar ao carrinho
  const handleBackToCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <HeaderCart
        showBackButton
        handleBack={handleBackToCart}
        handleGoToCart={handleBackToCart}
      />
      <CheckoutContainer>
        <h1>Finalizar Compra</h1>

        {/* Seção de endereço */}
        <AddressSection>
          <h2>Endereço de Entrega</h2>
          <InputField
            type="text"
            placeholder="Digite seu CEP (Apenas números)"
            value={cep}
            onChange={handleCepChange}
          />
          {address && <AddressDetails>{address}</AddressDetails>}
          <InputField
            type="text"
            placeholder="Número"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Complemento"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
        </AddressSection>

        {/* Seção de pagamento */}
        <PaymentSection>
          <h2>Forma de Pagamento</h2>
          <PaymentOptionButton onClick={() => handlePaymentSelect('Maquineta')} selected={paymentMethod === 'Maquineta'}>
            Maquineta
          </PaymentOptionButton>
          <PaymentOptionButton onClick={() => handlePaymentSelect('Dinheiro')} selected={paymentMethod === 'Dinheiro'}>
            Dinheiro
          </PaymentOptionButton>
          <PaymentOptionButton onClick={() => handlePaymentSelect('Pix')} selected={paymentMethod === 'Pix'}>
            Pix
          </PaymentOptionButton>
          {paymentMethod === 'Dinheiro' && (
            <InputField
              type="number"
              placeholder="Troco para quanto?"
              value={changeAmount || ''}
              onChange={(e) => setChangeAmount(Number(e.target.value))}
            />
          )}
        </PaymentSection>

        {/* Resumo do pedido */}
        <SummarySection>
          <h2>Resumo do Pedido</h2>
          {cartItems.map(item => (
            <CartItemSummary key={item.id}>
              <p>{item.productName}</p>
              <p>Subtotal: R${item.bulk ? (item.productPrice / 1000 * (item.weight || 0)).toFixed(2) : (item.productPrice * (item.quantity || 0)).toFixed(2)}</p>
            </CartItemSummary>
          ))}
          <FreightDetails>Frete: R${freight.toFixed(2)}</FreightDetails> {/* Detalhe do frete */}
          <TotalPrice>Total: R${(cartItems.reduce((total, item) => total + (item.bulk ? (item.productPrice / 1000) * item.weight! : item.productPrice * item.quantity!), 0) + freight).toFixed(2)}</TotalPrice>
        </SummarySection>

        {formErrors.length > 0 && (
          <div>
            {formErrors.map((error, index) => (
              <p key={index} style={{ color: 'red' }}>{error}</p>
            ))}
          </div>
        )}

        {/* Botão para finalizar a compra */}
        <CheckoutButton onClick={handleFinalizeOrder}>
          Finalizar Pedido
        </CheckoutButton>
      </CheckoutContainer>
    </>
  );
};

export default FinalizarCompra;
