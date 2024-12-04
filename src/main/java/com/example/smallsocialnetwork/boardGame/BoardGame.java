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
    private Boolean archived;
    private Boolean shareable;

    @ManyToOne //other way around compared to board games
    @JoinColumn(name="owner_id")
    private User owner;

    @OneToMany(mappedBy = "boardGame") //one board game to many reviews
    private List<Review> reviews;

    @OneToMany(mappedBy = "boardGame")
    private List<BoardGameTransactionHistory> histories;
}
