import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../shared/components/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <div class="wrapper">
      <img src="assets/angular.svg" width="96" />
      <h1 class="title">Angular Evaluation</h1>
      <p class="name">Heberth López</p>
      <div class="buttons">
        <app-button styleBtn="outline" className="min-w-30" routerLink="color-game">Color Game</app-button>
        <app-button styleBtn="outline" className="min-w-30" routerLink="doable">Doable</app-button>
      </div>
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {}
