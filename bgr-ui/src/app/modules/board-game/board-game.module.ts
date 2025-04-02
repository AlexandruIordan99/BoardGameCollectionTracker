import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardGameRoutingModule } from './board-game-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { BoardGameCardComponent } from './components/board-game-card/board-game-card.component';
import { RatingComponent } from './components/rating/rating.component';
import { MyBoardGamesComponent } from './pages/my-board-games/my-board-games.component';
import { ManageBoardGamesComponent } from './pages/manage-board-games/manage-board-games.component';
import {MainComponent} from './pages/main/main.component';
import {FormsModule} from '@angular/forms';
import { BoardGameDetailsComponent } from './pages/board-game-details/board-game-details.component';
import {BoardGameListComponent} from './pages/board-game-list/board-game-list.component';
import {RouterModule} from '@angular/router';
import {HttpClient, provideHttpClient} from '@angular/common/http';


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
  imports: [
    CommonModule,
    BoardGameRoutingModule,
    FormsModule],
  exports:[BoardGameCardComponent],
  providers:[HttpClient]
})
export class BoardGameModule {}

