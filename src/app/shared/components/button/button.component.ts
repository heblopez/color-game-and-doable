import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: `
    <button [className]="getStyleClass() + ' ' + getSizeClass() + ' ' + className()">
      <ng-content/>
    </button>
  `,
  styleUrl: './button.component.css'
})

export class ButtonComponent {
  styleBtn = input.required<'primary' | 'secondary' | 'outline'>();
  sizeBtn = input<'sm' | 'lg' | 'icon'>();
  className = input<string>();

  getStyleClass(): string {
    const styleClasses = {
      primary: 'button',
      secondary: 'button button--secondary',
      outline: 'button button--outline',
    };

    return styleClasses[this.styleBtn()];
  }
  
  getSizeClass() {
    const sizeClasses = {
      sm: 'button--sm',
      lg: 'button--lg',
      icon: 'button--icon',
    };

    return sizeClasses[this.sizeBtn() as keyof typeof sizeClasses] || '';
  }
}
