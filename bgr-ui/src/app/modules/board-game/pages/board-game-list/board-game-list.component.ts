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
  BoardGameResponse: PageResponseBoardGameResponse = {};
  page = 0;
  size = 5;
  pages: any=[];


  constructor (
    private boardGameService: BoardGameService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    console.log('BoardGameListComponent initialized');
    this.findAllBoardGames();
}

  private findAllBoardGames(){
    this.boardGameService.findAllBoardGames({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (boardGames): void =>{
        console.log('API Response:', boardGames);
        this.BoardGameResponse = boardGames;
        this.pages = Array(this.BoardGameResponse.totalPages)
          .fill(0)
          .map((x, i) => i);
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
    if (this.page === 0){
      return;
    }
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

  get isLastPage(): boolean {//need more testing to see whether this gets capped or not
    return this.page === this.BoardGameResponse.totalPages as number -1;
  }
  get isFirstPage(): boolean {
    return this.page === 0;
  }

  displayBoardGameDetails(boardGame: BoardGameResponse) {
    this.router.navigate(['boardgames', 'details', boardGame.id]);
  }
}

