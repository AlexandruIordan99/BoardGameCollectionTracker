package com.example.boardgamereviewer.review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

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
            WHERE review.user.id = :userId
            ORDER BY review.createdDate DESC 
   """)
    Page<Review> findByUserId(@Param("userId") Integer userId, Pageable pageable);

    @Query("""
            SELECT review
            FROM Review review
            WHERE review.user.id = :userId
            ORDER BY review.createdDate DESC
   """)
    List<Review> findReviewsByUserId(@Param("userId") Integer userId);


    @Query("""
            SELECT COUNT(review)
            FROM Review review
            WHERE review.user.id = :userId
   """)
    Long countByUserId(@Param("userId") Integer userId);

}
