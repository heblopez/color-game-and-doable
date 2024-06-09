import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unauthenticated',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
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
      <form (submit)="submit()" class="form">
        <div>
          <label for="email">Email</label>
          <input [(ngModel)]="email" id="email" type="text" name="email" placeholder="user@example.com" required="">
        </div>
        <div>
          <label for="password">Password</label>
          <input [(ngModel)]="password" type="password" id="password" name="password" required="" minlength="6">
        </div>
        <app-button styleBtn="primary" className="full-w">{{ tabActive === 'Login' ? 'Enter' : 'Create'}}</app-button>
      </form>
      <p class="error-message">{{ error() }}</p>
    </div>
  `,
  styleUrl: './unauthenticated.component.css'
})
export class UnauthenticatedComponent {
  tabActive: 'Login' | 'Signup' = 'Login';
  email = '';
  password = '';
  error = signal<string>('');
  private authService = inject(AuthService);

  submit(): void {
    if (this.tabActive === 'Login') {
      this.login();
    } else {
      this.signup();
    }
  }
  
  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        if (!success) {
          this.error.set('Incorrect email or password');
        }
      }
    });
  }

  signup(): void {
    this.authService.signup(this.email, this.password).subscribe({
      next: (success) => {
        if (!success) {
          this.error.set('Email has already been taken or is invalid');
        }
      }
    });
  }
}
