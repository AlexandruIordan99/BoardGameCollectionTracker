import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BoardGameResponse} from '../../../../services/models/board-game-response';
import {ReviewsService} from '../../../../services/services/reviews.service';
import {UpdateReviewRating$Params} from '../../../../services/fn/reviews/update-review-rating';

@Component({
  selector: 'app-boardgame-card',
  standalone: false,

  templateUrl: './board-game-card.component.html',
  styleUrls: ['./board-game-card.component.scss']
})

export class BoardGameCardComponent {

  private _boardGame: BoardGameResponse ={} as BoardGameResponse;
  private _boardGameCoverImage: string | undefined;
  private _manage = false;
  private _canUserRate = true;
  private _currentUserRating = 0;

  get boardGame(): BoardGameResponse {
    return this._boardGame;
  }

  @Input()
  set boardGame(value: BoardGameResponse) {
    this._boardGame = value;
  }
  get boardGameCoverImage(): string | undefined {
    if (this._boardGame.coverImage){
      return 'data:image/jpg;base64, ' + this._boardGame.coverImage;
    } else {
      return 'https://picsum.photos/1900/800'; //random image if board game has no cover
    }
  }

  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }

  get canUserRate(): boolean {
    return this._canUserRate;
  }

  @Input()
  set canUserRate(value: boolean) {
    this._canUserRate = value;
  }

  get currentUserRating(): number {
    return this._currentUserRating;
  }

  @Input()
  set currentUserRating(value: number) {
    this._currentUserRating = value || 0;
  }


  @Output() private showDetails: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private edit: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private share: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private archive: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private delete: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private wishlist: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() details = new EventEmitter<BoardGameResponse>();

  onShowDetails() {
     this.showDetails.emit(this.boardGame);
  }

  onEdit() {
    this.edit.emit(this.boardGame);
  }

  onShare() {
    this.share.emit(this.boardGame);
  }

  onArchive() {
    this.archive.emit(this.boardGame);
  }

  onDelete(){
    this.delete.emit(this.boardGame)
  }

  onWishlist(){
    this.wishlist.emit(this.boardGame);
  }

  constructor(private reviewsService: ReviewsService) {}

  private loadCurrentUserRating(boardGameId: number): void {
    this.reviewsService.getCurrentUserRating({'boardgame-id': boardGameId}).subscribe({
      next: (rating) => {
        this._currentUserRating = rating || 0;
      },
      error: (error) => {
        console.error('Error loading user rating:', error);
        this._currentUserRating = 0;
      }
    });
  }

  onRatingChange(newRating: number): void {
    this._currentUserRating = newRating;
    const params: UpdateReviewRating$Params = {
      'boardgame-id': this.boardGame.id || 0,
      body: { rating: newRating }
    };

    this.reviewsService.updateReviewRating(params).subscribe({
      next: (response) => {
        console.log('Rating updated successfully', response);
        window.location.reload();

      },
      error: (error) => {
        console.error('Error updating rating:', error);
        this.loadCurrentUserRating(this.boardGame.id || 0);
      }
    });
  }

  ngOnInit(): void {
    console.log('Board game:', this.boardGame.title, 'Rating:', this.currentUserRating, 'Can rate:', this.canUserRate);
    if (this.boardGame.id && this.canUserRate) {
      this.loadCurrentUserRating(this.boardGame.id);
    }
  }
}
