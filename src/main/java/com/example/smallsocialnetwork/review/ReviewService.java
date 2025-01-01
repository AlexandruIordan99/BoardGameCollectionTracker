package com.example.smallsocialnetwork.review;


import com.example.smallsocialnetwork.boardGame.BoardGame;
import com.example.smallsocialnetwork.boardGame.BoardGameRepository;
import com.example.smallsocialnetwork.common.PageResponse;
import com.example.smallsocialnetwork.exceptions.OperationNotPermittedException;
import com.example.smallsocialnetwork.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final BoardGameRepository boardGameRepository;
    private final ReviewMapper reviewMapper;
    private final ReviewRepository reviewRepository;


    public Integer save(ReviewRequest request, Authentication connectedUser) {
        BoardGame boardGame = boardGameRepository.findById(request.boardGameId())
                .orElseThrow(() -> new EntityNotFoundException("No board game with the ID:: "+ request.boardGameId()));
        User user = ((User) connectedUser.getPrincipal());

        if(!Objects.equals(boardGame.getOwner().getBoardGames(), user.getId())){
            //throw exception
                throw new OperationNotPermittedException("You cannot review an archived game.");
        }

        Review review = reviewMapper.toReview(request);
        return reviewRepository.save(review).getId();

    }

    public PageResponse<ReviewResponse> findAllReviews(Integer boardGameId,
                                                                  int page,
                                                                  int size,
                                                                  Authentication connectedUser) {
        Pageable pageable = PageRequest.of(page, size);
        User user = ((User) connectedUser.getPrincipal());
        Page<Review> reviews = reviewRepository.findAllByBoardGameId(boardGameId, pageable);
        List<ReviewResponse> reviewResponses = reviews.stream()
                .map(r -> (ReviewResponse) reviewMapper.toReviewResponse(r, user.getId()))
                .toList();

        return new PageResponse<>(
                reviewResponses,
                reviews.getNumber(),
                reviews.getSize(),
                reviews.getTotalElements(),
                reviews.getTotalPages(),
                reviews.isFirst(),
                reviews.isLast()
        );

    }
}
