import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from '../../pages/main/main.component';
import {BoardGameModule} from './board-game.module';
import {BoardGameListComponent} from '../../pages/board-game-list/board-game-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: 'board-game',
        component: BoardGameListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardGameRoutingModule { }
