import { Component, OnInit} from '@angular/core';
import {PageResponseBoardGameResponse} from '../../../../services/models/page-response-board-game-response';
import {BoardGameControllerService} from '../../../../services/services/board-game-controller.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: false,

  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{

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
    this.findAllWishlistedBoardGames();
  }

  private findAllWishlistedBoardGames(){
    this.boardGameService.findAllBoardGames({
      page: this.page,
      size:this.size,
    }).subscribe({
      next: (boardGames): void =>{
        if(boardGames.content){
          boardGames.content = boardGames.content.filter(boardGame =>
          boardGame.wishlisted === true);
        }

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
    this.findAllWishlistedBoardGames();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllWishlistedBoardGames();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllWishlistedBoardGames();
  }

  goToNextPage() {
    this.page++;
    this.findAllWishlistedBoardGames();
  }

  goToLastPage() {
    this.page = this.BoardGameResponse.totalPages as number -1;
    this.findAllWishlistedBoardGames();
  }

  get isLastPage(): boolean {
    return this.page==this.BoardGameResponse.totalPages as number -1;
  }

}
