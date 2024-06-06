import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="wrapper">
      <img src="assets/angular.svg" width="96" />
      <h1 class="title">React Evaluation</h1>
      <p class="name">Nombre Apellido</p>
      <div class="buttons">
        <a href="color-game"> Color Game </a>
        <a href="doable"> Doable </a>
      </div>
    </div>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {}
