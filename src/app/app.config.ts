import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient,  provideHttpClient } from '@angular/common/http';  // Import de HttpClientModule
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    HttpClient,
    provideHttpClient(),  // Ajout de HttpClientModule ici
  ]
};


// import { ApplicationConfig, importProvidersFrom } from '@angular/core';
// import { provideRouter, Route } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';

// import { TaskComponent } from './task/task.component';
// import { AppComponent } from './app.component';


// // Configuration des routes
// const appRoutes: Route[] = [
//   { path: '', component: AppComponent },        // Page d'accueil
//   { path: 'tasks', component: TaskComponent }   // Page de gestion des tâches
// ];

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideRouter(appRoutes),                  // Fournit les routes pour l'application
//     importProvidersFrom(BrowserModule),        // Nécessaire pour l'application Angular dans le navigateur
//     importProvidersFrom(FormsModule),          // Nécessaire pour utiliser les formulaires
//   ],
// };
