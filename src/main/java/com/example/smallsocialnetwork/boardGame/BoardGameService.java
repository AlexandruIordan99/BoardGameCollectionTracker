package com.example.smallsocialnetwork.boardGame;

import com.example.smallsocialnetwork.common.PageResponse;
import com.example.smallsocialnetwork.exceptions.OperationNotPermittedException;
import com.example.smallsocialnetwork.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BoardGameService {

    private final BoardGameMapper boardGameMapper;
    private final BoardGameRepository boardGameRepository;


    public Integer save(BoardGameRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());

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

     public Integer updateShareableStatus(Integer boardGameId, Authentication connectedUser) {
        BoardGame boardGame = boardGameRepository.findById(boardGameId)
                .orElseThrow(() -> new EntityNotFoundException("No board game with the ID:: "+ boardGameId));
        User user = ((User) connectedUser.getPrincipal());

        if(!Objects.equals(boardGame.getOwner().getBoardGames(), user.getId())){
            //throw exception
            throw new OperationNotPermittedException("Updating the board game shareable status is forbidden.");
        }

        boardGame.setShareable(!boardGame.isShareable());
        boardGameRepository.save(boardGame);
        return boardGameId;
    }

    public Integer updateArchivedStatus(Integer boardGameId, Authentication connectedUser) {
        BoardGame boardGame = boardGameRepository.findById(boardGameId)
                .orElseThrow(() -> new EntityNotFoundException("No board game with the ID:: "+ boardGameId));
        User user = ((User) connectedUser.getPrincipal());

        if(!Objects.equals(boardGame.getOwner().getBoardGames(), user.getId())){
            //throw exception
            throw new OperationNotPermittedException("Updating someone else's archived status is forbidden.");
        }

        boardGame.setArchived(!boardGame.isArchived());
        boardGameRepository.save(boardGame);
        return boardGameId;
    }


}
