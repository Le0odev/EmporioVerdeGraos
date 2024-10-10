
  import React, { useState, useEffect, useCallback, useRef } from 'react';
  import { useCart } from './CartContext';
  import HeaderCart from '../../components/Header/HeadrCart/HeaderCart';
  import {
    CheckoutContainer,
    AddressSection,
    PaymentSection,
    SummarySection,
    CheckoutButton,
    InputField,
    PaymentOptionButton,
    TotalPrice,
    CartItemSummary,
    FreightDetails,
    SuccessModal,
    MapContainer,
    PickupInfo,
    SuccessButton,
    Overlay,
  } from './StyledCheckout'; // Adicione o estilo para o mapa
  import { useNavigate } from 'react-router-dom';
  import MapLoader from '../../components/MapApi/MapLoader'; // Importe o componente que carrega o script
  import MyMapComponent from '../../components/MapApi/MyMapComponent'; // Importe o componente do mapa
  import ClientModal from './ModalsCatalog/ClientModal'; // Importe o componente do modal
  import PixModal from './ModalsCatalog/PixModal';
  import { toast } from 'react-toastify';


  interface ClientInfo {
    name: string;
    phone: string;
  }

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
    const [deliveryType, setDeliveryType] = useState<'Entrega' | 'Retirada'>('Entrega'); // Estado para tipo de entrega
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
    const [changeAmount, setChangeAmount] = useState<number | null>(null);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [freight, setFreight] = useState<number>(0);
    const [orderSuccess, setOrderSuccess] = useState(false); // Estado para o modal de sucesso
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null); // Para o mapa
    const [showMap, setShowMap] = useState(false); // Estado para mostrar o mapa de confirmação
    const [clientInfo, setClientInfo] = useState<ClientInfo>({ name: '', phone: '' });
    const [showModal, setShowModal] = useState<boolean>(true); // Para exibir o modal
    const [showPixModal, setShowPixModal] = useState<boolean>(false); // Estado para o modal do Pix
    const [cepError, setCepError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [paymentMethodError, setPaymentMethodError] = useState(false);
    const [changeAmountError, setChangeAmountError] = useState(false);

    const cepRef = useRef<HTMLInputElement>(null);
    const numberRef = useRef<HTMLInputElement>(null);
    const paymentMethodRef = useRef<HTMLSelectElement>(null);
    const changeAmountRef = useRef<HTMLInputElement>(null);
 

    
  // Coordenadas para a loja
  const storeCoordinates = {
    lat: -7.9055806,
    lng: -34.9002584,
    };

    const navigate = useNavigate();

    useEffect(() => {
      const savedName = localStorage.getItem('clientName');
      const savedPhone = localStorage.getItem('clientPhone');
      
      if (savedName && savedPhone) {
        setClientInfo({ name: savedName, phone: savedPhone });
      } else {
        setShowModal(true);
      }
    }, []);

    const handleSaveClientInfo = (name: string, phone: string) => {
      setClientInfo({ name, phone });
      localStorage.setItem('clientName', name);
      localStorage.setItem('clientPhone', phone);
      setShowModal(false);
    };

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
    const now = new Date().toISOString();

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newCep = e.target.value;
      setCep(newCep);
    
      if (newCep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${newCep}/json/`);
          const data = await response.json();
    
          if (!data.erro) {
            setRua(data.logradouro || '');
            setBairro(data.bairro || '');
            setCidade(data.localidade || '');
            setAddress(`${data.logradouro}, ${data.bairro}, ${data.localidade}`);
    
            // Detectar região e calcular frete
            const region = getRegionFromCep(newCep);
            const calculatedFreight = getFreightByRegion(region);
            setFreight(calculatedFreight);
    
            // Buscar coordenadas usando HERE API
            const geoResponse = await fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${newCep}&apiKey=wlYVB-MrHJ_615NeIzWUZ9XsXzZcbe5yAlmk1EjcH2w`);
            const geoData = await geoResponse.json();
            if (geoData.items.length > 0) {
              const location = geoData.items[0].position;
              setCoordinates({ lat: location.lat, lng: location.lng });
              setShowMap(true); // Exibir o mapa após obter coordenadas
            } else {
              alert("CEP não encontrado");
              setRua('');
              setBairro('');
              setCidade('');
              setFreight(0);
              setShowMap(false); // Esconder o mapa se o CEP não for encontrado
            }
          } else {
            alert("CEP não encontrado");
            setRua('');
            setBairro('');
            setCidade('');
            setFreight(0);
            setShowMap(false); // Esconder o mapa se o CEP não for encontrado
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
          setRua('');
          setBairro('');
          setCidade('');
          setFreight(0);
          setShowMap(false); // Esconder o mapa em caso de erro
        }
      } else {
        setRua('');
        setBairro('');
        setCidade('');
        setFreight(0);
        setShowMap(false); // Esconder o mapa se o CEP estiver incompleto
      }
    };

    const handlePaymentSelect = (method: string) => {
      setPaymentMethod(method);
    };
  
    const handleFinalizeOrder = () => {
      const errors: string[] = [];
      let hasError = false;

    
      // Resetando os erros
        setCepError(false);
        setNumberError(false);
        setPaymentMethodError(false);
        setChangeAmountError(false);

        if (deliveryType === 'Entrega') {
          if (!cep) {
            errors.push('CEP é obrigatório');
            setCepError(true); // Marcar o erro no CEP
            hasError = true;
            cepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll suave até o CEP

          }
          if (!number) {
            errors.push('Número é obrigatório');
            setNumberError(true); // Marcar o erro no número
            hasError = true;
            numberRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll suave até o Número

          }
        }

        if (!paymentMethod) {
          errors.push('Método de pagamento é obrigatório');
          setPaymentMethodError(true); // Marcar erro no método de pagamento
          hasError = true;
          paymentMethodRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll suave até o Método de Pagamento

        }

        if (paymentMethod === 'Dinheiro' && (changeAmount === null || changeAmount < subtotal + freight)) {
          errors.push('O valor inserido para troco deve ser maior ou igual ao total.');
          setChangeAmountError(true); // Marcar erro no valor do troco
          hasError = true;
          changeAmountRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Scroll suave até o Valor de Troco

        }

        if (hasError) {
          // Exibe os erros usando toastify
          errors.forEach(error => toast.error(error));
          return;
        }
    
      const total = subtotal + freight;
      const orderMessage = `Pedido:\n${cartItems.map(item => {
        const subtotalItem = item.bulk
            ? ((item.productPrice / 1000) * (item.weight || 0)).toFixed(2)
            : (item.productPrice * (item.quantity || 0)).toFixed(2);
        return `
    ${item.productName}
    Sabor: ${item.selectedFlavor}
    Quantidade: ${item.bulk ? (item.weight || 0) + ' kg' : item.quantity}
    Subtotal: R$${subtotalItem}`;
    }).join('\n')}\n\nEndereço: ${cidade}, ${bairro}, ${rua}, ${number}, ${complement} \n\nResumo da Compra:\nSubtotal: R$${subtotal.toFixed(2)}\nFrete: R$${freight.toFixed(2)}\n\nTotal: R$${total.toFixed(2)}\n`;;
    
      const paymentDetails = paymentMethod === 'Dinheiro'
        ? `\nO cliente irá pagar: R$${changeAmount?.toFixed(2)}\nTroco: R$${(changeAmount ? changeAmount - total : 0).toFixed(2)}`
        : `\nMétodo de Pagamento: ${paymentMethod}`;
    
      const clientDetails = `\n\nNome do Cliente: ${clientInfo.name}\nTelefone: ${clientInfo.phone}`;
      const mapLink = coordinates ? `\n\nLocalização no Mapa:\nhttps://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}` : '';
      const fullMessage = `${orderMessage}${paymentDetails}${mapLink}${clientDetails}`;
      const encodedMessage = encodeURIComponent(fullMessage);
      const phoneNumber = '5581991676177';
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
      // Abre a URL do WhatsApp
      window.open(whatsappUrl, '_blank');
    
      // Exibe o modal de Pix se o método de pagamento for Pix
      if (paymentMethod === 'Pix') {
        setShowPixModal(true);
      }
      
      // Define que o pedido foi finalizado com sucesso
      setOrderSuccess(true);
    
    };
    
    const handleSuccessRedirect = () => {
      clearCart(); // Limpa o carrinho
      navigate('/sucess', {
        state: {
          subtotal,
          freight,
          now: Date.now(), // ou qualquer outra informação relevante
        },
      });
    };
    

    const handleBackToCart = () => {
      navigate('/cart');
    };

    return (
      <>
      {showModal && <ClientModal onSave={handleSaveClientInfo} />}
        <HeaderCart
          showBackButton
          handleBack={handleBackToCart}
          handleGoToCart={handleBackToCart}
        />
        <CheckoutContainer>
        <AddressSection>
            <h2>Tipo de Entrega</h2>
            <PaymentOptionButton onClick={() => setDeliveryType('Entrega')} selected={deliveryType === 'Entrega'}>
              Entrega
            </PaymentOptionButton>
            <PaymentOptionButton onClick={() => setDeliveryType('Retirada')} selected={deliveryType === 'Retirada'}>
              Retirada
            </PaymentOptionButton>
          </AddressSection>
          {deliveryType === 'Entrega' && (
            <AddressSection>
              <InputField
                type="number"
                placeholder="CEP"
                ref={cepRef} // Associando o ref
                style={{ borderColor: cepError ? 'red' : '' }} // Alterar a cor da borda se houver erro
                value={cep}
                onChange={handleCepChange}
              />
              <InputField
                type="number"
                placeholder="Número"
                ref={cepRef} // Associando o ref
                value={number}
                style={{ borderColor: numberError ? 'red' : '' }} // Alterar a cor da borda se houver erro

                onChange={e => setNumber(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="Complemento"
                value={complement}
                onChange={e => setComplement(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="Rua"
                value={rua}
                onChange={e => setRua(e.target.value)}
                readOnly
              />
              <InputField
                type="text"
                placeholder="Bairro"
                value={bairro}
                onChange={e => setBairro(e.target.value)}
                readOnly
              />
              <InputField
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
                readOnly
              />
              {showMap && coordinates && (
              <MapContainer>
                <MapLoader>
                  <MyMapComponent coordinates={coordinates} />
                </MapLoader>
              </MapContainer>
            )}
            </AddressSection>
            
          )}
          {deliveryType === 'Retirada' && (
            <PickupInfo>
              <h2>Retirada na Loja</h2>
              <p>Endereço da loja: Avenida Jerônimo Gueiros, 299, Centro, Abreu e Lima</p>
              {storeCoordinates && (
              <MapContainer>
                <MapLoader>
                  <MyMapComponent coordinates={storeCoordinates} />
                </MapLoader>
              </MapContainer>
                )}
              </PickupInfo>
            
          )}
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
          <PaymentSection>
            <h2>Forma de Pagamento</h2>
            <PaymentOptionButton onClick={() => handlePaymentSelect('Maquineta')} selected={paymentMethod === 'Maquineta'}>
              Cartão
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
                ref={changeAmountRef} // Associando o ref
                value={changeAmount || ''}
                style={{ borderColor: changeAmountError ? 'red' : '' }} // Alterar a cor da borda se houver erro
                onChange={(e) => setChangeAmount(Number(e.target.value))}
                required
              />
            )}
          </PaymentSection>
          <CheckoutButton onClick={handleFinalizeOrder}>
                  Finalizar Pedido
                </CheckoutButton>
        </CheckoutContainer>
        {orderSuccess && !showPixModal && (
          <>
          <Overlay />
        <SuccessModal>
          <h2>Pedido realizado com sucesso!</h2>
          <p>Obrigado por sua compra. Seu pedido foi processado com sucesso.</p>
          <SuccessButton onClick={handleSuccessRedirect}>Ir para página de sucesso</SuccessButton >
        </SuccessModal>
        </>
      )}     
       <PixModal
          show={showPixModal}
          isOpen={showPixModal} // Ajuste conforme necessário
          onRequestClose={() => setShowPixModal(false)} // Ajuste conforme necessário
          subtotal={subtotal} // Ajuste conforme necessário
          freight={freight} // Ajuste conforme necessário
          fullPIX={''} now={0} 
          />
        
      </>
    );
  };

  export default FinalizarCompra;







            
        