import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {MyBoardGamesComponent} from './pages/my-board-games/my-board-games.component';
import {BoardGameDetailsComponent} from './pages/board-game-details/board-game-details.component';
import {BoardGameListComponent} from './pages/board-game-list/board-game-list.component';
import {WishlistComponent} from './pages/wishlist/wishlist.component';

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
        path: 'my-collection',
        component: MyBoardGamesComponent,
      },
      {
        path: 'my-wishlist',
        component: WishlistComponent
      },
      {
        path: 'details/:boardGameId',
        component: BoardGameDetailsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardGameRoutingModule { }
