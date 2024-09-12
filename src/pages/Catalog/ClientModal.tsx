import React, { useState } from 'react';
import { Button, Form, Input, Label, ModalContainer, ModalContent } from './StyledClientModal';

// Definimos a interface para as propriedades do modal
interface ClientModalProps {
  onSave: (name: string, phone: string) => void;
}

const ClientModal: React.FC<ClientModalProps> = ({ onSave }) => {
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Chama a função onSave passando o nome e telefone
    onSave(clientName, clientPhone);
  };

  return (
    <ModalContainer>
      <ModalContent>
        <h2>Informações do Cliente</h2>
        <Form onSubmit={handleSubmit}>
          <Label>Nome:</Label>
          <Input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Digite seu nome"
            required
          />

          <Label>Celular:</Label>
          <Input
            type="text"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder="Celular (WPP)"
            required
          />

          <Button type="submit">Salvar</Button>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default ClientModal;
