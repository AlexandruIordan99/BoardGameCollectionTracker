import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';
import {BoardGameListComponent} from './modules/board-game/pages/board-game-list/board-game-list.component';

const routes: Routes = [
  {
    path: 'board-games',
    component:BoardGameListComponent
  },
  {
    path: 'login',
    component: LoginComponent,

  },

  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'board-games',
    loadChildren: () =>
      import('C:\\Users\\Jordan\\Projects\\BoardGameReviewWebsite\\bgr-ui\\src\\app\\modules\\board-game\\board-game.module')
        .then(m => m.BoardGameModule)
  } //board-games routing may or may not be somewhat bugged. Time spent on routing: 8 hours

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
