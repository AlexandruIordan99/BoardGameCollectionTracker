package com.example.boardgamereviewer.review;

import com.example.boardgamereviewer.boardGame.BoardGame;
import com.example.boardgamereviewer.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@SuperBuilder //need a super builder for inheritance
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(uniqueConstraints = {
  @UniqueConstraint(columnNames = {"board_game_id", "created_by"})
})
public class Review extends BaseEntity {

    private Double rating;

    private String comment; //the content of the review

    @ManyToOne
    @JoinColumn(name="board_game_id")
    private BoardGame boardGame;

}
