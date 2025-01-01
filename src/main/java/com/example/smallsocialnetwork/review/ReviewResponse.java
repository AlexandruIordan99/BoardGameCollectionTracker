package com.example.smallsocialnetwork.review;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ReviewResponse {

    private Double rating;
    private String comment;
    private boolean ownReview; //is feedback the user's or someone else's



}
