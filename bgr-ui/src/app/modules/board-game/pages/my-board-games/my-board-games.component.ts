import { Component } from '@angular/core';
import {PageResponseBoardGameResponse} from '../../../../services/models/page-response-board-game-response';
import {BoardGameControllerService} from '../../../../services/services/board-game-controller.service';
import {Router} from '@angular/router';
import {BoardGameResponse} from '../../../../services/models/board-game-response';

@Component({
  selector: 'app-my-board-games',
  standalone: false,

  templateUrl: './my-board-games.component.html',
  styleUrl: './my-board-games.component.scss'
})
export class MyBoardGamesComponent {

  page = 0;
  size = 5;
  pages: any=[]
  BoardGameResponse: PageResponseBoardGameResponse = {};

  constructor (
    private boardGameService: BoardGameControllerService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.findAllBoardGamesByOwner();
  }


private findAllBoardGamesByOwner(){
    this.boardGameService.findAllBoardGamesByOwner({
      page: this.page,
      size:this.size
    }).subscribe({
      next: (boardGames): void =>{
        this.BoardGameResponse = boardGames;

        if (this.BoardGameResponse.content) {
          this.BoardGameResponse.content = this.BoardGameResponse.content.filter(
            boardGame => !boardGame.archived);
        }  ///hides archived games


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
    this.findAllBoardGamesByOwner();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBoardGamesByOwner();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBoardGamesByOwner();
  }

  goToNextPage() {
    this.page++;
    this.findAllBoardGamesByOwner();
  }

  goToLastPage() {
    this.page = this.BoardGameResponse.totalPages as number -1;
    this.findAllBoardGamesByOwner();
  }

  get isLastPage(): boolean {
    return this.page==this.BoardGameResponse.totalPages as number -1;
  }

  archiveBoardGame(boardGame: BoardGameResponse) {
     this.boardGameService.updateArchivedStatus({
       'boardgame-id': boardGame.id as number
     }).subscribe({
       next:() =>{
         boardGame.archived = !boardGame.archived;
       }
     });
  }

  editBoardGame(boardGame: BoardGameResponse) {
    this.router.navigate(['boardgames', 'manage', boardGame.id])
  }

  shareBoardGame(boardGame: BoardGameResponse) {
    this.boardGameService.updateShareableStatus({
      'boardgame-id': boardGame.id as number
    }).subscribe({
      next:() =>{
        boardGame.shareable = !boardGame.shareable;
      }
    })
  }

  deleteBoardGame(boardGame: BoardGameResponse){
    this.boardGameService.deleteBoardGame({
      'boardgame-id': boardGame.id as number
    }).subscribe({
      next: () =>{
        if (this.BoardGameResponse.content){
          this.BoardGameResponse.content = this.BoardGameResponse.content.filter(
            boardGame =>boardGame.id! ==boardGame.id
          )
        }
        if (this.BoardGameResponse.content?.length === 0 && this.page > 0) {
          this.page--;
          this.findAllBoardGamesByOwner();
        } else if (this.BoardGameResponse.content?.length === 0 && this.page === 0) {
          this.findAllBoardGamesByOwner();
        }
      },
      error: (err: any) =>{
        console.error("Error deleting board game", err);
        alert("Failed to delete board game. Please try again.")
    }
    })

  }


}
