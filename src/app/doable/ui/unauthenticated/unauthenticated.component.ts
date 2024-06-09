import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-unauthenticated',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="wrapper">
      <div class="tabs">
        <button [class]="tabActive === 'Login' ? 'active' : ''"
          (click)="tabActive = 'Login'">
          Login
        </button>
        <button [class]="tabActive === 'Signup' ? 'active' : ''"
          (click)="tabActive = 'Signup'">
          Signup
        </button>
      </div>
      <form action="" class="form">
        <div>
          <label for="email">Email</label>
          <input id="email" type="text" name="email" placeholder="user@example.com" required="">
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required="" minlength="6">
        </div>
        <app-button styleBtn="primary" className="full-w">{{ tabActive === 'Login' ? 'Enter' : 'Create'}}</app-button>
      </form>
    </div>
  `,
  styleUrl: './unauthenticated.component.css'
})
export class UnauthenticatedComponent {
  tabActive: 'Login' | 'Signup' = 'Login';
}
