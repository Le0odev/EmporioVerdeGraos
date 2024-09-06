import styled from 'styled-components';

// Container geral do Login
export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Garante que o login ocupe a tela toda
  padding: 20px;

  @media (max-width: 768px) {
    margin-top: 50%;
    display: block;
    padding: 0; // Remover padding adicional em mobile
    justify-content: center; 
    align-items: center; // Mantém o centro na tela mobile
  }
`;

// Container do Formulário
export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px; // Largura ideal para PC
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    max-width: 90%; // No mobile, usa 90% da largura
    padding: 1rem; // Reduzir padding para caber melhor
    margin: 0 auto; // Certificar que está centralizado horizontalmente
  }
`;

// Logo
export const LogoContainer = styled.div`

  @media (max-width: 768px) {
    margin-bottom: 1rem; // Menor espaçamento no mobile
  }
`;

export const LogoImage = styled.img`
  width: 100px;
  height: auto;

  @media (max-width: 768px) {
    width: 80px; // Reduzir a logo em telas pequenas
  }
`;

// Título
export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.5rem; // Menor título em mobile
  }
`;

// Campos de entrada
export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 1rem;
  text-align: left;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  @media (max-width: 768px) {
    padding: 0.65rem; // Reduzir padding em mobile para inputs
    margin-bottom: 1rem; // Reduzir margem inferior
  }
`;

// Botão
export const Button = styled.button`
  width: 100%;
  background-color: #007bff;
  color: #fff;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.75rem; // Menor padding para o botão em mobile
  }
`;

// Mensagem de erro
export const ErrorMessage = styled.p`
  margin-top: 1rem;
  color: #e74c3c;
  font-size: 0.875rem;
  text-align: center;
`;


// Estilo adicional para o formulário (opcional)
export const Form = styled.form`
  
`;
