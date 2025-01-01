package com.example.smallsocialnetwork.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReviewRepository extends JpaRepository<Review, Integer> {

    @Query("""
            SELECT review
            FROM Review review
            WHERE review.boardGame.id = :boardGameId
   """)

    Page<Review> findAllByBoardGameId(Integer boardGameId, Pageable pageable);

}
