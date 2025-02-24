import styled from "styled-components";

export const ChatContainer = styled.div`
  width: 100%;
  max-width: 700px; // Largura máxima aumentada
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
  background: #ffffff;
  overflow: hidden;
  margin: 20px auto;

  @media (max-width: 480px) {
    max-width: 100%; // Ocupa 100% da largura em telas pequenas
    height: 100vh; // Altura total da tela
    border-radius: 0; // Remove bordas arredondadas para telas pequenas
    margin: 0; // Remove margens
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;

  svg {
    width: 20px;
    height: 20px;
    color: #4b5563;
  }

  @media (max-width: 480px) {
    padding: 12px 16px; // Reduz o padding
    font-size: 16px; // Reduz o tamanho da fonte
  }
`;

export const ChatBox = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  @media (max-width: 480px) {
    padding: 16px; // Reduz o padding
    gap: 12px; // Reduz o espaçamento entre as mensagens
  }
`;

export const Message = styled.div<{ isUser: boolean }>`
  background: ${(props) => (props.isUser ? "#2563eb" : "#f3f4f6")};
  color: ${(props) => (props.isUser ? "#ffffff" : "#1f2937")};
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 85%;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  @media (max-width: 480px) {
    max-width: 90%; // Aumenta a largura máxima das mensagens
    font-size: 13px; // Reduz o tamanho da fonte
    padding: 10px 14px; // Reduz o padding
  }
`;

export const InputContainer = styled.div`
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
  display: flex;
  gap: 12px;

  @media (max-width: 480px) {
    padding: 12px 16px; // Reduz o padding
    gap: 8px; // Reduz o espaçamento entre os elementos
  }
`;

export const InputField = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 10px 14px; // Reduz o padding
    font-size: 13px; // Reduz o tamanho da fonte
  }
`;

export const SendButton = styled.button`
  padding: 12px;
  border-radius: 24px;
  border: none;
  background: #2563eb;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  
  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 480px) {
    padding: 10px; // Reduz o padding
    font-size: 13px; // Reduz o tamanho da fonte
    min-width: 40px; // Reduz a largura mínima
  }
`;