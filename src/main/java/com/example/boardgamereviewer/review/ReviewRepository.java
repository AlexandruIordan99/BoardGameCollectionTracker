package com.example.boardgamereviewer.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    @Query("""
            SELECT review
            FROM Review review
            WHERE review.boardGame.id = :boardGameId
   """)

    Page<Review> findAllByBoardGameId(Integer boardGameId, Pageable pageable);

    @Query("""
    SELECT review
    FROM Review review
    WHERE review.boardGame.id = :boardGameId AND review.createdBy = :userId
""")
    Optional<Review> findByBoardGameIdAndUserId(Integer boardGameId, Integer userId);


}
