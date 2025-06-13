import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BoardGameResponse} from '../../../../services/models/board-game-response';
import {PageResponseReviewResponse} from '../../../../services/models/page-response-review-response';
import {BoardGameControllerService} from '../../../../services/services/board-game-controller.service';
import {ReviewsService} from '../../../../services/services/reviews.service';

@Component({
  selector: 'app-board-game-details',
  standalone: false,

  templateUrl: './board-game-details.component.html',
  styleUrl: './board-game-details.component.scss'
})
export class BoardGameDetailsComponent {
  boardGame: BoardGameResponse = {};
  review: PageResponseReviewResponse = {};
  page = 0;
  size = 5;
  pages: any = [];
  private boardGameId: number = 0;

  constructor(
    private boardGameService: BoardGameControllerService,
    private reviewService: ReviewsService,
    private activatedRoute: ActivatedRoute
  ) {
  }


  private findAllFeedbacks() {
    this.reviewService.findAllReviewsByBoardGame({
      'boardgame-id': this.boardGameId,
      page: this.page,
      size: this.size
    }).subscribe({
      next: (data) => {
        this.review = data;
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllFeedbacks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllFeedbacks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllFeedbacks();
  }

  goToLastPage() {
    this.page = this.review.totalPages as number - 1;
    this.findAllFeedbacks();
  }

  goToNextPage() {
    this.page++;
    this.findAllFeedbacks();
  }

  get isLastPage() {
    return this.page === this.review.totalPages as number - 1;
  }

}
