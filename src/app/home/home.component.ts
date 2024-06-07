import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="wrapper">
      <img src="assets/angular.svg" width="96" />
      <h1 class="title">Angular Evaluation</h1>
      <p class="name">Heberth López</p>
      <div class="buttons">
        <a class="button button--outline min-w-30" href="color-game">
          Color Game
        </a>
        <a class="button button--outline min-w-30" href="doable"> Doable </a>
      </div>
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {}
