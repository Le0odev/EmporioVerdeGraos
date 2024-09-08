  import styled from 'styled-components';

  export const FooterContainer = styled.footer`
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 0.3rem;
    bottom: 0;        // Alinha o footer na parte inferior da página
    left: 0;          // Alinha o footer à esquerda da página
    z-index: 1000;    // Garante que o footer fique acima de outros elementos
    
    // Exibir footer somente em telas móveis
    @media (min-width: 769px) {
      display: none;
    }
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
