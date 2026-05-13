import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/useTaskContext';

export function CountDown() {
  // Puxamos apenas o 'state' de dentro do nosso contexto
  const { state } = useTaskContext();

  return (
    <div className={styles.container}>{state.formattedSecondsRemaining}</div>
  );
}