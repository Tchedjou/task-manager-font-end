
import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']  
})

export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    id: 0,
    description: '', 
    status: 'pending', 
    dueDate: new Date(),
    priority: 'high',
  }; // tâche par défaut
  selectedTask: Task | null = null; // Tâche sélectionnée pour la mise à jour

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks(); // Charger les tâches lors de l'initialisation du composant
  }

  // Charger toutes les tâches depuis le backend
  loadTasks() {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
        console.log(this.tasks);
        
      },
      error => {
        console.error('Erreur lors du chargement des tâches', error);
      }
    );
  }

  // Ajouter une nouvelle tâche
  addTask() {
    if (this.newTask.description) {
      this.taskService.createdTask(this.newTask).subscribe(
        (createdTask: Task) => {
          this.tasks.push(createdTask);
          this.newTask.description = '';  // Réinitialiser le champ de description
        },
        error => {
          console.error('Erreur lors de la création de la tâche', error);
        }
      );
    }
  }

  // Sélectionner une tâche pour la mettre à jour
  selectTaskForUpdate(task: Task) {
    this.selectedTask = { ...task };  // Créer une copie de la tâche pour éviter des modifications non voulues
  }

  // Mettre à jour la tâche sélectionnée
  updateTask() {
    if (this.selectedTask && this.selectedTask.id) {
      this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(
        (updatedTask: Task) => {
          // Remplacer l'ancienne tâche par la nouvelle mise à jour
          const index = this.tasks.findIndex(task => task.id === this.selectedTask!.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.selectedTask = null;  // Réinitialiser la sélection après la mise à jour
        },
        error => {
          console.error('Erreur lors de la mise à jour de la tâche', error);
        }
      );
    }
  }

  // Supprimer une tâche
  deleteTask(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) { // Confirmation avant de supprimer
      this.taskService.deleteTask(id).subscribe(
        () => {
          this.tasks = this.tasks.filter(task => task.id !== id);  // Mettre à jour la liste des tâches
        },
        error => {
          console.error('Erreur lors de la suppression de la tâche', error);
        }
      );
    }
  }


}


//   // Supprimer une tâche
//   async deleteTask(id: number) {
//     await this.taskService.deleteTask(id);
//     this.tasks = this.tasks.filter(task => task.id !== id);  // Mettre à jour la liste des tâches
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { TaskDTO } from './task.dto'; // Assurez-vous d'importer le bon modèle DTO
// import { TaskService } from '../task.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-task',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ],
//   templateUrl: './task.component.html',
//   styleUrls: ['./task.component.css'] // Corriger `styleUrl` en `styleUrls`
// })
// export class TaskComponent implements OnInit{
//     tasks: TaskDTO[] = []; // Liste des tâches
//   newTask: Partial<TaskDTO> = { // Utilisation de Partial pour permettre des propriétés optionnelles
//     description: '',
//     priority: '' // Initialiser seulement les champs requis
//   };

//     selectedTask: TaskDTO | null = null;
//     // constructor(private taskService: TaskService) {}

//     ngOnInit(): void {
//       //     this.loadTasks(); // Charger les tâches lors de l'initialisation du composant
//        }

//   //        // Charger toutes les tâches depuis le backend
//   // loadTasks() {
//   //   this.taskService.getTasks().subscribe(
//   //     (data: TaskDTO[]) => {
//   //       this.tasks = data; // Mise à jour de la liste des tâches
//   //     },
//   //     error => {
//   //       console.error('Erreur lors du chargement des tâches:', error);
//   //     }
//   //   );
//   // }
// }



// // // export class TaskComponent implements OnInit {
// // //   tasks: TaskDTO[] = []; // Liste des tâches
// // //   newTask: Partial<TaskDTO> = { // Utilisation de Partial pour permettre des propriétés optionnelles
// // //     description: '',
// // //     priority: '' // Initialiser seulement les champs requis
// // //   };
// // //   selectedTask: TaskDTO | null = null;

// // //   constructor(private taskService: TaskService) {}

// // //   ngOnInit(): void {
// // //     this.loadTasks(); // Charger les tâches lors de l'initialisation du composant
// // //   }

// // //   // Charger toutes les tâches depuis le backend
// // //   loadTasks() {
// // //     this.taskService.getTasks().subscribe(
// // //       (data: TaskDTO[]) => {
// // //         this.tasks = data; // Mise à jour de la liste des tâches
// // //       },
// // //       error => {
// // //         console.error('Erreur lors du chargement des tâches:', error);
// // //       }
// // //     );
// // //   }

// // //   // Ajouter une nouvelle tâche
// // //   addTask() {
// // //     if (this.newTask.description && this.newTask.priority) { // Assurez-vous que tous les champs nécessaires sont remplis
// // //       this.taskService.createdTask(this.newTask as TaskDTO).subscribe(
// // //         (createdTask: TaskDTO) => {
// // //           this.tasks.push(createdTask);
// // //           this.newTask = { description: '', priority: '' }; // Réinitialiser newTask
// // //         },
// // //         error => {
// // //           console.error('Erreur lors de l\'ajout de la tâche:', error);
// // //         }
// // //       );
// // //     }
// // //   }

// // //   // Sélectionner une tâche pour la mise à jour
// // //   selectTaskForUpdate(task: TaskDTO) {
// // //     this.selectedTask = { ...task }; // Créer une copie de la tâche
// // //   }

// // //   // Mettre à jour la tâche sélectionnée
// // //   updateTask() {
// // //     if (this.selectedTask && this.selectedTask.id !== undefined) { // Vérifie que id est défini
// // //       this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(
// // //         (updatedTask: TaskDTO) => {
// // //           const index = this.tasks.findIndex(task => task.id === this.selectedTask!.id);
// // //           if (index !== -1) {
// // //             this.tasks[index] = updatedTask;
// // //           }
// // //           this.selectedTask = null; // Désélectionner après mise à jour
// // //         },
// // //         error => {
// // //           console.error('Erreur lors de la mise à jour de la tâche:', error);
// // //         }
// // //       );
// // //     } else {
// // //       console.error('ID de la tâche sélectionnée est indéfini.');
// // //     }
// // //   }

// // //   // Supprimer une tâche
// // //   deleteTask(id: number) {
// // //     this.taskService.deleteTask(id).subscribe(
// // //       () => {
// // //         this.tasks = this.tasks.filter(task => task.id !== id); // Mettre à jour la liste des tâches
// // //       },
// // //       error => {
// // //         console.error('Erreur lors de la suppression de la tâche:', error);
// // //       }
// // //     );
// // //   }
// // // }
