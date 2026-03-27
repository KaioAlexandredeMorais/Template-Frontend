// src/App.tsx
import { Heading } from './components/Heading';
import { Timer } from 'lucide-react'; // Importando o ícone

export function App() {
  return (
    <Heading>
      Histórico
      <button>
        <Timer /> {/* Renderizando o ícone dentro do botão */}
      </button>
    </Heading>
  );
}