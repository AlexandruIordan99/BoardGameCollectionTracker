package com.example.boardgamereviewer.boardGame;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record BoardGameRequest(Integer id,
                               @NotNull(message = "100")  //100 means title should not be null or empty
                               @NotEmpty(message = "100")
                               String title,
                               @NotNull(message = "101")  //101 means dev should not be null or empty etc.
                               @NotEmpty(message = "101")
                               String developer,
                               @NotNull(message = "102")
                               @NotEmpty(message = "102")
                               String publisher,
                               @NotNull(message = "103")
                               @NotEmpty(message = "103")
                               String description,
                               boolean shareable) {

}
