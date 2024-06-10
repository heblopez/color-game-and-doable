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
          (click)="onClickTab($event)" id="login-tab">
          Login
        </button>
        <button [class]="tabActive === 'Signup' ? 'active' : ''"
          (click)="onClickTab($event)" id="signup-tab">
          Signup
        </button>
      </div>
      <form (ngSubmit)="submit()" class="form">
        <div>
          <label for="email">Email</label>
          <input [(ngModel)]="credentials.email" id="email" type="email" name="email" placeholder="user@example.com" required="">
        </div>
        <div>
          <label for="password">Password</label>
          <input [(ngModel)]="credentials.password" type="password" id="password" name="password" required="" minlength="6">
        </div>
        <app-button styleBtn="primary" className="full-w">{{ textButton() }}</app-button>
      </form>
      <p class="error-message">{{ error() }}</p>
    </div>
  `,
  styleUrl: './unauthenticated.component.css'
})
export class UnauthenticatedComponent {
  tabActive: 'Login' | 'Signup' = 'Login';
  textButton = signal<'Enter' | 'Create' | 'Loading...'>('Enter');
  credentials = { email: '', password: '' };
  error = signal<string>('');
  private authService = inject(AuthService);

  submit(): void {
    if (this.tabActive === 'Login') {
      this.login();
    } else {
      this.signup();
    }
  }
  
  onClickTab(event: MouseEvent): void {
    const tab = event.target as HTMLButtonElement;
    this.tabActive = tab.id === 'login-tab' ? 'Login' : 'Signup';
    this.textButton.set(this.tabActive === 'Login' ? 'Enter' : 'Create');
  }

  login(): void {
    this.textButton.set('Loading...');
    this.authService.login(this.credentials).subscribe({
      error: (errors) => {
        this.textButton.set('Enter');
        this.error.set(errors.join('. '));
      }
    });
  }

  signup(): void {
    this.textButton.set('Loading...');
    this.authService.signup(this.credentials).subscribe({
      error: (errors) => {
        this.textButton.set('Create');
        this.error.set(errors.join(', '));
      }
    });
  }
}
