import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  width: 100%;
  border-radius: 12px;
  margin-top: 1rem;
  padding: 0.03rem;
  bottom: 0;
  left: 0;
  
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;  // Espaçamento entre os ícones ajustado
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.4rem;  // Aumentei um pouco o tamanho dos ícones para maior visibilidade
  transition: color 0.3s ease;

  &:hover {
    color: #f0a500;
  }
`;

export const Copyright = styled.p`
  font-size: 0.75rem;  // Tamanho levemente maior para legibilidade
  color: #ccc;
  text-align: center;
`;
