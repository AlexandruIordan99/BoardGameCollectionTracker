package com.example.boardgamereviewer.boardGame;

import org.springframework.data.jpa.domain.Specification;

public class BoardGameSpecification {

    public static Specification<BoardGame> withOwnerId(Integer ownerId){
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("owner").get("id"), ownerId);



    }

}
