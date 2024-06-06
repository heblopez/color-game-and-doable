import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ColorGameComponent } from './color-game/color-game.component';
import { DoableComponent } from './doable/doable.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'color-game',
    component: ColorGameComponent,
  },
  {
    path: 'doable',
    component: DoableComponent,
  },
];
