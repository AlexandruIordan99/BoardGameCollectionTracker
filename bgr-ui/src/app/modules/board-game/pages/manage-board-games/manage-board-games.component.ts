import { Component } from '@angular/core';
import {BoardGameRequest} from '../../../../services/models/board-game-request';
import {BoardGameService} from '../../../../services/services/board-game.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-manage-board-games',
  standalone: false,

  templateUrl: 'bgr-ui/src/app/modules/board-game/pages/manage-board-games/manage-board-games.component.html',
  styleUrl: './manage-board-games.component.scss'
})
export class ManageBoardGamesComponent {

  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  selectedBoardGameCoverImage: any;
  BoardGameRequest: BoardGameRequest ={description: '', developer: '',
    publisher: '', title: ''};

  constructor(
    private boardGameService: BoardGameService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void{
    const boardGameId = this.activatedRoute.snapshot.params['boardGameId'];
    if(boardGameId){
      this.boardGameService.findBoardGameById({
        "boardgame-id": boardGameId,
      }).subscribe({
        next:(boardGame)=>{
          this.BoardGameRequest = {
            id: boardGame.id,
            title: boardGame.title as string,
            developer: boardGame.developer as string,
            publisher: boardGame.publisher as string,
            description: boardGame.description as string,
            shareable: boardGame.shareable
          }
          if(boardGame.coverImage){
            this.selectedBoardGameCoverImage = 'data:image/jpg;base64,' + boardGame.coverImage;
          }
      }
      })
    }
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

  saveBoardGame():void {
    this.boardGameService.saveBoardGame({
      body: this.BoardGameRequest
    }).subscribe({
      next:() =>{
        this.boardGameService.uploadBoardGameSplashArt({
          "boardgame-id": 0,
          body: {file: this.selectedBoardGameCoverImage},
        }).subscribe({
          next: () =>{
            this.router.navigate(['/boardgames/my-boardgames'])
          }
        })
    },
      error:(err) =>{
        this.errorMsg = err.error.validationErrors;
      }
    })
  }
}
