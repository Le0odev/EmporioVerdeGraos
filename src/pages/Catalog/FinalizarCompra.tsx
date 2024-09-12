import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import HeaderCart from '../../components/Header/HeadrCart/HeaderCart';
import axios from 'axios';
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
  SuccessModal,
} from './StyledCheckout';
import { useNavigate } from 'react-router-dom';
import { CartItem as CartItemType } from './Product';
import { useAuth } from '../Login/authContext';

type Region = 'Abreu e Lima' | 'Igarassu' | 'Paulista' | 'Outros';

const getFreightByRegion = (region: Region): number => {
  const regionFreight: Record<Region, number> = {
    'Abreu e Lima': 7.0,
    'Igarassu': 12.0,
    'Paulista': 13.0,
    'Outros': 20.0,
  };
  return regionFreight[region] || 20.0; // Valor padrão para 'Outros'
};

const getRegionFromCep = (cep: string): Region => {
  if (cep.startsWith('535')) return 'Abreu e Lima';
  if (cep.startsWith('536')) return 'Igarassu';
  if (cep.startsWith('534')) return 'Paulista';
  return 'Outros'; // Default para regiões não mapeadas
};

const FinalizarCompra: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [changeAmount, setChangeAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [freight, setFreight] = useState<number>(0);
  const [orderSuccess, setOrderSuccess] = useState(false); // Estado para o modal de sucesso
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.bulk) {
        const storedWeight = localStorage.getItem(`weight_${item.id}`);
        const weight = storedWeight ? parseFloat(storedWeight) : item.weight || 0;
        return total + ((item.productPrice / 1000) * weight);
      } else {
        return total + (item.productPrice * (item.quantity || 0));
      }
    }, 0);
  };

  const subtotal = calculateSubtotal();

  useEffect(() => {
    cartItems.forEach(item => {
      const storedWeight = localStorage.getItem(`weight_${item.id}`);
      if (storedWeight) {
        item.weight = parseFloat(storedWeight);
      }
    });
  }, [cartItems]);

  useEffect(() => {
    cartItems.forEach(item => {
      if (item.weight !== undefined) {
        localStorage.setItem(`weight_${item.id}`, item.weight.toString());
      }
    });
  }, [cartItems]);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = e.target.value.replace(/\D/g, '');
    setCep(newCep);

    if (newCep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${newCep}/json/`);
        if (response.data && !response.data.erro) {
          setAddress(`${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`);
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

  const handlePaymentSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handleFinalizeOrder = () => {
    const errors: string[] = [];
    if (!cep) errors.push('CEP é obrigatório');
    if (!number) errors.push('Número é obrigatório');
    if (!paymentMethod) errors.push('Método de pagamento é obrigatório');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    const orderMessage = `Pedido:\n${cartItems.map(item => {
      const subtotalItem = item.bulk
        ? ((item.productPrice / 1000) * (item.weight || 0)).toFixed(2)
        : (item.productPrice * (item.quantity || 0)).toFixed(2);
      return `${item.productName} - Quantidade: ${item.bulk ? (item.weight || 0) + ' kg' : item.quantity} - Subtotal: R$${subtotalItem}`;
    }).join('\n')}
    \nEndereço: ${address}, ${number}, ${complement}
    \nMétodo de Pagamento: ${paymentMethod}${paymentMethod === 'Dinheiro' && changeAmount ? `\nTroco para: R$${changeAmount}` : ''}
    \nFrete: R$${freight.toFixed(2)}
    \nTotal: R$${(subtotal + freight).toFixed(2)}
    `;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=5551999999999&text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappUrl, '_blank');

    // Limpar o carrinho e os campos
    clearCart();
    setCep('');
    setAddress('');
    setNumber('');
    setComplement('');
    setPaymentMethod(null);
    setChangeAmount(null);

    // Exibir modal de sucesso
    setOrderSuccess(true);

    // Fechar modal de sucesso automaticamente após 3 segundos
    setTimeout(() => {
      setOrderSuccess(false);
      navigate('/');
    }, 3000);
  };

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

        <SummarySection>
    <h2>Resumo do Pedido</h2>
    {cartItems.map(item => (
      <CartItemSummary key={item.id}>
        <div className="item-details">
          <p className="item-name">{item.productName}</p>
          <p className="item-price"> Preço: {item.productPrice.toFixed(2)}
           </p>
          <p className="item-info">
            {item.bulk ? `Peso: ${(item.weight || 0)} g` : `Unidade: ${(item.quantity || 0)}`}
          </p>
          <p className="item-subtotal">
            R${item.bulk
              ? ((item.productPrice / 1000) * (item.weight || 0)).toFixed(2)
              : (item.productPrice * (item.quantity || 0)).toFixed(2)}
          </p>
        </div>
      </CartItemSummary>
    ))}
    <FreightDetails>Frete: R${freight.toFixed(2)}</FreightDetails>
    <TotalPrice>Total: R${(subtotal + freight).toFixed(2)}</TotalPrice>
  </SummarySection>

        <CheckoutButton onClick={handleFinalizeOrder}>
          Finalizar Pedido
        </CheckoutButton>

        {formErrors.length > 0 && (
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        {/* Modal de Sucesso */}
        {orderSuccess && (
          <SuccessModal>
            <h2>Pedido Enviado com Sucesso!</h2>
          </SuccessModal>
        )}
      </CheckoutContainer>
    </>
  );
};

export default FinalizarCompra;
