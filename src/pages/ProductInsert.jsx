// src/pages/CadastrarProduto.tsx
import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;


  const ProductInsert =  () => {

  
    <FormContainer>
      <h1>Cadastrar Produto</h1>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="nome">Nome do Produto</Label>
        <Input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <Label htmlFor="preco">Preço</Label>
        <Input
          type="number"
          id="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
        />
        <Label htmlFor="descricao">Descrição</Label>
        <Input
          type="text"
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </FormContainer>
 
}

export default ProductInsert;
