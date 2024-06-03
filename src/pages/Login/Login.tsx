import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Form, Label, Input, Button, H2 } from './StyledLogin';
import axios from 'axios';
import { useAuth } from '../Login/authContext'; // Importa o contexto de autenticação

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10rem;
`;

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginResponse {
  acessToken: string; // Corrigir o nome do campo conforme a resposta da API
  expiresIn: number;
}

const login = async (data: LoginFormData): Promise<LoginResponse> => {
  const response = await axios.post('http://localhost:8080/login', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Login failed');
  }

  return response.data;
};

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });
  const navigate = useNavigate();
  const { setToken } = useAuth(); // Usa o contexto de autenticação para definir o token
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      console.log('Login bem-sucedido, token:', data.acessToken); // Certifique-se de usar o nome correto do campo
      localStorage.setItem('accessToken', data.acessToken); // Corrigir para usar o nome correto do campo
      setToken(data.acessToken); // Define o token no contexto de autenticação
      navigate('/'); // Redirect to home or another page
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        <H2>Login</H2>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit">Login</Button>
      </Form>
    </LoginContainer>
  );
};

export default LoginForm;
