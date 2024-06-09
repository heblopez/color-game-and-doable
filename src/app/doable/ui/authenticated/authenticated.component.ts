import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth.service';

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
        <!-- Aquí empieza el @for -->
        <div class="task-wrapper">
          <div class="task-data">
            <input type="checkbox" name="" id="task_id">
            <div class="title-wrapper">
              <label for="task_id" class="task-title">Note 1</label>
              <small class="task-due-date">Saturday, June 8</small>
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
        <!-- Aquí finaliza el @for -->
      </div>
    </div>
  `,
  styleUrl: './authenticated.component.css',
})
export class AuthenticatedComponent {
  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
