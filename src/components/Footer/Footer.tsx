

import { FooterContainer, FooterContent, SocialIcons, SocialIcon, Copyright } from './StyledFooter';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';


export const Footer = () => {
  return (
    
    <FooterContainer>
      <FooterContent>
        <SocialIcons>
        <SocialIcon href="https://api.whatsapp.com/send?phone=5581991676177&text=Oii%2C+vim+pelo+Instagram+%F0%9F%92%9A" aria-label="Whatsapp"><FaWhatsapp /></SocialIcon>
          <SocialIcon href="https://instagram.com/emporioverdegraos" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </SocialIcon>
        </SocialIcons>
        <Copyright>© 2024 Empório Verde Grãos. Todos os direitos reservados.</Copyright>
      </FooterContent>
    </FooterContainer>
  );
};
