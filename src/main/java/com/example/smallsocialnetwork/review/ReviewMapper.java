package com.example.smallsocialnetwork.review;

import com.example.smallsocialnetwork.boardGame.BoardGame;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class ReviewMapper {

    public Review toReview(ReviewRequest request){
        return Review.builder()
                .rating(request.rating())
                .comment(request.comment())
                .boardGame(BoardGame.builder()
                        .id(request.boardGameId())
                        .archived(false)
                        .shareable(false)
                        .build())
                .build();

}

    public Object toReviewResponse(Review review, Integer id) {
        return ReviewResponse.builder()
                .rating(review.getRating())
                .comment(review.getComment())
                .ownReview(Objects.equals(review.getCreatedBy(), id))
                .build();


    }
}
