import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BoardGameResponse} from '../../../../services/models/board-game-response';
import {ReviewsService} from '../../../../services/services/reviews.service';
import {UpdateReviewRating$Params} from '../../../../services/fn/reviews/update-review-rating';
import {BoardGameControllerService} from '../../../../services/services/board-game-controller.service'; // Add this import

@Component({
  selector: 'app-boardgame-card',
  standalone: false,

  templateUrl: './board-game-card.component.html',
  styleUrls: ['./board-game-card.component.scss']
})

export class BoardGameCardComponent {

  private _boardGame: BoardGameResponse ={} as BoardGameResponse;
  private _manage = false;
  private _canUserRate = true;
  private _currentUserRating = 0;


  constructor(private reviewsService: ReviewsService,
              private boardGameService: BoardGameControllerService) {}

  get boardGame(): BoardGameResponse {
    return this._boardGame;
  }

  @Output() private showDetails: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private edit: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private share: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private archive: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private delete: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private wishlist: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() details = new EventEmitter<BoardGameResponse>();
  @Output() addToWishlist = new EventEmitter<BoardGameResponse>();
  @Output() editDescription = new EventEmitter<BoardGameResponse>();


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

  onEditDescription() {
    this.editDescription.emit(this.boardGame);
  }

  onWishlist(){
    if (!this.boardGame.id) {
      console.error('Board game ID is required for wishlist operation');
      return;
    }
    const boardGameId: number = this.boardGame.id;

    this.boardGameService.updateWishlistedStatus({'boardgame-id': boardGameId}).subscribe({
      next: (response) => {
        console.log('Wishlist status updated successfully', response);
        this._boardGame.wishlisted = !this._boardGame.wishlisted;
        this.wishlist.emit(this.boardGame);
      },
      error: (error) => {
        console.error('Error updating wishlist status:', error);
      }
    });
  }

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
        window.location.reload();  //considering doing this differently, just a patchwork measure for now
                                  //react states would have made it easy crying emoji

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
