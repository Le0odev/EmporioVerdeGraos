import styled from 'styled-components';

// Importando os styled components do formulário de cadastro de produtos
import { Form, Label, Input, Button,  H2 } from './StyledLogin';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10rem;
  

`;

const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica de login
  };

  return (
    <LoginContainer>
     
      <Form onSubmit={handleSubmit}>
        <H2>Login</H2>
        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" name="username" required />
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" name="password" required />
        <Button type="submit">Login</Button>
      </Form>
    </LoginContainer>
  );
};

export default LoginForm;
