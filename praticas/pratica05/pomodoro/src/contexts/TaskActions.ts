import type { TaskModel } from '../models/TaskModel';

export const TaskActionTypes = {
  START_TASK: 'START_TASK',
  INTERRUPT_TASK: 'INTERRUPT_TASK',
  RESET_STATE: 'RESET_STATE',
} as const;

type TaskActionsWithPayload =
  | {
      type: typeof TaskActionTypes.START_TASK;
      payload: TaskModel;
    }
  | {
      type: typeof TaskActionTypes.INTERRUPT_TASK;
      payload: TaskModel;
    };

type TaskActionsWithoutPayload = {
  type: typeof TaskActionTypes.RESET_STATE;
};

export type TaskActionModel =
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload;