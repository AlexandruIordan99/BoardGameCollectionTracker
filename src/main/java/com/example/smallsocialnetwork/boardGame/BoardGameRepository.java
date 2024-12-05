package com.example.smallsocialnetwork.boardGame;


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
            AND boardGame.shareable = false
            AND boardGame.owner.id != :userId
            """) //we display all board games that are not archived and that the user does not own

    Page<BoardGame> findAllDisplayableBoardGames(Pageable pageable, Integer userId);

}
