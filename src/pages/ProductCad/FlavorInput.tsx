import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  margin: 20px 0;
`;

const ToggleButton = styled.button`
  background-color: #4caf50; /* Verde */
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: -200px;

  &:hover {
    background-color: #45a049; /* Verde mais escuro */
  }
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    border-color: #4caf50; /* Verde quando focado */
    outline: none;
  }
`;

const AddButton = styled.button`
  background-color: #008cba; /* Azul */
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  
  &:hover {
    background-color: #007bb5; /* Azul mais escuro */
  }
`;

const FlavorInput: React.FC = () => {
  const [saborInput, setSaborInput] = useState<string>(''); // Define o tipo como string
  const [flavors, setFlavors] = useState<string[]>([]); // Define o tipo como string[]
  const [isVisible, setIsVisible] = useState<boolean>(false); // Define o tipo como boolean

  const handleAddSabor = () => {
    if (saborInput) {
      const updatedFlavors = [...flavors, saborInput];
      setFlavors(updatedFlavors);
      setSaborInput('');
    }
  };

  return (
    <Container>
      <ToggleButton type="button" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Ocultar Sabores' : 'Adicionar Sabores'}
      </ToggleButton>
      
      {isVisible && (
        <div>
          <Label htmlFor="sabor">Adicionar Sabor</Label>
          <Input
            type="text"
            id="flavors"
            value={saborInput}
            onChange={(e) => setSaborInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddSabor();
                e.preventDefault();
              }
            }}
            placeholder="Digite um sabor e pressione Enter"
          />
          <Label htmlFor="flavors-list">Lista de Sabores</Label>
          <Input
            type="text"
            id="flavors-list"
            value={flavors.join(', ')} // Display current flavors
            readOnly
          />
          <AddButton type="button" onClick={handleAddSabor}>Adicionar Sabor</AddButton>
        </div>
      )}
    </Container>
  );
};

export default FlavorInput;
