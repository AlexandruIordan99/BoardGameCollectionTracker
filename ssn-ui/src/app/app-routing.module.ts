import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';
import {authGuard} from './services/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'board-games',
    pathMatch: 'full'
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
    loadChildren: () => import('./modules/board-game/board-game.module')
      .then(m => m.BoardGameModule),
    canActivate: [authGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
