import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {BoardGameListComponent} from './pages/board-game-list/board-game-list.component';
import {MyBoardGamesComponent} from './pages/my-board-games/my-board-games.component';
import {ManageBoardGamesComponent} from './pages/manage-board-games/manage-board-games.component';
import {authGuard} from '../../services/guard/auth.guard';
import {BoardGameDetailsComponent} from './pages/board-game-details/board-game-details.component';
import {MenuComponent} from './components/menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: BoardGameListComponent,
      },
      {
        path: 'my-boardgames',
        component: MyBoardGamesComponent,
      },
      {
        path: 'details/:bookId',
        component: BoardGameDetailsComponent,
      },
      {
        path: 'manage',
        component: ManageBoardGamesComponent,
      },
      {
        path: 'manage/:bookId',
        component: ManageBoardGamesComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardGameRoutingModule { }
