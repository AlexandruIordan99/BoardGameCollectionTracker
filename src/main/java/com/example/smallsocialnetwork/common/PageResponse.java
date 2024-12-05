package com.example.smallsocialnetwork.common;


import com.example.smallsocialnetwork.boardGame.BoardGameResponse;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PageResponse<T> {

    private List<T> content;
    private int number;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean last;

    public PageResponse(List<BoardGameResponse> boardGameResponse, int number, int size, long totalElements, int totalPages, boolean first, boolean last) {
    }
}
