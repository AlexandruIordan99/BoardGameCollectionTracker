package com.example.boardgamereviewer.review;


import com.example.boardgamereviewer.common.PageResponse;
import com.example.boardgamereviewer.review.updateRating.UpdateRatingRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("reviews")
@RequiredArgsConstructor
@Tag(name="Reviews")
public class ReviewController {

    private final ReviewService service;

    @PostMapping
    public ResponseEntity<Integer> saveReview(
            @Valid @RequestBody ReviewRequest request,
            Authentication connectedUser) {
        return  ResponseEntity.ok(service.save(request, connectedUser));
    }

    @GetMapping("/boardgame/{boardgame-id}")
    public ResponseEntity<PageResponse<ReviewResponse>> findAllReviewsByBoardGame(
            @PathVariable("boardgame-id") Integer boardGameId,
            @RequestParam(name= "page", defaultValue = "0", required = false) int page,
            @RequestParam(name= "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllReviews(boardGameId,page, size, connectedUser));
    }

    @GetMapping("/boardgame/{boardgame-id}/my-rating")
    public ResponseEntity<Double> getCurrentUserRating(
      @PathVariable("boardgame-id") Integer boardGameId,
      Authentication connectedUser) {
        return ResponseEntity.ok(service.getCurrentUserRating(boardGameId, connectedUser));
    }

    @PatchMapping("/boardgame/{boardgame-id}")
    public ResponseEntity<Integer> updateReviewRating(
      @PathVariable("boardgame-id") Integer boardGameId,
      @RequestBody UpdateRatingRequest request,
      Authentication connectedUser) {
        return  ResponseEntity.ok(service.updateReviewRating(boardGameId, request.getRating(), connectedUser));
    }
}