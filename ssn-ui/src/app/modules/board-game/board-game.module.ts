import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardGameRoutingModule } from './board-game-routing.module';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    BoardGameRoutingModule
  ]
})
export class BoardGameModule { }
