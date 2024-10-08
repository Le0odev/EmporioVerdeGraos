declare module 'quagga' {
  interface CodeResult {
    code: string;
    format: string;
  }

  interface QuaggaInitOptions {
    inputStream: {
      name: string;
      type: string;
      target: HTMLElement | string;
    };
    decoder: {
      readers: string[];
    };
  }

  interface Quagga {
    init(config: QuaggaInitOptions, callback: (err: Error | null) => void): void;
    start(): void;
    stop(): void;
    onDetected(callback: (data: { codeResult: CodeResult }) => void): void;
  }

  const Quagga: Quagga;
  export default Quagga;
}
