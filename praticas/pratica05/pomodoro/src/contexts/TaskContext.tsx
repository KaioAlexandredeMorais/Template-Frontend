import { createContext, useContext, useState, useEffect, useReducer, type ReactNode } from 'react';
import type { TaskStateModel } from '../models/TaskStateModel';

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};

type ActionType = {
  type: string;
  payload?: number;
};

type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
};

const initialContextValue = {
  state: initialState,
  setState: () => {},
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);

type TaskContextProviderProps = {
  children: ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState(initialState);

  const [myState, dispatch] = useReducer(
    (state: { secondsRemaining: number }, action: ActionType) => {
      switch (action.type) {
        case 'INCREMENT': {
          if (!action.payload) return state;

          return {
            ...state,
            secondsRemaining: state.secondsRemaining + action.payload,
          };
        }
        case 'DECREMENT': {
          if (!action.payload) return state;

          return {
            ...state,
            secondsRemaining: state.secondsRemaining - action.payload,
          };
        }
        case 'RESET': {
          return {
            secondsRemaining: 0,
          };
        }
        default:
          return state;
      }
    },
    { secondsRemaining: 0 }
  );

  useEffect(() => {
    console.log('ESTADO ATUALIZADO:', state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      <h1>O estado é: {JSON.stringify(myState)}</h1>

      <button onClick={() => dispatch({ type: 'INCREMENT', payload: 10 })}>
        Incrementar +10
      </button>

      <button onClick={() => dispatch({ type: 'INCREMENT', payload: 20 })}>
        Incrementar +20
      </button>

      <button onClick={() => dispatch({ type: 'DECREMENT', payload: 50 })}>
        Decrementar -50
      </button>

      <button onClick={() => dispatch({ type: 'RESET' })}>RESET</button>

      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}