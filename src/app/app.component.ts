import { Component } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-manager-frontend';
}





// import { Component } from '@angular/core';
// import { Router, RouterOutlet } from '@angular/router';
// import { TaskComponent } from "./task/task.component";

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, TaskComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'task-manager-frontend';

//   constructor(private router: Router) {}

  
// }
