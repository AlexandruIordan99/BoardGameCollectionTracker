package com.example.smallsocialnetwork.boardGame;

import com.example.smallsocialnetwork.common.BaseEntity;
import com.example.smallsocialnetwork.history.BoardGameTransactionHistory;
import com.example.smallsocialnetwork.review.Review;
import com.example.smallsocialnetwork.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.Transient;

import java.util.List;

@Getter
@Setter
@SuperBuilder //need a super builder for inheritance
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class BoardGame extends BaseEntity {

    private String title;
    private String description;
    private String developer; //company or person who developed the game
    private String publisher;
    private String gameCover; //to be stored on server because it would take too much space on a database
    private boolean archived;
    private boolean shareable;

    @ManyToOne //other way around compared to board games
    @JoinColumn(name="owner_id")
    private User owner;

    @OneToMany(mappedBy = "boardGame") //one board game to many reviews
    private List<Review> reviews;

    @OneToMany(mappedBy = "boardGame")
    private List<BoardGameTransactionHistory> histories;


    public double getRating(){
        if (reviews ==null || reviews.isEmpty()){
            return 0.0;
        }

        var rating = this.reviews.stream()
                .mapToDouble(Review:: getRating)
                .average()
                .orElse(0.0);

        double roundedRating = Math.round(rating * 100.0)/100.0; //rounding to 2 decimal places to be pretty exact in
                                                                 //rating aggregates
        return roundedRating;
    }

}
