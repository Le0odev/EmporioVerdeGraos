import { useState } from "react";
import axios from "axios";
import { MessageCircle, Send } from 'lucide-react';
import { 
  ChatContainer, 
  InputField, 
  SendButton, 
  ChatBox, 
  Message, 
  Header,
  InputContainer 
} from "./ChatSyled"
import ProductCards from "./ProductCard";

const Chat = () => {
  const [pergunta, setPergunta] = useState("");
  const [mensagens, setMensagens] = useState<{ texto: string; isUser: boolean }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [produtosRelacionados, setProdutosRelacionados] = useState([]);


  const enviarPergunta = async () => {
    if (!pergunta.trim()) return;

    setMensagens([...mensagens, { texto: pergunta, isUser: true }]);
    setIsLoading(true);

    try {
      const resposta = await axios.get(`http://localhost:8000/chat`, {
        params: { 
          question: pergunta
        },
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (resposta.data) {
        setMensagens(prevMensagens => [
          ...prevMensagens,
          { texto: resposta.data.resposta, isUser: false }
        ]);

        // Atualiza os produtos relacionados
        if (resposta.data.produtos_relacionados?.length > 0) {
          setProdutosRelacionados(resposta.data.produtos_relacionados);
        }
      }
    } catch (error: any) {
      console.error("Erro ao buscar resposta:", error);
      
      const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.message || 
                         "Erro ao obter resposta. Tente novamente!";
      
      setMensagens(prevMensagens => [
        ...prevMensagens,
        { texto: errorMessage, isUser: false }
      ]);
    } finally {
      setIsLoading(false);
      setPergunta("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarPergunta();
    }
  };

  return (
    <ChatContainer>
      <Header>
        <MessageCircle />
        Assistente
      </Header>
      <ChatBox>
        {mensagens.map((msg, index) => (
          <Message key={index} isUser={msg.isUser}>
            {msg.texto}
          </Message>
        ))}
        {isLoading && (
          <Message isUser={false}>
            Digitando...
          </Message>
        )}
        {produtosRelacionados.length > 0 && (
          <ProductCards produtos={produtosRelacionados} />
        )}
      </ChatBox>
      <InputContainer>
        <InputField
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua pergunta..."
          disabled={isLoading}
        />
        <SendButton onClick={enviarPergunta} disabled={isLoading}>
          <Send />
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default Chat;