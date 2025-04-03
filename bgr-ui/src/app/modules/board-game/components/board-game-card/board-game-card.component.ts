import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BoardGameResponse} from '../../../../services/models/board-game-response';

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

  @Output() private showDetails: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private addToWishlist: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private edit: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private share: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() private archive: EventEmitter<BoardGameResponse> = new EventEmitter<BoardGameResponse>();
  @Output() details = new EventEmitter<BoardGameResponse>();

  onShowDetails() {
     this.showDetails.emit(this.boardGame);
  }

  onAddToWishlist() {
     this.addToWishlist.emit(this.boardGame);
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


}
