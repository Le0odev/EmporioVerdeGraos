import React, { useCallback, useRef, useState } from 'react';
import Modal from 'react-modal';
import PIX from 'react-qrcode-pix';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

Modal.setAppElement('#root'); // Define o elemento raiz para acessibilidade

const StyledModal = styled(Modal)`
  overlay: {
    background: rgba(0, 0, 0, 0.7); // Fundo escurecido
    z-index: 1000;
  }
  content: {
    max-width: 90vw; // Largura máxima para telas pequenas
    width: 80%; // Largura em porcentagem
    max-height: 90vh; // Altura máxima para não ultrapassar a tela
    padding: 20px; // Padding reduzido para dispositivos móveis
    border-radius: 12px; // Borda arredondada
    background: #1c1c1c; // Fundo mais escuro
    color: #f5f5f5; // Texto claro para contraste
    border: none;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3); // Sombra mais pronunciada
    overflow: auto; // Adiciona rolagem se o conteúdo for grande
  }
`;

const ModalContent = styled.div`
  width: 90%; // Largura em porcentagem para evitar que ocupe 100% da tela
  max-width: 600px; // Define um tamanho máximo para o modal
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto ; // Centraliza horizontalmente
  padding: 20px;
  border-radius: 8px; // Bordas arredondadas para suavidade
  background-color: #2b2b2b; // Cor mais escura e neutra
  color: #e0e0e0; // Texto claro para contraste

  & h2 {
    margin-bottom: 10px;
    color: #ccc; // Título em branco
    font-size: 1.2rem; // Tamanho do título
  }

  & h3 {
    margin-top: 10px;
    margin-bottom: 20px;
    color: #fff; // Título secundário
    font-size: 1.2rem; // Tamanho do subtítulo
  }
`;

const Button = styled.button`
  background-color: #2a9d8f; // Cor de fundo do botão
  color: white; // Cor do texto
  border: none; // Sem borda
  border-radius: 8px; // Bordas arredondadas
  padding: 12px 24px; // Espaçamento interno
  font-size: 16px; // Tamanho da fonte
  cursor: pointer; // Cursor de ponteiro ao passar o mouse
  transition: background-color 0.3s ease, transform 0.2s ease; // Transição suave
  margin: 10px; // Espaçamento entre os botões

  &:hover {
    background-color: #219c7d; // Cor de fundo ao passar o mouse
    transform: scale(1.05); // Efeito de zoom ao passar o mouse
  }
`;

// Botão de fechar com cor diferente
const CloseButton = styled(Button)`
  background-color: #e74c3c; // Cor de fundo do botão de fechar

  &:hover {
    background-color: #c0392b; // Cor ao passar o mouse no botão de fechar
  }
`;

// Toast Notifications com melhorias
const ToastContainerStyled = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 8px; // Borda arredondada
    font-size: 14px; // Tamanho da fonte
    padding: 15px; // Padding interno
  }
  
  .Toastify__toast--success {
    background: #28a745; // Cor de fundo do sucesso
  }

  .Toastify__toast--error {
    background: #dc3545; // Cor de fundo do erro
  }
`;

const PixCodeWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5); // Fundo escuro semi-transparente
  padding: 10px; // Aumentado para melhor aparência
  border-radius: 10px; // Arredondando as bordas
  margin: 15px 0; // Margem superior e inferior
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5); // Sombra para destacar o bloco
`;

const PixCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  max-width: 300px; // Largura máxima para o bloco
  background: transparent; // Sem fundo
  border-radius: 6px;
  position: relative;
  overflow: hidden;
`;

const PixCode = styled.code`
  display: block;
  font-size: 14px;
  color: #fff; // Texto branco
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin-right: 10px; // Espaço entre o texto e o botão
`;

const CopyButton = styled.button`
  background: #2a9d8f; // Cor de fundo do botão de cópia
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease; // Transição suave

  &:hover {
    background: #238b8e; // Cor ao passar o mouse
    transform: scale(1.05); // Efeito de zoom ao passar o mouse
  }
`;
interface ModalPixProps {
  show: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
  subtotal: number;
  freight: number;
  fullPIX: string;
  now: number;
  whatsappUrl: string; // Adicionando a propriedade

}

const PixModal: React.FC<ModalPixProps> = ({
  show,
  isOpen,
  onRequestClose,
  subtotal,
  freight,
  fullPIX,
  now,
  whatsappUrl, // Recebendo a URL do WhatsApp como prop

}) => {
  const [pixValue, setPixValue] = useState<string>(fullPIX || '');
  const hasLoaded = useRef(false);

  const handleLoad = useCallback((newPIX: string) => {
    if (!hasLoaded.current) {
      setPixValue(newPIX);
      hasLoaded.current = true;
    }
  }, []);

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(pixValue)
        .then(() => {
          toast.success('Código PIX copiado!', {
            position: "bottom-right",
            autoClose: 3000,
          });
        })
        .catch(() => {
          toast.error('Falha ao copiar!', {
            position: "bottom-right",
            autoClose: 3000,
          });
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = pixValue;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
  
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          toast.success('Código PIX copiado!', {
            position: "bottom-right",
            autoClose: 3000,
          });
        } else {
          throw new Error('Fallback: Falha ao copiar!');
        }
      } catch (err) {
        toast.error('Falha ao copiar!', {
          position: "bottom-right",
          autoClose: 3000,
        });
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  if (!show) {
    return null;
  }

  const totalAmount = subtotal + freight;
  

  const handleConfirmOrder = () => {
    // Abre a URL do WhatsApp ao confirmar o pedido
    window.open(whatsappUrl, '_blank');
    onRequestClose(); // Fecha o modal
  };

  if (!show) {
    return null;
  }


  return (
    <>
      <ToastContainer /> 
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Modal PIX"
      >
        <ModalContent>
          <h2>Pagamento via Pix</h2>
          <h3>Efetue o pagamento via PIX e confirme seu pedido!</h3>
          <PIX
            pixkey="+5581991676177"
            merchant="Guilherme Neves"
            city="Paraíba do Sul"
            cep="25.850-000"
            code={`RQP${now}`}
            amount={totalAmount}
            onLoad={handleLoad}
            resize={184}
            variant="fluid"
            padding={30}
            color="#2a9d8f"
            bgColor="#ccc"
            bgRounded
            divider
          />
          <PixCodeWrapper>
            <PixCodeContainer>
              <PixCode>{pixValue}</PixCode>
              <CopyButton onClick={handleCopy}>Copiar</CopyButton>
            </PixCodeContainer>
          </PixCodeWrapper>
          <div>
            <CloseButton onClick={onRequestClose}>Fechar</CloseButton>
            <Button onClick={handleConfirmOrder}>Confirmar Pedido </Button>
          </div>
        </ModalContent>
      </StyledModal>
    </>
  );
};

export default PixModal;
