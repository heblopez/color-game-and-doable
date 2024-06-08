import { Component, computed, effect, OnInit, signal } from '@angular/core';
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

      <div class="rgb-wrapper">
        @for(color of targetColor(); track $index) {
        <div
          class="rgb"
          [style.border-color]="
            $index === 0 ? 'red' : $index === 1 ? 'green' : 'blue'
          "
        >
          <p class="color-number">{{ color }}</p>
          <p class="color-name">
            {{ $index === 0 ? 'red' : $index === 1 ? 'green' : 'blue' }}
          </p>
        </div>
        }
      </div>
      <div class="dashboard">
        <div class="number-input">
          <label for="colors"># Colors</label>
          <input
            id="colors"
            type="number"
            [value]="numOfColors()"
            (change)="handleChangeNumber($event)"
            step="3"
            min="3"
            max="9"
          />
        </div>
        <p class="game-status">{{ statusMessages[status()] }}</p>
        <button class="button" (click)="handleReset()">Reset</button>
      </div>
      <div class="squares">
        @for (color of colors(); track $index) {
        <button
          [ngStyle]="{
            'background-color': rgbString(color),
            opacity: '1'
          }"
          (click)="handleAttempt($event, $index)"
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
  statusMessages = {
    playing: 'The game is on!',
    win: 'You won!',
    lose: 'You lose!',
  };
  numOfColors = signal<number>(6);
  colors = signal<Color[]>(getRandomColors(this.numOfColors()));
  attempts = signal<number[]>([]);
  targetIndex = signal<number>(Math.floor(Math.random() * this.colors().length));
  targetColor = computed(() => this.colors()[this.targetIndex()]);
  status = computed(() =>
    getStatus(this.attempts(), this.targetIndex(), this.numOfColors())
  );

  constructor() {
    effect(() => {
      if (this.status() === 'win' || this.status() === 'lose') {
        this.resetOpacity();
        this.resetColor();
      }
    })
  }

  handleChangeNumber(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.numOfColors.set(value);
    this.handleReset();
  }

  handleReset() {
    this.colors.set(getRandomColors(this.numOfColors()));
    this.targetIndex.set(Math.floor(Math.random() * this.colors().length));
    this.attempts.set([]);
    console.log(this.targetColor(), this.targetIndex());
    this.resetOpacity();
  }

  handleAttempt(event: MouseEvent, index: number) {
    if (this.status() !== 'playing') return;
    const square = event.target as HTMLButtonElement;
    square.style.opacity = '0';
    this.attempts.update((attempts) => [...attempts, index]);
    console.log(this.attempts(), this.status());
  }

  resetOpacity() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      (square as HTMLButtonElement).style.opacity = '1';
    });
  }

  resetColor() {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      (square as HTMLButtonElement).style.backgroundColor = rgbString(this.targetColor());
    });
  }
}
