import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {BoardGameListComponent} from './pages/board-game-list/board-game-list.component';
import {MyBoardGamesComponent} from './pages/my-board-games/my-board-games.component';
import {ManageBoardGamesComponent} from './pages/manage-board-games/manage-board-games.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: '',
        component: BoardGameListComponent,

      },
      {
        path:'my-boardgames',
        component: MyBoardGamesComponent,

      },
      {
        path: 'manage',
        component: ManageBoardGamesComponent,

      },
      {
        path: 'manage/:boardGameId',
        component: ManageBoardGamesComponent,

      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardGameRoutingModule { }
