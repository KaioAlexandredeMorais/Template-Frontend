import { PlayCircleIcon } from 'lucide-react';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { DefaultInput } from '../DefaultInput';
import { useTaskContext } from '../contexts/useTaskContext';

export function MainForm() {
  const { setState } = useTaskContext();

  // 1. Criamos a função Handler para o formulário
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    // 2. Previne o comportamento padrão (recarregar a página)
    event.preventDefault();

    // 3. Log de teste para confirmar que funcionou
    console.log('DEU CERTO');
  }

  // Apenas removi a função handleClick do botão de teste da aula passada,
  // pois já limpamos isso no passo anterior.

  return (
    // 4. Conectamos a nossa função ao evento onSubmit do form
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Digite algo'
        />
      </div>

      <div className='formRow'>
        <p>Próximo intervalo é de 25min</p>
      </div>

      <div className='formRow'>
        <Cycles />
      </div>

      <div className='formRow'>
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}