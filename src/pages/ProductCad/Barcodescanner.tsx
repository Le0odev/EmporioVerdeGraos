import React, { useEffect } from 'react';
import Quagga from 'quagga';

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onDetected }) => {
  useEffect(() => {
    const targetElement = document.querySelector("#interactive");
    
    if (targetElement) { // Verifica se o elemento existe
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: targetElement as HTMLElement, // Garante que não é null
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"],
        },
      }, (err) => {
        if (err) {
          console.error("Erro ao inicializar o Quagga: ", err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected((data) => {
        if (data && data.codeResult) {
          onDetected(data.codeResult.code);
          Quagga.stop(); // Para o escaneamento após a detecção
        }
      });
    }

    return () => {
      Quagga.stop(); // Cleanup ao desmontar o componente
    };
  }, [onDetected]);

  return (
    <div id="interactive" style={{ width: '250px', height: '250px' }}>
      {/* A câmera será exibida aqui */}
    </div>
  );
};

export default BarcodeScanner;
