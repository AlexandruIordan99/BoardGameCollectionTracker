import {Component, OnInit} from '@angular/core';
import {BoardGameService} from '../../../../services/services/board-game.service';
import {Router} from '@angular/router';
import {PageResponseBoardGameResponse} from '../../../../services/models/page-response-board-game-response';
import {BoardGameResponse} from '../../../../services/models/board-game-response';

@Component({
  selector: 'app-board-game-list',
  standalone: false,
  templateUrl: './board-game-list.component.html',
  styleUrl: './board-game-list.component.scss'
})
export class BoardGameListComponent implements OnInit{

  page = 0;
  size = 5;
  BoardGameResponse: PageResponseBoardGameResponse = {};

  constructor (
    private boardGameService: BoardGameService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.findAllBoardGames();
}

  private findAllBoardGames(){
    this.boardGameService.findAllBoardGames({
      page: this.page,
      size:this.size
    }).subscribe({
      next: (boardGames): void =>{
        this.BoardGameResponse = boardGames;
      },
      error:  (err) => {
        console.error("Error grabbing board games", err)
      }
    })
}


  goToFirstPage() {
    this.page = 0;
    this.findAllBoardGames();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBoardGames();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBoardGames();
  }

  goToNextPage() {
    this.page++;
    this.findAllBoardGames();
  }

  goToLastPage() {
    this.page = this.BoardGameResponse.totalPages as number -1;
    this.findAllBoardGames();
  }

  get isLastPage(): boolean {
    return this.page==this.BoardGameResponse.totalPages as number -1;
  }

  displayBoardGameDetails(boardGame: BoardGameResponse) : void {
    this.router.navigate(['board-games', 'details',boardGame.id]);
  }
}

