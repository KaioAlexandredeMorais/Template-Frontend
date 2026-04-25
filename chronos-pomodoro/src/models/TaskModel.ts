export interface TaskModel {
  id: string;
  name: string;
  startDate: Date;
  completeDate: Date | null; // Verifique se o nome aqui é igual ao que você usa no MainForm
  interruptDate: Date | null;
  duration: number;
  type: string;
}