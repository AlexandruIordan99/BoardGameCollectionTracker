import {Component, OnInit} from '@angular/core';
import {BoardGameRequest} from '../../../../services/models/board-game-request';
import {BoardGameControllerService} from '../../../../services/services/board-game-controller.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-manage-board-games',
  standalone: false,

  templateUrl: './manage-board-games.component.html',
  styleUrl: './manage-board-games.component.scss'
})
export class ManageBoardGamesComponent implements OnInit {


  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedBoardGameCoverImage: any;
  BoardGameRequest: BoardGameRequest ={description: '', developer: '',
    publisher: '', title: ''};

  constructor(
    private boardGameService: BoardGameControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const boardGameId = this.activatedRoute.snapshot.params['boardGameId'];
    if (boardGameId) {
      this.boardGameService.findBoardGameById({
        'boardgame-id': boardGameId
      }).subscribe({
        next: (boardGame) => {
          this.BoardGameRequest = {
            id: boardGame.id,
            title: boardGame.title as string,
            developer: boardGame.developer as string,
            publisher: boardGame.publisher as string,
            description: boardGame.description as string,
            shareable: boardGame.shareable
          };
          this.selectedPicture='data:image/jpg;base64,' + boardGame.coverImage;
        }
      });
    }
  }

  saveBoardGame() {
    this.boardGameService.saveBoardGame({
      body: this.BoardGameRequest
    }).subscribe({
      next: (boardGameId) => {
        this.boardGameService.uploadBoardGameSplashArt({
          'boardgame-id': boardGameId,
          body: {
            file: this.selectedBoardGameCoverImage
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/boardgame'])
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedBoardGameCoverImage = event.target.files[0];
    console.log(this.selectedBoardGameCoverImage);
    if (this.selectedBoardGameCoverImage){
      const reader = new FileReader();
      reader.onload=() =>{
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBoardGameCoverImage);
    }
  }

}
