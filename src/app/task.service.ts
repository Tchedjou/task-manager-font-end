import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8080/api/tasks'; // URL de l'API
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}  // Injection de HttpClient

  // Méthode pour obtenir toutes les tâches
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  // Méthode pour créer une nouvelle tâche
  createdTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, this.httpOptions);
  }

  // Méthode pour obtenir une tâche par son ID
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  // Méthode pour mettre à jour une tâche existante
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task, this.httpOptions);
  }

  // Méthode pour supprimer une tâche
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

}



  // import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { TaskDTO } from './task/task.dto'; // Assurez-vous que ce fichier existe et contient la définition de TaskDTO

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {
//   private baseUrl = 'http://localhost:8080/api/tasks'; // URL de l'API

//   constructor(private http: HttpClient) {}

//   // Méthode pour obtenir toutes les tâches
//   getTasks(): Observable<TaskDTO[]> {
//     return this.http.get<TaskDTO[]>(this.baseUrl).pipe(
//       catchError(this.handleError) // Gestion des erreurs
//     );
//   }

//   // Méthode pour créer une nouvelle tâche
//   createdTask(task: TaskDTO): Observable<TaskDTO> {
//     return this.http.post<TaskDTO>(this.baseUrl, task).pipe(
//       catchError(this.handleError) // Gestion des erreurs
//     );
//   }

//   // Méthode pour obtenir une tâche par son ID
//   getTaskById(id: number): Observable<TaskDTO> {
//     return this.http.get<TaskDTO>(`${this.baseUrl}/${id}`).pipe(
//       catchError(this.handleError) // Gestion des erreurs
//     );
//   }

//   // Méthode pour mettre à jour une tâche déjà existante
//   updateTask(id: number, task: TaskDTO): Observable<TaskDTO> {
//     return this.http.put<TaskDTO>(`${this.baseUrl}/${id}`, task).pipe(
//       catchError(this.handleError) // Gestion des erreurs
//     );
//   }

//   // Méthode pour supprimer une tâche
//   deleteTask(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
//       catchError(this.handleError) // Gestion des erreurs
//     );
//   }

//   // Gestion des erreurs
//   private handleError(error: HttpErrorResponse) {
//     // Ici, vous pouvez gérer les erreurs selon vos besoins
//     let errorMessage = 'Une erreur est survenue';
//     if (error.error instanceof ErrorEvent) {
//       // Erreur côté client
//       errorMessage = `Erreur: ${error.error.message}`;
//     } else {
//       // Erreur côté serveur
//       errorMessage = `Erreur ${error.status}: ${error.message}`;
//     }
//     return throwError(errorMessage);
//   }
// }
