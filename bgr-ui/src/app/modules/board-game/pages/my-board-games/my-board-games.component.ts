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
  showDescriptionModal: boolean = false;
  editingBoardGame: BoardGameResponse | null = null;
  tempDescription: string = '';

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

  openDescriptionModal(boardGame: BoardGameResponse) {
    this.editingBoardGame = boardGame;
    this.tempDescription = boardGame.description || '';
    this.showDescriptionModal = true;
  }

  closeDescriptionModal() {
    this.showDescriptionModal = false;
    this.editingBoardGame = null;
    this.tempDescription = '';
  }

  saveDescriptionChanges() {
    if (!this.tempDescription.trim()) {
      alert('Description cannot be empty');
      return;
    }

    if (!this.editingBoardGame) return;

    this.boardGameService.updateBoardGameDescription({
      'boardgame-id': this.editingBoardGame.id as number,
      body: this.tempDescription
    }).subscribe({
      next: () => {
        // Update the local board game object
        if (this.editingBoardGame) {
          this.editingBoardGame.description = this.tempDescription;
        }
        this.closeDescriptionModal();
        console.log('Description updated successfully');
      },
      error: (err) => {
        console.error('Error updating description:', err);
        alert('Failed to update description. Please try again.');
      }
    });
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
}
