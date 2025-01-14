import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task.interface';
import { DateFormatedPipe } from '../../pipes/date-formated.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [ButtonComponent, DateFormatedPipe, FormsModule],
  template: `
    <form (ngSubmit)="createTask()" class="task-form">
      <input
        [(ngModel)]="newTask.title"
        id="title"
        type="text"
        name="title"
        placeholder="do the dishes"
        required=""
        aria-label="title"
      />
      <input
        [(ngModel)]="newTask.due_date"
        id="due_date"
        type="date"
        name="due_date"
        aria-label="due_date"
      />
      <app-button styleBtn="primary" className="full-w">Add task</app-button>
    </form>
    <div class="tasks-wrapper">
      <aside class="aside">
        <div class="input-group">
          <label for="sort_by">Sort by</label>
          <select (change)="sortTasks($event)" id="sort_by">
            <option value="due_date-asc">Due Date (old first)</option>
            <option value="due_date-desc">Due Date (new first)</option>
            <option value="alphabetical-asc">Alphabetical (a-z)</option>
            <option value="alphabetical-desc">Alphabetical (z-a)</option>
          </select>
        </div>
        <div class="input-group">
          <label>Filter</label>
          <div class="checkbox">
            <input [(ngModel)]="onlyPending" (change)="filterTasks()" type="checkbox" id="pending" />
            <label for="pending">Only pending</label>
          </div>
          <div class="checkbox">
            <input [(ngModel)]="onlyImportant" (change)="filterTasks()" type="checkbox" id="important" />
            <label for="important">Only important</label>
          </div>
        </div>
        <app-button styleBtn="secondary" sizeBtn="sm"
          className="full-w" (click)="logout()"
        >
          Logout
        </app-button>
      </aside>
      <div class="tasks-list">
        @for (task of tasks(); track task.id) {
        <div class="task-wrapper">
          <div class="task-data">
            <input type="checkbox" (change)="completedHandler(task)" 
              [checked]="task.completed" [id]="task.id"
            />
            <div class="title-wrapper">
              <label [for]="task.id" class="task-title">{{ task.title }}</label>
              <small class="task-due-date">{{ task.due_date | dateFormated }}</small>
            </div>
          </div>
          <div class="actions">
            <app-button
              (click)="importantHandler(task)" sizeBtn="icon"
              [styleBtn]="task.important ? 'secondary' : 'outline'"
            >
              <img src="/app/doable/assets/important-icon.svg" alt="important-icon"/>
            </app-button>
            <app-button styleBtn="outline" sizeBtn="icon" (click)="deleteTask(task.id)">
              <img src="app/doable/assets/trash-icon.svg" alt="trash-icon" />
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

  tasks = signal<Task[]>([]);
  tasksBackup: Task[] = [];
  newTask: Partial<Task> = {};
  onlyPending = false;
  onlyImportant = false;

  loadTasks() {
    this.tasksService.listTasks().subscribe({
      next: (tasksData) => {
        this.tasks.set(tasksData);
        this.tasksBackup = tasksData;
      },
      error: (e) => {
        console.error('Error loading tasks: ' + e.message);
      },
    });
  }

  sortTasks(event: Event) {
    const sortBy = (event.target as HTMLSelectElement).value;
    switch (sortBy) {
      case 'due_date-asc':
        this.tasks.update((tasks) => tasks.sort((a, b) => a.due_date.localeCompare(b.due_date)));
        break;
      case 'due_date-desc':
        this.tasks.update((tasks) => tasks.sort((a, b) => b.due_date.localeCompare(a.due_date)));
        break;
      case 'alphabetical-asc':
        this.tasks.update((tasks) => tasks.sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'alphabetical-desc':
        this.tasks.update((tasks) => tasks.sort((a, b) => b.title.localeCompare(a.title)));
        break;
      default:
        break;
    }
  }

  filterTasks() {
    let tasksFiltered = [...this.tasksBackup];
    if (this.onlyPending) {
      tasksFiltered = tasksFiltered.filter(task => !task.completed);
    }
    if (this.onlyImportant) {
      tasksFiltered = tasksFiltered.filter(task => task.important);
    }
    this.tasks.set(tasksFiltered);
  }

  createTask() {
    this.tasksService.createTask(this.newTask).subscribe({
      next: (taskCreated) => {
        if (taskCreated) {
          this.newTask = {};
          this.tasks.update((tasks) => [...tasks, taskCreated]);
          this.tasksBackup.push(taskCreated);
        }
      },
      error: (e) => {
        alert('Error creating task: ' + e.message);
      },
    });
  }

  completedHandler(task: Partial<Task>) {
    task.completed = !task.completed;
    this.tasksService.updateTask(task).subscribe({
      next: (taskUpdated) => {
        if (taskUpdated) {
          this.tasks.update((tasks) =>
            tasks.map((task) => (task.id === taskUpdated.id ? taskUpdated : task))
          );
          this.tasksBackup = this.tasksBackup.map((task) => (task.id === taskUpdated.id ? taskUpdated : task));
        }
      },
      error: (e) => {
        alert('Error updating task: ' + e.message);
      },
    });
  }

  importantHandler(task: Partial<Task>) {
    task.important = !task.important;
    this.tasksService.updateTask(task).subscribe({
      next: (taskUpdated) => {
        if (taskUpdated) {
          this.tasks.update((tasks) =>
            tasks.map((task) => (task.id === taskUpdated.id ? taskUpdated : task))
          );
          this.tasksBackup = this.tasksBackup.map((task) => (task.id === taskUpdated.id ? taskUpdated : task));
        }
      },
      error: (e) => {
        alert('Error updating task: ' + e.message);
      },
    });
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe({
      next: (res) => {
        if (res.status === 204) {
          this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
          this.tasksBackup = this.tasksBackup.filter((task) => task.id !== id);
        }
      },
      error: (e) => {
        alert('Error deleting task: ' + e.message);
      },
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  logout(): void {
    this.authService.logout();
  }
}
