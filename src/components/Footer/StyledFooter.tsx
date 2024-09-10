import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  width: 100%;
  padding: 0.6rem;
  text-align: center;
  margin-top: auto; /* Empurra o footer para o final */
  border-radius: 2px;

  @media (min-width: 769px) {
    display: none; /* Esconde o footer em telas maiores */
  }

   @media (max-width: 768px) {
    margin-top: 10px;
  
  }
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.4rem;
  transition: color 0.3s ease;

    &:hover {
      color: #f0a500;
    }
  `;

export const Copyright = styled.p`
  font-size: 0.75rem;
  color: #ccc;
  text-align: center;
`;