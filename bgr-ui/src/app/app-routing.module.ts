import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';
import {authGuard} from './services/guard/auth.guard';

//Time spent on routing and menu html display 13 hours 19:11 22.01.2025
//To do routing you need to properly render the app outlet and app menu components in main.html
//You also need an HttpProvider

const routes: Routes = [
  {
    path: '',
    redirectTo: 'boardgames',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
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
    path: 'boardgames',
    loadChildren: () => import('./modules/board-game/board-game.module')
      .then(m => m.BoardGameModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
