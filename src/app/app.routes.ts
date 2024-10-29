

import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';

export const routes: Routes = [
    { path: '', component: AppComponent },        // Page d'accueil
    { path: 'tasks', component: TaskComponent }   // Page de gestion des tâches
];
