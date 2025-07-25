package com.example.boardgamereviewer.boardGame;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface BoardGameRepository extends JpaRepository<BoardGame, Integer>, JpaSpecificationExecutor<BoardGame> {
    //extending second interface to create support for the BoardGameSpecification class
    @Query("""
            SELECT boardGame
            FROM BoardGame boardGame
            WHERE boardGame.archived = false
            AND boardGame.shareable = true
            """) //we display all board games that are not archived, that the user owns and that the user
                //does not own
                //the owned board games are handled by the findAllBoardGamesByOwner method

    Page<BoardGame> findAllDisplayableBoardGames(Pageable pageable, Integer ownerId);


    @Query("""
    SELECT boardGame
    FROM BoardGame boardGame
    WHERE boardGame.archived = false
    AND boardGame.shareable = true
    AND boardGame.wishlisted = true
    AND boardGame.owner.id = :ownerId
    """)

    Page<BoardGame> findAllDisplayableBoardGamesWishedForByOwner(Pageable pageable,Integer ownerId);
}
