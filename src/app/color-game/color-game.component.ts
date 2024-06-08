import { Component, OnInit } from '@angular/core';
import { getRandomColors, getStatus, rgbString } from './utils';
import { Color } from './interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-color-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wrapper">
      <h1 class="title">Color Game</h1>
      <p class="description">
        Guess which color correspond to the following RGB code
      </p>

      <div class="rgb-wrapper">{{ rgbString(colors[target]) }}</div>
      <div class="dashboard">
        <div class="number-input">
          <label for="colors"># Colors</label>
          <input
            id="colors"
            type="number"
            [value]="numOfColors"
            (change)="handleChangeNumber($event)"
            step="3"
            min="3"
            max="9"
          />
        </div>
        <p class="game-status">{{ statusMessages[status] }}</p>
        <button class="button" onClick="{handleReset}">Reset</button>
      </div>
      <div class="squares">
        @for (color of colors; track $index) {
        <button
          [ngStyle]="{
            'background-color': rgbString(color),
            opacity: '100'
          }"
          (click)="handleAttempt()"
          class="square"
        ></button>
        }
      </div>
    </div>
  `,
  styleUrl: './color-game.component.css',
})
export class ColorGameComponent {
  rgbString = rgbString;
  numOfColors = 6;
  statusMessages = {
    playing: 'The game is on!',
    win: 'You won!',
    lose: 'You lose!',
  };

  attempts: number[] = [];
  colors = getRandomColors(this.numOfColors);
  target = Math.floor(Math.random() * this.colors.length);
  status = getStatus(this.attempts, this.target, this.numOfColors);

  handleChangeNumber(event: Event) {
    // completar
  }

  handleReset() {
    //completar
  }

  handleAttempt() {
    // completar
  }
}
