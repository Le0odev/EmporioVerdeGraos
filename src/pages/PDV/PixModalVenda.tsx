import React, { useCallback, useRef, useState } from 'react';
import Modal from 'react-modal';
import PIX from 'react-qrcode-pix';
import { toast } from 'react-toastify';
import styled from 'styled-components';

Modal.setAppElement('#root');

const StyledModal = styled(Modal)`
  overlay: {
    background: rgba(0, 0, 0, 0.7);
    z-index: 1000;
  }
  content: {
    max-width: 90vw;
    width: 80%;
    max-height: 90vh;
    padding: 20px;
    border-radius: 12px;
    background: #1c1c1c;
    color: #f5f5f5;
    border: none;
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
    overflow: auto;
  }
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #2b2b2b;
  color: #e0e0e0;
`;

const Title = styled.h2`
  color: #ccc;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #2a9d8f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px;

  &:hover {
    background-color: #219c7d;
  }
`;

const CancelButton = styled.button`
  background-color: #d9534f; /* Vermelho */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 10px;

  &:hover {
    background-color: #c9302c;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const PixCodeWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
  margin: 15px 0;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);
  
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
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin-right: 10px;
`;

const CopyButton = styled.button`
  background: #2a9d8f;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background: #238b8e;
    transform: scale(1.05);
  }
`;

interface PixModalVendaProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  subtotal: number;
  fullPIX: string;
  now: number;
}

const PixModalVenda: React.FC<PixModalVendaProps> = ({
  isOpen,
  onClose,
  onCancel,
  subtotal,
  fullPIX,
  now,
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

  return (
    <StyledModal isOpen={isOpen} onRequestClose={onClose} contentLabel="Modal PIX">
      <ModalContent>
        <Title>Pagamento via PIX</Title>
        <PIX
          pixkey="leonardovinicius09@hotmail.com"
          merchant="Empório Verde Grãos"
          city="Abreu e Lima"
          amount={subtotal}
          onLoad={handleLoad}
          resize={184}
          variant="fluid"
          padding={30}
          code={`RQP${now}`}
          color="#2a9d8f"
          bgColor="#ccc"
        />
        <PixCodeWrapper>
            <PixCodeContainer>
              <PixCode>{pixValue}</PixCode>
              <CopyButton onClick={handleCopy}>Copiar</CopyButton>
            </PixCodeContainer>
          </PixCodeWrapper>

        <ButtonsContainer>
          <Button onClick={onClose}>Confirmar Pagamento</Button>
          <CancelButton onClick={onCancel}>Cancelar</CancelButton>
        </ButtonsContainer>
      </ModalContent>
    </StyledModal>
  );
};

export default PixModalVenda;
