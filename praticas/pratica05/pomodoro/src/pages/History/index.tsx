import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import styles from './styles.module.css';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { sortTasks, type SortTasksOptions } from '../../utils/sortTasks';
import { useEffect, useState } from 'react';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { showMessage } from '../../adapters/showMessage';
import type { TaskModel } from '../../models/TaskModel';

const API_URL = 'http://localhost:3333';

export function History() {
  const { state, dispatch } = useTaskContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);

  const [sortTasksOptions, setSortTaskOptions] = useState<SortTasksOptions>({
    tasks: [],
    field: 'startDate',
    direction: 'desc',
  });

  // Busca tasks da API
  function loadTasks() {
    setIsLoading(true);
    fetch(`${API_URL}/tasks`)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar histórico');
        return res.json();
      })
      .then(data => {
        const tasks: TaskModel[] = data.map((t: any) => ({
          ...t,
          startDate: Number(t.startDate),
          completeDate: t.completeDate ? Number(t.completeDate) : null,
          interruptDate: t.interruptDate ? Number(t.interruptDate) : null,
        }));
        setSortTaskOptions({
          tasks: sortTasks({ tasks }),
          field: 'startDate',
          direction: 'desc',
        });
      })
      .catch(() => {
        showMessage.error('Não foi possível carregar o histórico da API');
        // Fallback para tasks locais
        setSortTaskOptions({
          tasks: sortTasks({ tasks: state.tasks }),
          field: 'startDate',
          direction: 'desc',
        });
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  }, []);

  useEffect(() => {
    return () => { showMessage.dismiss(); };
  }, []);

  function handleSortTasks({ field }: Pick<SortTasksOptions, 'field'>) {
    const newDirection = sortTasksOptions.direction === 'desc' ? 'asc' : 'desc';
    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTasksOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  async function handleResetHistory() {
    showMessage.dismiss();
    showMessage.confirm('Tem certeza?', async confirmation => {
      if (!confirmation) return;

      setIsClearing(true);
      try {
        // Deleta no banco via API
        const response = await fetch(`${API_URL}/tasks`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Erro ao limpar histórico');

        // Limpa o estado local também
        dispatch({ type: TaskActionTypes.RESET_STATE });

        // Atualiza a lista
        setSortTaskOptions(prev => ({ ...prev, tasks: [] }));

        showMessage.success('Histórico limpo com sucesso!');
      } catch {
        showMessage.error('Erro ao limpar histórico. Tente novamente.');
      } finally {
        setIsClearing(false);
      }
    });
  }

  const hasTasks = sortTasksOptions.tasks.length > 0;

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color='red'
                aria-label='Apagar todo o histórico'
                title={isClearing ? 'Limpando...' : 'Apagar histórico'}
                onClick={handleResetHistory}
                disabled={isClearing}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {isLoading && (
          <p style={{ textAlign: 'center' }}>Carregando histórico...</p>
        )}

        {!isLoading && hasTasks && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSortTasks({ field: 'name' })} className={styles.thSort}>Tarefa ↕</th>
                  <th onClick={() => handleSortTasks({ field: 'duration' })} className={styles.thSort}>Duração ↕</th>
                  <th onClick={() => handleSortTasks({ field: 'startDate' })} className={styles.thSort}>Data ↕</th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTasksOptions.tasks.map(task => {
                  const taskTypeDictionary = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo',
                  };
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.duration}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskTypeDictionary[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3].map(i => (
              <div
                key={i}
                style={{
                  height: '4rem',
                  borderRadius: '0.8rem',
                  backgroundColor: 'var(--gray-700)',
                  opacity: 1 - i * 0.2,
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              />
            ))}
          </div>
        )}
      </Container>
    </MainTemplate>
  );
}