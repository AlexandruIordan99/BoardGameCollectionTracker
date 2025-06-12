package com.example.boardgamereviewer.boardGame;

import com.example.boardgamereviewer.file.FileStorageService;
import com.example.boardgamereviewer.common.PageResponse;
import com.example.boardgamereviewer.exceptions.OperationNotPermittedException;
import com.example.boardgamereviewer.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BoardGameService {

    private final BoardGameMapper boardGameMapper;
    private final BoardGameRepository boardGameRepository;
    private final FileStorageService fileStorageService;

    public Integer save(BoardGameRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal()); //cast to user because the .getPrincipal returns an object
                                                           //then the result can call user specific methods, like getId
        BoardGame boardGame = boardGameMapper.toBoardGame(request);

        boardGame.setOwner(user); //the connected user is set as the owner

        return boardGameRepository.save(boardGame).getId();

    }

    public BoardGameResponse findById(Integer boardGameId) {
        return boardGameRepository.findById(boardGameId)
                .map(boardGameMapper:: toBoardGameResponse)
                .orElseThrow(() -> new EntityNotFoundException("No board game with the ID:: "+ boardGameId));
    }


    public PageResponse<BoardGameResponse> findAllBoardGames(int page, int size, Authentication connectedUser) {
        if  (page <0){
            page = 0; //ensures you can't go to page -1 and get a 500 error
        }
        User user =(User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());  //createdDate from BaseEntity
        Page<BoardGame> boardGames = boardGameRepository.findAllDisplayableBoardGames(pageable, user.getId()); //NOTICE THE PLURAL
        List<BoardGameResponse> boardGameResponse = boardGames.stream()
                .map(boardGameMapper::toBoardGameResponse)
                .toList();
        return new PageResponse<>(
                boardGameResponse,
                boardGames.getNumber(),
                boardGames.getSize(),
                boardGames.getTotalElements(),
                boardGames.getTotalPages(),
                boardGames.isFirst(),
                boardGames.isLast()
        );
    }

    public PageResponse<BoardGameResponse> findAllBoardGamesByOwner(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<BoardGame> boardGames = boardGameRepository.findAll(BoardGameSpecification.withOwnerId(user.getId()), pageable);

        //same list declaration and return statement as above, the filtering is done on the first three lines
        //the extension of JpaSpecification also makes the BoardGameSpecification work here

        List<BoardGameResponse> boardGameResponse = boardGames.stream()
                .map(boardGameMapper::toBoardGameResponse)
                .toList();
        return new PageResponse<>(
                boardGameResponse,
                boardGames.getNumber(),
                boardGames.getSize(),
                boardGames.getTotalElements(),
                boardGames.getTotalPages(),
                boardGames.isFirst(),
                boardGames.isLast()
        );
    }

    public PageResponse<BoardGameResponse> findAllBoardGamesWishedForByOwner(int page, int size, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<BoardGame> boardGames = boardGameRepository.findAll(BoardGameSpecification
          .withOwnerId(user.getId()), pageable);

        List<BoardGameResponse> boardGameResponse = boardGames.stream()
          .map(boardGameMapper::toBoardGameResponse)
          .toList();
        return new PageResponse<>(
          boardGameResponse,
          boardGames.getNumber(),
          boardGames.getSize(),
          boardGames.getTotalElements(),
          boardGames.getTotalPages(),
          boardGames.isFirst(),
          boardGames.isLast()
        );
    }


     public Integer updateShareableStatus(Integer boardGameId, Authentication connectedUser) {
        BoardGame boardGame = boardGameRepository.findById(boardGameId)
                .orElseThrow(() -> new EntityNotFoundException("No board game with the ID:: "+ boardGameId));
        User user = ((User) connectedUser.getPrincipal());

        if(!Objects.equals(boardGame.getOwner().getId(), user.getId())){
            //throw exception
            throw new OperationNotPermittedException("Updating the shareable status of a board game" +
              "you do not own is forbidden.");
        }

        boardGame.setShareable(!boardGame.isShareable());
        boardGameRepository.save(boardGame);
        return boardGameId;
    }

    public Integer updateArchivedStatus(Integer boardGameId, Authentication connectedUser) {
        BoardGame boardGame = boardGameRepository.findById(boardGameId)
                .orElseThrow(() -> new EntityNotFoundException("No board game with the ID:: "+ boardGameId));
        User user = ((User) connectedUser.getPrincipal());

        if(!Objects.equals(boardGame.getOwner().getId(), user.getId())){
            throw new OperationNotPermittedException("Updating someone else's archived status is forbidden.");
        }

        boardGame.setArchived(!boardGame.isArchived());
        boardGameRepository.save(boardGame);
        return boardGameId;
    }

    public Integer updateWishlistedStatus(Integer boardGameId, Authentication connectedUser) {
        BoardGame boardGame = boardGameRepository.findById(boardGameId)
          .orElseThrow(() -> new EntityNotFoundException("No board game with the ID:: "+ boardGameId));
        User user = ((User) connectedUser.getPrincipal());

        if(!Objects.equals(boardGame.getOwner().getId(), user.getId())){
            throw new OperationNotPermittedException("Updating someone else's wishlist status is forbidden.");
        }

        boardGame.setWishlisted(!boardGame.isWishlisted());
        boardGameRepository.save(boardGame);
        return boardGameId;
    }

    public void uploadBoardGameSplashArt(MultipartFile file, Authentication connectedUser, Integer boardGameId){
        BoardGame boardGame = boardGameRepository.findById(boardGameId)
                .orElseThrow(() -> new EntityNotFoundException("No board game with the ID: "+ boardGameId));
        User user = ((User) connectedUser.getPrincipal());

        var gameSplashArt = fileStorageService.saveFile(file, boardGame, user.getId());
        boardGame.setGameSplashArt(gameSplashArt);
        boardGameRepository.save(boardGame);
    }

    public Integer updateBoardGameDescription(Integer boardGameId, Authentication connectedUser, String newDescription) {
        BoardGame boardGame = boardGameRepository.findById(boardGameId)
          .orElseThrow(() -> new EntityNotFoundException("No board game with the ID: "+ boardGameId));
        User user = ((User) connectedUser.getPrincipal());

        if(!Objects.equals(boardGame.getOwner().getId(), user.getId())){
            throw new OperationNotPermittedException("Updating someone else's description is forbidden.");
        }

        boardGame.setDescription(newDescription);

        if (newDescription == null || newDescription.trim().isEmpty()) {
            throw new IllegalArgumentException("Description must not be empty.");
        }

        boardGameRepository.save(boardGame);
        return boardGameId;
    }


    public void deleteBoardGame(Integer boardGameId, Authentication connectedUser) {
        BoardGame boardGame = boardGameRepository.findById(boardGameId)
          .orElseThrow(() -> new EntityNotFoundException("No board game with the ID: "+ boardGameId));
        User user = ((User) connectedUser.getPrincipal());

        if(!Objects.equals(boardGame.getOwner().getId(), user.getId())){
            throw new OperationNotPermittedException("Deleting a board game you do not own is forbidden.");
        }

        boardGameRepository.delete(boardGame);
    }

}
