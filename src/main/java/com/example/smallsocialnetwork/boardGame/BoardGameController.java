package com.example.smallsocialnetwork.boardGame;


import com.example.smallsocialnetwork.common.PageResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("boardgames")
@RequiredArgsConstructor
@Tag(name = "BoardGame")
public class BoardGameController {

    private final BoardGameService service;

    @PostMapping
    public ResponseEntity<Integer> saveBoardGame(  @Valid @RequestBody BoardGameRequest request,
                                                   Authentication connectedUser) {
        return ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping("{boardgame-id}")
    public ResponseEntity<BoardGameResponse> findBoardGameById(@PathVariable ("boardgame-id")
                                                                   Integer boardGameId){
        return ResponseEntity.ok(service.findById(boardGameId));
    }

    @GetMapping("")
    public ResponseEntity<PageResponse<BoardGameResponse>> findAllBoardGames(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "0", required = false) int size,
            Authentication connectedUser){

        return ResponseEntity.ok(service.findAllBoardGames(page, size, connectedUser));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<BoardGameResponse>> findAllBoardGamesByOwner(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "0", required = false) int size,
            Authentication connectedUser){
        return ResponseEntity.ok(service.findAllBoardGamesByOwner(page, size, connectedUser));
    }

    @PatchMapping("/shareable/{boardgame-id")
    public ResponseEntity<Integer> updateShareableStatus(
            @PathVariable("boardgame-id") Integer boardGameId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.updateShareableStatus(boardGameId,connectedUser));
    }

    @PatchMapping("/archived/{boardgame-id")
    public ResponseEntity<Integer> updateArchivedStatus(
            @PathVariable("boardgame-id") Integer boardGameId,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.updateShareableStatus(boardGameId,connectedUser));
    }


}
