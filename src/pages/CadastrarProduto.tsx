
import React, { useState } from 'react';
import {
  ProductContainer,
  Section,
  SectionTitle,
  Form,
  Label,
  Input,
  Select,
  Button,
  H1

} from '../components/StyledProdutos';





const CadastrarProduto: React.FC = () => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar os dados para a API
    console.log({ nome, preco, descricao });
  };

  return (
    <>  
    <H1>Gerenciamento de produtos:</H1>
    <ProductContainer>
      <Section className="product-section">
        
        <SectionTitle>Cadastrar Produto</SectionTitle>
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
          <Label htmlFor="categoria">Categoria</Label>
          <Select></Select>
          <Button type="submit">Cadastrar</Button>
        </Form>
        
      </Section>
      <Section className="search-section">
        <SectionTitle>Verificar existência do produto</SectionTitle>
        {/* Conteúdo da seção de pesquisa */}
      </Section>
    </ProductContainer>
    </>
  );
};

export default CadastrarProduto;
