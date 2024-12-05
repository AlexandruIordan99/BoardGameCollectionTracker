package com.example.smallsocialnetwork.boardGame;


import org.springframework.stereotype.Service;

@Service
public class BoardGameMapper {

    public BoardGame toBoardGame(BoardGameRequest request){
        return BoardGame.builder()
                .id(request.id())
                .title(request.title())
                .developer(request.developer())
                .description(request.description())
                .archived(false) //the first time an entry is created it is not archived
                .shareable(request.shareable())
                .build();




    }


    public BoardGameResponse toBoardGameResponse(BoardGame boardGame) {
        return BoardGameResponse.builder()
                .id(boardGame.getId())
                .title(boardGame.getTitle())
                .developer(boardGame.getDeveloper())
                .publisher(boardGame.getPublisher())
                .description(boardGame.getDescription())
                .rating(boardGame.getRating())
                .archived(boardGame.isArchived())
                .shareable(boardGame.isShareable())
                .owner(boardGame.getOwner().fullName())
                //.coverImage() to do: later implementation
                .build();
    }
}
