package com.example.boardgamereviewer.boardGame;


import com.example.boardgamereviewer.common.PageResponse;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/boardgame")
@RequiredArgsConstructor
public class BoardGameController {

    private final BoardGameService service;

    @PostMapping
    public ResponseEntity<Integer> saveBoardGame(
      @Valid @RequestBody BoardGameRequest request,
      Authentication connectedUser) {
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping("/{boardgame-id}")
    public ResponseEntity<BoardGameResponse> findBoardGameById(
      @PathVariable ("boardgame-id")
      Integer boardGameId){
        return ResponseEntity.ok(service.findById(boardGameId));
    }

    @GetMapping
    public ResponseEntity<PageResponse<BoardGameResponse>> findAllBoardGames(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "5", required = false) int size,
            Authentication connectedUser){

        return ResponseEntity.ok(service.findAllBoardGames(page, size, connectedUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<BoardGameResponse>> findAllBoardGamesByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "5", required = false) int size,
            Authentication connectedUser){
        return ResponseEntity.ok(service.findAllBoardGamesByOwner(page, size, connectedUser));
    }

    @PatchMapping("/shareable/{boardgame-id}")
    public ResponseEntity<Integer> updateShareableStatus(
            @PathVariable("boardgame-id") Integer boardGameId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.updateShareableStatus(boardGameId,connectedUser));
    }

    @PatchMapping("/archived/{boardgame-id}")
    public ResponseEntity<Integer> updateArchivedStatus(
            @PathVariable("boardgame-id") Integer boardGameId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.updateArchivedStatus(boardGameId,connectedUser));
    }

    @PatchMapping(value = "/cover/{boardgame-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBoardGameSplashArt(
            @PathVariable("boardgame-id") Integer boardGameId,
            @Parameter()
            @RequestPart ("file") MultipartFile file,
            Authentication connectedUser){
        service.uploadBoardGameSplashArt(file, connectedUser, boardGameId);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{boardgame-id}")
    public ResponseEntity<Void> deleteBoardGame(
      @PathVariable("boardgame-id") Integer boardGameId,
      Authentication connectedUser){
        service.deleteBoardGame(boardGameId, connectedUser);
        return ResponseEntity.noContent().build();
    }


}
