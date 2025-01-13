package com.example.boardgamereviewer.boardGame;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardGameResponse {

    private Integer id;
    private String title;
    private String developer;
    private String publisher;
    private String description;
    private String owner;
    private byte[] coverImage;
    private double rating;
    private boolean archived;
    private boolean shareable;

}
