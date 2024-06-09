import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <form class="task-form">
      <input id="title" type="text" name="title" placeholder="do the dishes" required="" aria-label="title">
      <input id="due_date" type="date" name="due_date" aria-label="due_date">
      <app-button styleBtn="primary" className="full-w">Add task</app-button>
    </form>
    <div class="tasks-wrapper">
      <aside class="aside">
        <div class="input-group">
          <label for="sort_by">Sort by</label>
          <select id="sort_by">
            <option value="due_date-asc">Due Date (old first)</option>
            <option value="due_date-desc">Due Date (new first)</option>
            <option value="alphabetical-asc">Alphabetical (a-z)</option>
            <option value="alphabetical-desc">Alphabetical (z-a)</option>
          </select>
        </div>
        <div class="input-group">
          <label>Filter</label>
          <div class="checkbox">
            <input type="checkbox" id="pending">
            <label for="pending">Only pending</label>
          </div>
          <div class="checkbox">
            <input type="checkbox" id="important">
            <label for="important">Only important</label>
          </div>
        </div>
        <app-button styleBtn="secondary" sizeBtn="sm"
          className="full-w" (click)="logout()">
          Logout
        </app-button>
      </aside>
      <div class="tasks-list">
        @for (task of tasks; track task.id) {
          <div class="task-wrapper">
            <div class="task-data">
              <input type="checkbox" [id]="task.id">
              <div class="title-wrapper">
                <label [for]="task.id" class="task-title">{{ task.title }}</label>
                <small class="task-due-date">{{ task.due_date}}</small>
              </div>
            </div>
            <div class="actions">
              <app-button styleBtn="outline" sizeBtn="icon">
                <img src="/app/doable/assets/important-icon.svg" alt="important-icon">
              </app-button>
              <app-button styleBtn="outline" sizeBtn="icon">
                <img src="app/doable/assets/trash-icon.svg" alt="trash-icon">
              </app-button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './authenticated.component.css',
})
export class AuthenticatedComponent implements OnInit {
  private authService = inject(AuthService);
  private tasksService = inject(TasksService);

  tasks: Task[] = [];
  newTask: Partial<Task> = {};

  loadTasks() {
    this.tasksService.listTasks().subscribe(tasksData => {
      this.tasks = tasksData;
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  logout(): void {
    this.authService.logout();
  }
}
