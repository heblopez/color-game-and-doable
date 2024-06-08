import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="wrapper">
      <img src="assets/angular.svg" width="96" />
      <h1 class="title">Angular Evaluation</h1>
      <p class="name">Heberth López</p>
      <div class="buttons">
        <a class="button button--outline min-w-30" routerLink="color-game">
          Color Game
        </a>
        <a class="button button--outline min-w-30" routerLink="doable"> Doable </a>
      </div>
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {}
