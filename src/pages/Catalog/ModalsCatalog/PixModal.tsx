import React, { useCallback, useRef, useState } from 'react';
import Modal from 'react-modal';
import PIX from 'react-qrcode-pix';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

Modal.setAppElement('#root'); // Define o elemento raiz para acessibilidade

const StyledModal = styled(Modal)`
  overlay: {
    background: rgba(0, 0, 0, 0.7); // Escurece mais o fundo
  }
  content: {
    max-width: 80vw; // Largura máxima para telas pequenas
    width: 80%; // Largura em porcentagem
    max-height: 80vh; // Altura máxima para não ultrapassar a tela
    margin: auto;
    padding: 20px; // Padding reduzido para dispositivos móveis
    border-radius: 12px; // Borda arredondada
    background: #333; // Fundo escuro para todo o modal
    color: #fff; // Cor do texto para contraste
    border: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); // Sombra mais pronunciada
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
  margin: 100px auto 0 auto; // Centraliza horizontalmente e afasta do topo
  padding: 20px;
  border-radius: 8px; // Bordas arredondadas para suavidade
  background-color: #3b3b3b; // Cor mais escura e neutra
  color: #f0f0f0; // Texto claro para contraste

  & h2 {
    margin-bottom: 15px;
    color: #ccc; // Cor neutra para o título
  }
`;
const CloseButton = styled.button`
  background: #e63946; // Vermelho mais forte
  color: #fff;
  border: none;
  padding: 12px 24px; // Padding um pouco maior
  border-radius: 6px; // Borda arredondada
  cursor: pointer;
  font-size: 18px; // Fonte um pouco maior
  margin-top: 20px; // Margem superior ajustada
  transition: background 0.3s ease; // Transição suave para mudança de cor

  &:hover {
    background: #d62839; // Cor do botão em hover
  }
`;

const PixCodeWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7); // Fundo escuro semi-transparente para destaque
  padding: 5px;
  border-radius: 10px; // Arredondando as bordas do fundo
  margin: 15px auto 15px; // Espaçamento inferior entre o código e outros elementos
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5); // Sombra para destacar o bloco
`;

const PixCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%; 
  max-width: 300px; // Largura máxima para o bloco
  background: transparent; // Sem fundo para não interferir
  border-radius: 6px; 
  position: relative;
  overflow: hidden;
`;

const PixCode = styled.code`
  display: block;
  font-size: 14px; 
  color: #fff; // Cor do texto branca para contraste
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis; 
  text-align: center; 
  margin-right: 10px; // Espaço entre o texto e o botão
`;

const CopyButton = styled.button`
  background: #2a9d8f; 
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px; 

  &:hover {
    background: #238b8e;
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

}

const PixModal: React.FC<ModalPixProps> = ({ show, isOpen, onRequestClose, subtotal, freight, fullPIX, now }) => {
  const [pixValue, setPixValue] = useState<string>(fullPIX || '');
  const hasLoaded = useRef(false); // Track if onLoad has been executed

  const handleLoad = useCallback((newPIX: string) => {
    if (!hasLoaded.current) {
      setPixValue(newPIX);
      hasLoaded.current = true; // Prevent further updates
    }
  }, []);

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      // Verifica se a API de Clipboard está disponível e o contexto é seguro (https)
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
      // Alternativa para navegadores móveis que não suportam Clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = pixValue;
      // Garante que o elemento não seja visível
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
  




  // Conditionally render based on `show` prop
  if (!show) {
    return null; // Do not render anything if `show` is false
  }

  const totalAmount = subtotal + freight;

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
        <PIX
          pixkey="leonardovinicius09@hotmail.com"
          merchant="Verde Grãos"
          city=""
          cep="25.850-000"
          code={`RQP${now}`}
          amount={totalAmount}
          onLoad={handleLoad}
          resize={184}
          variant="fluid"
          padding={30}
          color="#2a9d8f" // Cor do QR Code
          bgColor="#ccc" // Cor de fundo do QR Code
          bgRounded
          divider
        />
        <PixCodeWrapper>
          <PixCodeContainer>
            <PixCode>{pixValue}</PixCode>
            <CopyButton onClick={handleCopy}>Copiar</CopyButton>
          </PixCodeContainer>
        </PixCodeWrapper>
        <CloseButton onClick={onRequestClose}>Fechar</CloseButton>
      </ModalContent>
    </StyledModal>
    </>
  );
};

export default PixModal;
