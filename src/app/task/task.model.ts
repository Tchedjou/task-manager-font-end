export interface Task {
  id: number;            // L'ID est optionnel lors de la création d'une nouvelle tâche
  description: string;    // Description de la tâche
  status: string;         // Statut de la tâche (pending, completed)
  dueDate: Date;       // Date d'échéance de la tâche (format ISO)
  priority: string;      // Priorité de la tâche
}
