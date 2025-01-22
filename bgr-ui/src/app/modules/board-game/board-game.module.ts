import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardGameRoutingModule } from './board-game-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { BoardGameCardComponent } from './components/board-game-card/board-game-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { MyBoardGamesComponent } from './pages/my-board-games/my-board-games.component';
import { ManageBoardGamesComponent } from './pages/manage-board-games/manage-board-games.component';
import {BoardGameListComponent} from './pages/board-game-list/board-game-list.component';
import {MainComponent} from './pages/main/main.component';
import {FormsModule} from '@angular/forms';
import { BoardGameDetailsComponent } from './pages/board-game-details/board-game-details.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    BoardGameListComponent,
    BoardGameCardComponent,
    MyBoardGamesComponent,
    RatingComponent,
    ManageBoardGamesComponent,
    BoardGameDetailsComponent
  ],
  exports: [
    MenuComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    BoardGameRoutingModule,
    FormsModule,
  ]
})
export class BoardGameModule {}

