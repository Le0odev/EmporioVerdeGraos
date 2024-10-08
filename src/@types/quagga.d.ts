declare module 'quagga' {
  interface CodeResult {
    code: string;      // O código de barras detectado
    format: string;    // O formato do código de barras
  }

  interface QuaggaInitOptions {
    inputStream: {
      name: string;               // Nome do stream
      type: string;               // Tipo do stream (ex: "LiveStream")
      target: HTMLElement | string; // Elemento ou ID onde o vídeo será exibido
    };
    decoder: {
      readers: string[];          // Lista de leitores de códigos de barras
    };
  }

  interface Quagga {
    init(config: QuaggaInitOptions, callback: (err: Error | null) => void): void; // Inicializa o Quagga
    start(): void;                  // Inicia a leitura
    stop(): void;                   // Para a leitura
    onDetected(callback: (data: { codeResult: CodeResult }) => void): void; // Callback quando um código é detectado
  }

  const Quagga: Quagga; // Exporta a interface Quagga como const
  export default Quagga; // Exporta o módulo
}
